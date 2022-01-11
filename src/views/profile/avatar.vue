<template>
    <div class="update-avatar">
        <van-nav-bar title="修改头像" left-arrow @click-left="goBack">
            <template #right>
                <van-button type="primary" class="px-1.5" size="small"> 保存 </van-button>
            </template>
        </van-nav-bar>
    </div>
</template>

<script>
import mixinApp from '../../mixins/app';

export default {
    mixins: [mixinApp],
};
</script>
