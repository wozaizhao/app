<template>
    <div class="update-profile">
        <van-nav-bar title="修改" left-arrow @click-left="goBack">
            <template #right>
                <van-button type="primary" class="px-1.5" size="small"> 保存 </van-button>
            </template>
        </van-nav-bar>
        <van-cell-group> </van-cell-group>
    </div>
</template>

<script>
import mixinApp from '../../mixins/app';

export default {
    mixins: [mixinApp],
};
</script>
