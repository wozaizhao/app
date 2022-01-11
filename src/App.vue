<script setup>
const themeVars = {
    buttonPrimaryColor: '#191919',
    buttonPrimaryBorderColor: '#191919',
    buttonPrimaryBackgroundColor: '#fff451',
    navBarIconColor: '#333',
};

// This starter template is using Vue 3 <script setup> SFCs
// Check out https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup
</script>

<template>
    <van-config-provider :theme-vars="themeVars">
        <router-view />
    </van-config-provider>
</template>

<style></style>
