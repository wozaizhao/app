<template>
    <div class="profile">
        <van-nav-bar title="个人信息" left-arrow @click-left="goBack" />
        <van-cell-group>
            <van-cell center title="头像" is-link to="updateAvatar">
                <van-image round width="1.5rem" height="1.5rem" :src="activeUser.avatar_url || config.defaultAvatar" />
            </van-cell>
            <van-cell title="手机号" is-link :value="activeUser.phone" to="updateProfile" />
            <van-cell
                title="昵称"
                is-link
                :value="activeUser.nickname"
                :to="{ name: 'updateProfile', params: { nickname: '君落羽' } }"
            />
            <van-cell title="性别" is-link :value="activeUser.gender" />
            <van-cell title="简介" is-link :value="activeUser.bio || config.defaultBio" />
        </van-cell-group>
    </div>
</template>

<script>
import mixinApp from '../../mixins/app';
import { activeUser } from '../../api';
import config from '../../config';

export default {
    mixins: [mixinApp],
    setup() {
        return {
            config,
            activeUser,
        };
    },
};
</script>
