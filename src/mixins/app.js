// import config from '@/config';
import { getRouter } from '../api';

export default {
    // computed: {
    //     primaryColor() {
    //         return config.PRIMARY_COLOR;
    //     },
    // },
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
