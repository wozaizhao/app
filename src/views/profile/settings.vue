<template>
    <div class="settings">
        <van-nav-bar v-if="!isWeapp" title="设置" left-arrow @click-left="goBack" />
        <div class="pt-1">
            <van-cell-group inset>
                <van-cell center title="深色模式">
                    <template #right-icon>
                        <van-switch active-color="#82cb72" v-model="darkMode" size="24" />
                    </template>
                </van-cell>
                <van-cell title="单元格" is-link value="内容" />
                <van-cell title="单元格" is-link value="内容" />
            </van-cell-group>
        </div>

        <div class="p-2">
            <van-button round block type="primary">按钮</van-button>
        </div>
    </div>
</template>

<script>
import { onMounted, ref, watch } from 'vue';
import mixinApp from '../../mixins/app';
import { getEnv, isWeixin, stored } from '../../api';
import config from '../../config';
import { switchTheme } from '../../utils';

export default {
    mixins: [mixinApp],
    setup() {
        const darkMode = ref(false);
        const isWeapp = ref(false);
        onMounted(async () => {
            if (isWeixin()) {
                const env = await getEnv();
                isWeapp.value = env.miniprogram;
            }
            document.title = '设置';
            const theme = stored('theme');
            darkMode.value = theme === 'dark';
        });
        watch(darkMode, (darkMode) => {
            switchTheme(darkMode ? 'dark' : 'light');
        });
        return {
            isWeapp,
            config,
            darkMode,
        };
    },
};
</script>
