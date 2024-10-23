<script setup>
import Control from '@/api/Control';
import { useRoute } from 'vue-router';
import { onMounted } from 'vue';

const route = useRoute()
const userInfodetail = ref({})
const guardianUserList = ref([])

const loadGuardianUserDetail = async (id) => {
    try {
        const response = await Control.getGuardianUserDetail(id)
        userInfodetail.value = response.data
        await loadGuardianUserList(id)
    } catch (e) {
        console.lg("조회 실패", e)
    }
}

const loadGuardianUserList = async (id) => {
    try {
        const response = await Control.getGuardianUserList(id)
        guardianUserList.value = response.data
        console.log("guardianUserList.value", guardianUserList.value)
    } catch (e) {
        console.lg("조회 실패", e)
    }
}

onMounted(async () => {
    await loadGuardianUserDetail(route.params.id)
})
</script>

<template>
    <div>
        <div>
            <VCard>
                <VCardText>
                    <h2 class="mb-1">
                        보호관찰자 상세
                    </h2>
                </VCardText>
                <VCardText class="mt-4">
                    <div class="user-info">
                        <span>아이디</span>
                        <span>{{ userInfodetail.userId }}</span>
                    </div>

                    <div class="user-info">
                        <span>이름</span>
                        <span>{{ userInfodetail.name }}</span>
                    </div>

                    <div class="user-info">
                        <span>생년월일</span>
                        <span>{{ userInfodetail.brthDe }}</span>
                    </div>

                    <div class="user-info">
                        <span>성별</span>
                        <span>{{ userInfodetail.gender === 'F' ? '여자' : '남자' }}</span>
                    </div>

                    <div class="user-info">
                        <span>전화번호</span>
                        <span>{{ userInfodetail.phoneNumber }}</span>
                    </div>

                    <VCol cols="12">
                        <div class="mt-4">보호자 리스트</div>
                        <VTable>
                            <thead>
                                <tr>
                                    <th scope="col" class="text-center">번호</th>
                                    <th scope="col" class="text-center">이름</th>
                                    <th scope="col" class="text-center">회원 ID</th>
                                    <th scope="col" class="text-center">전화번호</th>
                                </tr>
                            </thead>

                            <tbody v-if="guardianUserList !== 0" class="text-center">
                                <tr v-for="(guardianUser, index) in guardianUserList" :key="index">
                                    <td>{{ index + 1 }}</td>
                                    <td>{{ guardianUser.name }}</td>
                                    <td>{{ guardianUser.userId }}</td>
                                    <td>{{ guardianUser.brthDe }}</td>
                                </tr>
                            </tbody>
                            <tbody v-else>
                                <tr>
                                    <td colspan="4">조회된 보호 관찰자가 없습니다</td>
                                </tr>
                            </tbody>
                        </VTable>
                    </VCol>
                </VCardText>
            </VCard>
        </div>
    </div>
</template>

<style scoped>
.user-info {
    margin-bottom: 20px;
}

.user-info span:first-child {
    display: inline-block;
    width: 130px;
}
</style>