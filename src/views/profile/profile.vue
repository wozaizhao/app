<template>
    <div class="profile">
        <van-nav-bar v-if="!isWeapp" title="个人信息" left-arrow @click-left="goBack" />
        <van-cell-group>
            <van-cell center title="头像" is-link to="updateAvatar">
                <van-image
                    round
                    width="1.5rem"
                    height="1.5rem"
                    :src="imgURL(activeUser.avatarUrl) || config.defaultAvatar"
                />
            </van-cell>
            <van-cell
                title="手机号"
                is-link
                :value="activeUser.phone"
                :to="{ name: 'updateProfile', params: { method: 'phone' } }"
            />
            <van-cell
                title="昵称"
                is-link
                :value="activeUser.nickname"
                :to="{ name: 'updateProfile', params: { method: 'nickname' } }"
            />
            <van-cell
                title="性别"
                is-link
                :value="genderText(activeUser.gender)"
                :to="{ name: 'updateProfile', params: { method: 'gender' } }"
            />
            <van-cell
                title="简介"
                is-link
                :value="activeUser.bio || config.defaultBio"
                :to="{ name: 'updateProfile', params: { method: 'bio' } }"
            />
        </van-cell-group>
    </div>
</template>

<script>
import { onMounted, ref } from 'vue';
import mixinApp from '../../mixins/app';
import { activeUser, getEnv, isWeixin } from '../../api';
import config from '../../config';
import { genderText } from '../../utils';
import { imgURL } from '../../utils';

export default {
    mixins: [mixinApp],
    setup() {
        const isWeapp = ref(false);
        onMounted(async () => {
            if (isWeixin()) {
                const env = await getEnv();
                isWeapp.value = env.miniprogram;
            }
            document.title = '个人信息';
        });
        return {
            isWeapp,
            config,
            activeUser,
            imgURL,
            genderText,
        };
    },
};
</script>
