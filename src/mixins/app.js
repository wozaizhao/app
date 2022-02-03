// import config from '@/config';
import { getRouter } from '../api';

export default {
    methods: {
        goBack() {
            getRouter().back();
        },
        delayGoBack() {
            setTimeout(() => {
                this.goBack();
            }, 1000);
        },
        goHome() {
            getRouter().push('/');
        },
        goTo(name) {
            getRouter().push(name);
        },
    },
};
