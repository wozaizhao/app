<template>
    <div class="home">
        <tarbar></tarbar>
    </div>
</template>

<script>
import { onMounted } from 'vue';
import tarbar from '../components/tarbar.vue';
import { isLoggedIn } from '../api';

export default {
    components: {
        tarbar,
    },
    setup() {
        onMounted(() => {
            console.log('isLoggedIn', isLoggedIn());
        });
    },
};
</script>
