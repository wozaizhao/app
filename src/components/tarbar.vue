<template>
    <van-tabbar class="tarbar" route :value="active" fixed active-color="#fcd34d">
        <van-tabbar-item name="home" icon="search" replace to="/">搜索</van-tabbar-item>
        <van-tabbar-item name="apps" icon="apps-o" replace to="/apps">应用</van-tabbar-item>
        <!-- <van-tabbar-item icon="fire-o" replace to="/cate">动态</van-tabbar-item> -->
        <van-tabbar-item name="me" icon="contact" replace to="/me">我的</van-tabbar-item>
    </van-tabbar>
</template>

<script>
// import { ref, watch } from 'vue';
export default {
    props: {
        active: {
            type: String,
            default: 'home',
        },
    },
    setup() {},
};
</script>

<style>
.tarbar {
    padding-bottom: constant(safe-area-inset-bottom);
    padding-bottom: env(safe-area-inset-bottom);
}
</style>
