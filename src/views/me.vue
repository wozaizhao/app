<template>
    <div class="profile">
        <div class="flex bg-white items-center py-2 px-3" @click="goTo('profile')">
            <van-image round width="2rem" height="2rem" :src="config.defaultAvatar" />
            <div class="ml-1 flex-1 flex flex-col">
                <span class="font-size-18 text-gray-900">name</span>
                <span class="font-size-16 text-gray-400 mt-1">描述描述描述描述描述描述</span>
            </div>
            <van-icon name="arrow" size="20" color="#969799" />
        </div>
        <van-cell-group class="mt-1">
            <van-cell title="单元格" is-link :value="config.defaultAvatar" />
            <van-cell title="单元格" is-link value="内容" />
            <van-cell title="单元格" is-link value="内容" />
            <van-cell title="单元格" is-link value="内容" />
        </van-cell-group>
        <van-cell-group class="mt-1">
            <van-cell title="单元格" is-link value="内容" />
            <van-cell title="单元格" is-link value="内容" />
            <van-cell title="单元格" is-link value="内容" />
        </van-cell-group>
        <tarbar></tarbar>
    </div>
</template>

<script>
import tarbar from '../components/tarbar.vue';
import mixinApp from '../mixins/app';
import { activeUser } from '../api';
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
            activeUser,
        };
    },
};
</script>
