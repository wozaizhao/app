<template>
    <div class="login w-screen h-screen pt-5">
        <van-form @submit="onSubmit">
            <van-cell-group inset>
                <van-field
                    v-model="phone"
                    :maxlength="11"
                    type="digit"
                    name="phone"
                    clearable
                    @clear="onPhoneClear"
                    placeholder="输入手机号(新号码自动注册)"
                />
                <van-field v-model="code" name="code" :maxlength="6" type="digit" center placeholder="输入验证码">
                    <template #button>
                        <van-button :disabled="!sendReady" size="small" @click="onGetCaptcha" type="primary">{{
                            captchaText
                        }}</van-button>
                    </template>
                </van-field>
                <p id="captchaBox"></p>
            </van-cell-group>
            <div style="margin: 16px">
                <van-button
                    round
                    block
                    :loading="submiting"
                    loading-text="登录中..."
                    type="primary"
                    :disabled="!submitReady"
                    native-type="submit"
                >
                    登录
                </van-button>
            </div>
        </van-form>
        <div class="fixed w-full bottom-0 text-center text-gray-400">
            <div class="p-2">
                <span
                    >登录注册即代表你同意 我在找
                    <a class="text-cyan-700" href="https://img.wozaizhao.com/policy/1.0/terms_of_service.html"
                        >《服务协议》</a
                    >
                    与
                    <a class="text-cyan-700" href="https://img.wozaizhao.com/policy/1.0/privacy_policy.html"
                        >《隐私政策》</a
                    >
                </span>
                <br />
                <span>未注册用户将直接为你创建帐户</span>
            </div>
        </div>
    </div>
</template>

<script>
import { ref, reactive, computed, onBeforeUnmount } from 'vue';
import { requestCaptcha, login, getRouter, getEnv, wxPostMessage } from '../api';

export default {
    setup() {
        const phone = ref('');
        const code = ref('');
        const submiting = ref(false);
        const timing = ref(false);
        const countDown = ref(0);
        const interval = ref(0);

        const captchaText = computed(() => (timing.value ? `${countDown.value} 秒后获取` : '获取验证码'));

        const startCountDown = () => {
            countDown.value = 60;
            timing.value = true;
            interval.value = setInterval(() => {
                countDown.value -= 1;
                if (countDown.value < 1) {
                    clearInterval(interval.value);
                    timing.value = false;
                }
            }, 1000);
        };

        onBeforeUnmount(() => {
            clearInterval(interval.value);
        });

        const geetestReady = ref(false);
        const geetestSuccess = ref(false);
        const onSubmit = (values) => {
            submiting.value = true;
            const { phone, code } = values;
            login({
                phone,
                code,
            }).then(async (res) => {
                submiting.value = false;
                if (res.status === 'success') {
                    try {
                        const env = await getEnv();
                        if (env.miniprogram) {
                            wxPostMessage(res.data);
                        }
                    } catch (e) {
                        console.log(e);
                    }
                    // 如果是小程序 就向小程序发新的token
                    getRouter().push('/');
                }
            });
        };
        const geetest = reactive({
            captchaObj: null,
        });

        const onPhoneClear = () => {
            geetest.captchaObj && geetest.captchaObj.reset();
        };

        const onGetCaptcha = () => {
            geetest.captchaObj.showBox();
        };

        const sendReady = computed(() => /^1[3-9]\d{9}$/.test(phone.value) && geetestReady.value && !timing.value);

        const submitReady = computed(() => code.value && geetestSuccess.value);

        initGeetest4(
            {
                captchaId: '19cffc264a62e93875376a9989f01631',
                language: 'zho',
                product: 'bind',
            },
            function (captchaObj) {
                geetest.captchaObj = captchaObj;
                // captchaObj.appendTo('#captchaBox'); //将验证按钮插入到宿主页面中captchaBox元素内

                captchaObj
                    .onReady(function () {
                        //验证码ready之后才能调用showBox方法显示验证码
                        geetestReady.value = true;
                    })
                    .onSuccess(function () {
                        //your code
                        const result = captchaObj.getValidate();
                        startCountDown();
                        const data = Object.assign(result, { phone: phone.value });
                        requestCaptcha(data).then((res) => {
                            const { status } = res;
                            if (status === 'success') {
                                geetestSuccess.value = true;
                            }
                        });
                        // console.log('onSuccess', captchaObj.getValidate());
                        // {lot_number: '2229a397608c4a5e8b162f98584ba6d0', pass_token: 'd55fcc95d3826ad7ad99ca4a8512a0db36cd95ebe3254b302b29108af70291f0', gen_time: '1641522099', captcha_output: '2W2T6RrNJ8qVlCuIQxrHVqp-0vuZ7fZEjXYToUTxkhGx9cIce9…hMFyTk1v4NFIOa91ICybn2n7IXhlDREUj8R8iFcPNiCw0tNcr'}
                    })
                    .onError(function () {
                        //your code
                        console.log('onError');
                    });
            },
        );

        return {
            phone,
            code,
            onSubmit,
            onGetCaptcha,
            onPhoneClear,
            sendReady,
            submitReady,
            submiting,
            captchaText,
        };
    },
};
</script>

<style>
.login {
    --van-cell-background-color: transparent;
    --van-cell-group-background-color: transparent;
}
</style>
