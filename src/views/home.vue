<template>
    <div class="home">
        <tarbar></tarbar>
    </div>
</template>

<script>
import { onMounted } from 'vue';
import tarbar from '../components/tarbar.vue';
import { isWeixin, initSDK } from '../api';

export default {
    components: {
        tarbar,
    },
    setup() {
        onMounted(async () => {
            // console.log('isLoggedIn', isLoggedIn());
            if (isWeixin()) {
                await initSDK();
            }
        });
    },
};
</script>
