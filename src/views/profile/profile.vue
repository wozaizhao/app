<template>
    <div class="profile">
        <van-nav-bar title="个人信息" left-arrow @click-left="goBack" />
        <van-cell-group>
            <van-cell center title="头像" is-link to="updateAvatar">
                <van-image round width="1.5rem" height="1.5rem" src="https://img.yzcdn.cn/vant/cat.jpeg" />
            </van-cell>
            <van-cell title="手机号" is-link value="1822****878" to="updateProfile" />
            <van-cell
                title="昵称"
                is-link
                value="君落羽"
                :to="{ name: 'updateProfile', params: { nickname: '君落羽' } }"
            />
            <van-cell title="性别" is-link value="男" />
            <!-- <van-cell title="角色" is-link value="管理员" /> -->
        </van-cell-group>
    </div>
</template>

<script>
import mixinApp from '../../mixins/app';

export default {
    mixins: [mixinApp],
};
</script>
