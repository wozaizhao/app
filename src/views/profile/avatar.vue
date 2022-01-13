<template>
    <div class="update-avatar">
        <van-nav-bar title="修改头像" left-arrow @click-left="goBack">
            <template #right>
                <van-icon v-show="sdkReady" name="ellipsis" @click="showMenu" />
            </template>
        </van-nav-bar>
        <div class="img-container table-cell align-middle">
            <img v-if="cropImg" id="cropImg" :src="cropImg" alt="avatar" />
            <van-image v-else class="w-screen" :src="activeUser.avatar_url || config.defaultAvatar" />
        </div>
        <input id="inputFile" type="file" @change="onFileChange" accept="image/png, image/jpeg" />
        <input id="inputCapture" type="file" capture @change="onCaptureChange" accept="image/png, image/jpeg" />
        <van-action-sheet
            v-model:show="show"
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
// import { Toast } from 'vant';
import mixinApp from '../../mixins/app';
import { activeUser, isWeixin, useWx } from '../../api';
import config from '../../config';
import { readFileContent } from '../../utils';

export default {
    mixins: [mixinApp],
    setup() {
        const show = ref(false);
        const actions = [{ name: '拍照' }, { name: '从手机相册选择' }];
        const onSelect = (item) => {
            // 默认情况下点击选项时不会自动收起
            // 可以通过 close-on-click-action 属性开启自动收起
            show.value = false;
            if (item.name === '拍照') {
                document.getElementById('inputCapture').click();
            } else if (item.name === '从手机相册选择') {
                document.getElementById('inputFile').click();
            }
            // Toast(item.name);
        };
        const showMenu = async () => {
            if (isWeixin()) {
                const imgs = await wxChooseImage();
                console.log('imgs', imgs);
            } else {
                show.value = true;
            }
        };
        const cropImg = ref('');
        const onFileChange = async (e) => {
            console.log('onFileChange', e);
            cropImg.value = await readFileContent(e.target.files[0], 'dataUrl');
            setTimeout(() => {
                cropImage();
            }, 500);
        };
        const onCaptureChange = async (e) => {
            console.log('onCaptureChange', e);
            cropImg.value = await readFileContent(e.target.files[0], 'dataUrl');
            setTimeout(() => {
                cropImage();
            }, 500);
        };
        const onCancel = () => {
            show.value = false;
        };
        const sdkReady = ref(false);
        const { initSDK, wxChooseImage } = useWx();
        onMounted(async () => {
            if (isWeixin()) {
                await initSDK();
                sdkReady.value = true;
            } else {
                sdkReady.value = true;
            }
        });

        const chooseImage = async () => {
            const imgs = await wxChooseImage();
            console.log('imgs', imgs);
        };

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
                    crop(event) {
                        console.log(event.detail.x);
                        console.log(event.detail.y);
                        console.log(event.detail.width);
                        console.log(event.detail.height);
                        console.log(event.detail.rotate);
                        console.log(event.detail.scaleX);
                        console.log(event.detail.scaleY);
                    },
                });
            }
        };

        return {
            show,
            actions,
            onSelect,
            config,
            activeUser,
            showMenu,
            onCancel,
            sdkReady,
            chooseImage,
            onFileChange,
            onCaptureChange,
            cropImg,
        };
    },
};
</script>

<style>
.img-container {
    height: calc(100vh - 46px);
}
#cropImg {
    display: block;
    max-width: 100%;
}
</style>
