<template>
    <div class="register full-screen bg-white pt-5">
        <van-config-provider :theme-vars="themeVars">
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
                    <van-field
                        v-model="code"
                        name="code"
                        :maxlength="6"
                        type="digit"
                        center
                        clearable
                        placeholder="输入验证码"
                    >
                        <template #button>
                            <van-button :disabled="!sendReady" size="small" @click="onGetCaptcha" type="primary"
                                >获取验证码</van-button
                            >
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
                    <span>登录注册即代表你同意 我在找《服务协议》与《隐私政策》</span>
                    <br />
                    <span>未注册用户将直接为你创建帐户</span>
                </div>
            </div>
        </van-config-provider>
    </div>
</template>

<script>
import { ref, reactive, computed } from 'vue';
import { requestCaptcha, login, getRouter } from '../api';

export default {
    setup() {
        const phone = ref('');
        const code = ref('');
        const submiting = ref(false);
        const themeVars = {
            buttonPrimaryColor: '#191919',
            buttonPrimaryBorderColor: '#191919',
            buttonPrimaryBackgroundColor: '#fff451',
        };
        const geetestReady = ref(false);
        const geetestSuccess = ref(false);
        const onSubmit = (values) => {
            submiting.value = true;
            const { phone, code } = values;
            login({
                phone,
                code,
            }).then((res) => {
                submiting.value = false;
                if (res.status === 'success') {
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

        const sendReady = computed(() => /^1[3-9]\d{9}$/.test(phone.value) && geetestReady.value);

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
            themeVars,
            onGetCaptcha,
            onPhoneClear,
            sendReady,
            submitReady,
            submiting,
        };
    },
};
</script>

<style></style>
