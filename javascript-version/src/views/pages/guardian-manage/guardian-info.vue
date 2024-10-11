<script setup>
import Control from '@/api/Control';
import { onMounted, onUnmounted } from 'vue';
import debounce from 'lodash/debounce';

const smartShoesEquArr = ref([])
const pageSmartShoes = ref(0)
const size = ref(10)
const indexPage = ref(1)
const searchUsername = ref('')
const locListDate = ref([])

const conList = async (searchValue) => {
    try {
        const searchParam = searchValue || '';
        const response = await Control.getUserLog(searchParam, pageSmartShoes.value, size.value)
        smartShoesEquArr.value = response.data;
    } catch (error) {
        console.log("회원 로그 조회 실패", error);
    }
}

const getLocList = async () => {
    try {
        const response = await GconContainer.gconSelect()
        locListDate.value = response.data
    } catch (e) {
        console.log("지역리스트 조회 실패", e)
    }
}

const indexPageLoadAllUser = async (page) => {
    indexPage.value = page;
    pageSmartShoes.value = page - 1;
    await conList();
}

const onSearchUsernameChange = debounce(async () => {
    pageSmartShoes.value = 0;
    await conList(searchUsername.value);
});

onMounted(async () => {
    await conList();
    await getLocList();
})

onUnmounted(() => {
    onSearchUsernameChange.cancel();
});

</script>

<template>
    <div>
        <VCard title="보호관찰자 리스트 조회" class="position-relative">
            <div class="px-4">
                <div class="input_date_box align-center d-flex gap-2" style="width: 1100px;">
                    <span class="d-md-flex align-center text-disabled ms-2" style="width:300px;">
                        <VTextField placeholder="회원명 / ID" v-model="searchUsername" @input="onSearchUsernameChange">
                            <IconBtn style="height: 26px;">
                                <VIcon icon="bx-search" />
                            </IconBtn>
                        </VTextField>
                    </span>
                </div>

                <VTable>
                    <thead>
                        <tr>
                            <th scope="col" class="text-center">번호</th>
                            <th scope="col" class="text-center">이름</th>
                            <th scope="col" class="text-center">회원 ID</th>
                            <th scope="col" class="text-center">생년월일</th>
                            <th scope="col" class="text-center">비고</th>
                        </tr>
                    </thead>

                    <tbody v-if="smartShoesEquArr.totalElements !== 0" class="text-center">
                        <tr v-for="(conList, index) in smartShoesEquArr.content" :key="index">
                            <td>
                                <RouterLink :to="`/guardian-info/${conList.userSid}`">
                                    {{ index + 1 }}
                                </RouterLink>
                            </td>
                            <td>
                                <RouterLink :to="`/guardian-info/${conList.userSid}`">
                                    {{ conList.name }}
                                </RouterLink>
                            </td>
                            <td>
                                <RouterLink :to="`/guardian-info/${conList.userSid}`">
                                    {{ conList.userId }}
                                </RouterLink>
                            </td>
                            <td>
                                <RouterLink :to="`/guardian-info/${conList.userSid}`">
                                    {{ conList.birth }}
                                </RouterLink>
                            </td>
                            <td>
                                <RouterLink :to="`/guardian-info/${conList.userSid}`">
                                    {{ conList.remark }}
                                </RouterLink>
                            </td>
                        </tr>
                    </tbody>
                    <tbody v-else>
                        <tr>
                            <td colspan="5">조회된 관찰자가 없습니다</td>
                        </tr>
                    </tbody>
                </VTable>
                <div class="d-flex justify-center w-100 my-4">
                    <nav>
                        <ul class="d-flex">
                            <li class="border mx-1 text-center li" v-for="page in smartShoesEquArr.totalPages"
                                :key="page" :class="{ active: indexPage === page }">
                                <span @click.prevent="indexPageLoadAllUser(page)" style="display: block;">{{ page
                                    }}</span>
                            </li>
                        </ul>
                    </nav>
                </div>
            </div>
        </VCard>
    </div>
</template>

<style scoped>
li {
    list-style: none;
    width: 25px;
    height: 30px;
    line-height: 30px;
    cursor: pointer;
    border-radius: 5px;
}

li.active {
    color: #fff;
    background: #696CFF;
    border: none;
}
</style>