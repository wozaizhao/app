<template>
    <div class="update-profile">
        <van-nav-bar :title="title" left-arrow @click-left="goBack">
            <template #right>
                <van-button type="primary" class="px-1.5" size="small" @click="save"> 保存 </van-button>
            </template>
        </van-nav-bar>
        <van-cell-group>
            <van-field v-if="method === 'phone'" v-model="phone" placeholder="请输入手机号" />
            <van-field v-else-if="method === 'nickname'" v-model="nickname" placeholder="请输入昵称" />
            <van-radio-group v-else-if="method === 'gender'" v-model="gender">
                <van-cell-group>
                    <van-cell title="男" clickable @click="gender = '1'">
                        <template #right-icon>
                            <van-radio name="1" />
                        </template>
                    </van-cell>
                    <van-cell title="女" clickable @click="gender = '2'">
                        <template #right-icon>
                            <van-radio name="2" />
                        </template>
                    </van-cell>
                </van-cell-group>
            </van-radio-group>
            <van-field v-else-if="method === 'bio'" v-model="bio" placeholder="请输入简介" />
        </van-cell-group>
    </div>
</template>

<script>
import { ref, onMounted, computed } from 'vue';
import { Toast } from 'vant';
import { activeUser, getRouter, updateUserInfo, requestCurrentUser } from '../../api';
import mixinApp from '../../mixins/app';
import { delayGoBack } from '../../utils';
const methods = {
    phone: '手机号',
    nickname: '昵称',
    gender: '性别',
    bio: '简介',
};
const columns = ['男', '女'];
export default {
    mixins: [mixinApp],
    setup() {
        const method = ref('');
        onMounted(() => {
            method.value = getRouter().currentRoute.value.params.method || '';
        });

        const title = computed(() => {
            return methods[method.value] ? `修改${methods[method.value]}` : '修改';
        });

        const phone = ref(activeUser.value.phone);
        const nickname = ref(activeUser.value.nickname);
        const bio = ref(activeUser.value.bio);
        const gender = ref('' + activeUser.value.gender);

        const save = async () => {
            let params = {};
            let message = '';
            switch (method.value) {
                case 'phone':
                    params = { phone: phone.value };
                    message = phone.value ? '' : '请输入手机号';
                    break;
                case 'nickname':
                    params = { nickname: nickname.value };
                    message = nickname.value ? '' : '请输入昵称';
                    break;
                case 'gender':
                    params = { gender: parseInt(gender.value) };
                    message = gender.value ? '' : '请选择性别';
                    break;
                case 'bio':
                    params = { bio: bio.value };
                    message = bio.value ? '' : '请输入简介';
                    break;
                default:
                    break;
            }
            if (message) {
                Toast(message);
                return;
            }
            const { status, data } = await updateUserInfo(params);
            if (status === 'success' && data) {
                requestCurrentUser();
                delayGoBack();
            }
        };

        return {
            activeUser,
            method,
            title,
            phone,
            nickname,
            bio,
            columns,
            gender,
            save,
        };
    },
};
</script>
