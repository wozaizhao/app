<template>
    <div class="profile">
        <div v-if="isLoggedIn" class="flex bg-white items-center py-2 px-3" @click="goTo('profile')">
            <van-image round width="2rem" height="2rem" :src="activeUser.avatar_url || config.defaultAvatar" />
            <div class="ml-1 w-20 flex-1 flex flex-col">
                <span class="font-size-18 text-gray-900 text-ellipsis whitespace-nowrap overflow-hidden">{{
                    activeUser.nickname
                }}</span>
                <span class="font-size-16 text-gray-400 mt-1 text-ellipsis whitespace-nowrap overflow-hidden">{{
                    activeUser.bio || config.defaultBio
                }}</span>
            </div>
            <van-icon name="arrow" size="20" color="#969799" />
        </div>
        <div v-else class="flex bg-white items-center py-2 px-3">
            <van-image round width="2rem" height="2rem" :src="config.defaultAvatar" />
            <div class="ml-1 w-20 flex-1 flex flex-col">
                <router-link class="font-size-18 text-gray-900" to="/login">去登录</router-link>
            </div>
        </div>
        <van-cell-group class="mt-1">
            <van-cell title="单元格" is-link value="内容" />
            <van-cell title="单元格" is-link value="内容" />
            <van-cell title="单元格" is-link value="内容" />
        </van-cell-group>
        <van-cell-group class="mt-1">
            <van-cell title="单元格" is-link value="内容" />
            <van-cell title="单元格" is-link value="内容" />
            <van-cell title="单元格" is-link value="内容" />
        </van-cell-group>
        <div class="p-2" v-if="isLoggedIn">
            <van-button color="#7232dd" round plain block type="primary" @click="logout">退出</van-button>
        </div>
        <tarbar></tarbar>
    </div>
</template>

<script>
import tarbar from '../components/tarbar.vue';
import mixinApp from '../mixins/app';
import { isLoggedIn, activeUser, logout } from '../api';
import config from '../config';
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
        };
    },
};
</script>
