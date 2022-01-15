<template>
    <div class="update-profile">
        <van-nav-bar :title="title" left-arrow @click-left="goBack">
            <template #right>
                <van-button type="primary" class="px-1.5" size="small"> 保存 </van-button>
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
import { activeUser, getRouter } from '../../api';
import mixinApp from '../../mixins/app';
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

        const phone = ref('');
        const nickname = ref('');
        const bio = ref('');
        const gender = ref('');

        return {
            activeUser,
            method,
            title,
            phone,
            nickname,
            bio,
            columns,
            gender,
        };
    },
};
</script>
