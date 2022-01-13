<template>
    <div class="update-avatar">
        <van-nav-bar title="修改头像" left-arrow @click-left="goBack">
            <template #right>
                <van-icon v-show="sdkReady" name="ellipsis" @click="showMenu" />
            </template>
        </van-nav-bar>
        <div class="img-container table-cell align-middle">
            <van-image class="w-screen" :src="activeUser.avatar_url || config.defaultAvatar" />
        </div>
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
import { onMounted, ref } from 'vue';
import { Toast } from 'vant';
import mixinApp from '../../mixins/app';
import { activeUser, isWeixin, useWx } from '../../api';
import config from '../../config';

export default {
    mixins: [mixinApp],
    setup() {
        const show = ref(false);
        const actions = [{ name: '选项一' }, { name: '选项二' }, { name: '选项三' }];
        const onSelect = (item) => {
            // 默认情况下点击选项时不会自动收起
            // 可以通过 close-on-click-action 属性开启自动收起
            show.value = false;
            Toast(item.name);
        };
        const showMenu = async () => {
            // show.value = true;
            const imgs = await wxChooseImage();
            console.log('imgs', imgs);
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
            }
        });

        const chooseImage = async () => {
            const imgs = await wxChooseImage();
            console.log('imgs', imgs);
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
        };
    },
};
</script>

<style>
.img-container {
    height: calc(100vh - 46px);
}
</style>
