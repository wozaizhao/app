<template>
    <div class="profile">
        <div class="absolute top-2 right-2" @click="goTo('settings')">
            <van-icon name="setting-o" size="24" :color="config.primaryColor" />
        </div>
        <div v-if="isLoggedIn" class="flex items-center py-2 px-3" @click="goTo('profile')">
            <van-image round width="2rem" height="2rem" :src="imgURL(activeUser.avatarUrl) || config.defaultAvatar" />
            <div class="ml-2 w-20 flex-1 flex flex-col">
                <span class="text-base text-gray-900 dark:text-white truncate">{{ activeUser.nickname }}</span>
                <span class="text-sm text-gray-400 mt-1 truncate">{{ activeUser.bio || config.defaultBio }}</span>
            </div>
        </div>
        <div v-else class="flex items-center py-2 px-3">
            <van-image round width="2rem" height="2rem" :src="config.defaultAvatar" />
            <div class="ml-2 w-20 flex-1 flex flex-col">
                <router-link class="text-base text-black dark:text-white" to="/login">去登录</router-link>
            </div>
        </div>
        <van-cell-group class="mt-1" inset>
            <van-cell title="单元格" is-link value="内容" />
            <van-cell title="单元格" is-link value="内容" />
            <van-cell title="单元格" is-link value="内容" />
        </van-cell-group>
        <van-cell-group class="mt-1" inset>
            <van-cell title="单元格" is-link value="内容" />
            <van-cell title="单元格" is-link value="内容" />
            <van-cell title="单元格" is-link value="内容" />
        </van-cell-group>
        <div class="p-2" v-if="isLoggedIn">
            <van-button plain round block type="primary" @click="logout">退出</van-button>
        </div>
        <tarbar></tarbar>
    </div>
</template>

<script>
import tarbar from '../components/tarbar.vue';
import mixinApp from '../mixins/app';
import { isLoggedIn, activeUser, logout } from '../api';
import config from '../config';
import { imgURL } from '../utils';
// import { onMounted } from 'vue';

export default {
    components: {
        tarbar,
    },
    mixins: [mixinApp],
    setup() {
        return {
            config,
            isLoggedIn,
            activeUser,
            logout,
            imgURL,
        };
    },
};
</script>
