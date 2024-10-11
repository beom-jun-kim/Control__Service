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

                    <!-- <div class="user-info">
                        <span style="vertical-align: top;">비고</span>
                        <textarea class="remark" placeholder="비고 내용" />
                    </div> -->

                    <!-- <div class="user-result">
                        <div class="result-report">
                            <div class="title">
                                <p>건강이상 검진 레포트</p>
                            </div>
                            <div class="test">
                                <div class="test-text">
                                    <span>측정리스트</span>
                                </div>
                                <div class="test-date">
                                    <span>2022-01-01 00:00</span>
                                </div>
                                <div class="test-date">
                                    <span>2022-01-01 00:00</span>
                                </div>
                            </div>
                        </div>
                        <div class="result-data">
                            <div class="title">
                                <p>레포트 결과 데이터</p>
                            </div>
                            <div class="mat-data">
                                <div class="mat-text">
                                    <span>검지매트 데이터</span>
                                </div>
                                <div class="walk-table">
                                    <div class="walk-table-box walk-table-th">
                                        <span></span>
                                        <span>왼발</span>
                                        <span>오른발</span>
                                        <span style="color: var(--main-color);">표준범위</span>
                                    </div>
                                    <div class="walk-table-box">
                                        <span>보행길이 (cm)</span>
                                        <span>000</span>
                                        <span>000</span>
                                        <span>70-72</span>
                                    </div>
                                    <div class="walk-table-box">
                                        <span>보행 시간 (s)</span>
                                        <span>000</span>
                                        <span>000</span>
                                        <span>0.33~0.73</span>
                                    </div>
                                    <div class="walk-table-box">
                                        <span>보행 속도 (m/s)</span>
                                        <span>000</span>
                                        <span>000</span>
                                        <span>1.37</span>
                                    </div>
                                    <div class="walk-table-box">
                                        <span>보행 각도 (도)</span>
                                        <span>000</span>
                                        <span>000</span>
                                        <span>5~8</span>
                                    </div>
                                    <div class="walk-table-box">
                                        <span>보행 균형 (%)</span>
                                        <span>000</span>
                                        <span>000</span>
                                        <span>48~52</span>
                                    </div>
                                    <div class="walk-table-box">
                                        <span>보간 (cm)</span>
                                        <span>000</span>
                                        <span>000</span>
                                        <span>8~10</span>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div> -->
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

/* .roleBtn {
    position: absolute;
    top: 23px;
    right: 0px;
} */

/* .remark {
    width: 80%;
    height: 100px;
    border: 1px solid #c6c6c6;
    padding: 5px 10px;
    outline: none;
} */

/* .user-result {
    display: flex;
    gap: 10px;
}

.result-report {
    flex: 1;
}

.test {
    border: 1px solid #c6c6c6;
    text-align: center;
}

.test-text {
    border-bottom: 1px solid #c6c6c6;
    padding: 5px 0;
}

.test-date {
    padding: 5px 0;
}

.result-data {
    flex: 2;
}

.mat-data,
.test {
    height: 260px;
}

.mat-data {
    border: 1px solid #c6c6c6;
    padding: 15px;
}

.walk-table-box {
    display: flex;
    width: 50%;
}

.walk-table-box span {
    flex: 1;
    padding: 3px 0;
}

.walk-table-box span:first-child {
    padding-left: 5px;
    color: var(--main-color);
}

.walk-table-box span:nth-child(n+2) {
    text-align: center;
}

.walk-table-box:last-child {
    border: none;
}

.walk-table-th {
    margin-bottom: 10px;
} */
</style>