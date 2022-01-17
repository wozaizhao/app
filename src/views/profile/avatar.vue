<template>
    <div class="update-avatar">
        <van-nav-bar title="修改头像" left-arrow @click-left="goBack">
            <template #right>
                <van-icon v-show="sdkReady" name="ellipsis" @click="showMenu" />
            </template>
        </van-nav-bar>
        <div class="img-container table-cell align-middle">
            <img v-if="cropImg" class="w-screen block" id="cropImg" :src="cropImg" alt="avatar" />
            <van-image v-else class="w-screen" :src="imgURL(activeUser.avatarUrl) || config.defaultAvatar" />
        </div>
        <div v-if="cropImg" class="w-full text-center fixed bottom-5">
            <van-button type="primary" @click="save">保存</van-button>
        </div>
        <input id="inputFile" class="opacity-0" type="file" @change="onFileChange" accept="image/png, image/jpeg" />
        <input
            id="inputCapture"
            class="opacity-0"
            type="file"
            capture
            @change="onCaptureChange"
            accept="image/png, image/jpeg"
        />
        <van-action-sheet
            v-model:show="actionSheetShow"
            cancel-text="取消"
            :actions="actions"
            @select="onSelect"
            @cancel="onCancel"
        />
    </div>
</template>

<script>
import { onMounted, ref, reactive } from 'vue';
import 'cropperjs/dist/cropper.css';
import Cropper from 'cropperjs';
import { Toast } from 'vant';
import mixinApp from '../../mixins/app';
import { activeUser, isWeixin, useWx, upload, updateUserInfo, requestCurrentUser } from '../../api';
import config from '../../config';
import { readFileContent, imgURL } from '../../utils';

export default {
    mixins: [mixinApp],
    setup() {
        const actionSheetShow = ref(false);
        const actions = [{ name: '拍照' }, { name: '从手机相册选择' }];
        const onSelect = (item) => {
            actionSheetShow.value = false;
            if (item.name === '拍照') {
                document.getElementById('inputCapture').click();
            } else if (item.name === '从手机相册选择') {
                document.getElementById('inputFile').click();
            }
        };
        const onCancel = () => {
            actionSheetShow.value = false;
        };
        const showMenu = async () => {
            if (isWeixin()) {
                const imgs = await wxChooseImage();
                cropImg.value = await wxGetLocalImgData(imgs[0]);
                setTimeout(() => {
                    cropImage();
                }, 500);
            } else {
                actionSheetShow.value = true;
            }
        };
        const cropImg = ref('');
        const onFileChange = async (e) => {
            cropImg.value = await readFileContent(e.target.files[0], 'dataUrl');
            setTimeout(() => {
                cropImage();
            }, 500);
        };
        const onCaptureChange = async (e) => {
            cropImg.value = await readFileContent(e.target.files[0], 'dataUrl');
            setTimeout(() => {
                cropImage();
            }, 500);
        };

        const sdkReady = ref(false);
        const { initSDK, wxChooseImage, wxGetLocalImgData } = useWx();
        onMounted(async () => {
            if (isWeixin()) {
                await initSDK();
                sdkReady.value = true;
            } else {
                sdkReady.value = true;
            }
        });

        const imageResize = reactive({
            cropper: null,
        });

        const cropImage = () => {
            const image = document.getElementById('cropImg');
            if (imageResize.cropper) {
                imageResize.cropper.replace(cropImg.value);
            } else {
                imageResize.cropper = new Cropper(image, {
                    aspectRatio: 1 / 1,
                    autoCropArea: 0.9,
                    dragMode: 'move',
                    cropBoxMovable: false,
                    cropBoxResizable: false,
                });
            }
        };

        const saveSuccess = () => {
            requestCurrentUser();
            imageResize.cropper.destroy();
            cropImg.value = '';
        };

        const saveFail = () => {
            Toast.clear();
        };

        const save = () => {
            imageResize.cropper
                .getCroppedCanvas({
                    width: 200,
                    height: 200,
                })
                .toBlob(async (blob) => {
                    Toast.loading({
                        message: '上传中...',
                        forbidClick: true,
                    });
                    const formData = new FormData();
                    formData.append('file', blob);
                    const { status: uploadStatus, data: uploadData } = await upload(formData);
                    if (uploadStatus === 'success') {
                        const { status, data } = await updateUserInfo({ avatarUrl: uploadData.key });
                        if (status === 'success' && data) {
                            saveSuccess();
                        } else {
                            saveFail();
                        }
                    } else {
                        saveFail();
                    }
                });
        };

        return {
            actionSheetShow,
            actions,
            onSelect,
            config,
            activeUser,
            showMenu,
            onCancel,
            sdkReady,
            onFileChange,
            onCaptureChange,
            cropImg,
            save,
            imgURL,
        };
    },
};
</script>

<style>
.img-container {
    height: calc(100vh - 46px);
}
</style>
