<script setup>
import { onMounted } from 'vue';

const map = ref(null)
const locations = ref([{
    latitude: 35.1657791,
    longitude: 129.1124163,
    rdAdr:"광안리"
},
{
    latitude: 35.166804,
    longitude: 129.1144004,
    rdAdr:"을지로"
},
{
    latitude: 35.1698391,
    longitude: 129.1310952,
    rdAdr:"비산동"
},
{
    latitude: 35.1711778,
    longitude: 129.1271956,
    rdAdr:"경산역"
},
])

const model = ref(1)


const placeMarkers = async () => {
    try {
        // const response = await Map.containerInfo();
        // locations.value = response.data;
        locations.value.forEach(location => {
            const marker = new naver.maps.Marker({
                position: new naver.maps.LatLng(location.latitude, location.longitude),
                map: map.value,
                icon: {
                    url: './images/avatars/app_logo_04.png',
                    size: new naver.maps.Size(55, 53),
                }
            });
            const infowindow = new naver.maps.InfoWindow({
                content: `<div style="padding:10px;"><a href="https://map.naver.com/v5/search/${encodeURIComponent(location.rdAdr)}" style="color: rgb(0, 104, 195);">${location.rdAdr}</a></div>`,
                borderWidth: 0,
                disableAnchor: true,
            });
            naver.maps.Event.addListener(marker, 'click', () => {
                if (infowindow.getMap()) {
                    infowindow.close();
                } else {
                    infowindow.open(map.value, marker);
                }
            });
        });
    } catch (error) {
        console.log("컨테이너 위치 조회 실패", error);
    }
}

const handleClick = (n) => {
    if (model.value === n) {
        return;
    } else {
        model.value = n;
    }
};


onMounted(async () => {
    map.value = new naver.maps.Map('map', placeMarkers());
    await placeMarkers()
})

</script>

<template>
    <div>
        <VCard title="배회 인원 찾기">
            <VRow class="px-6 mb-4 select-box">
                <VCol cols="2" class="pa-1">
                    <select>
                        <option>실종시간(시작)</option>
                        <option>1시</option>
                        <option>2시</option>
                    </select>
                </VCol>
                <VCol cols="2" class="pa-1">
                    <select>
                        <option>실종시간(종료)</option>
                        <option>1시</option>
                        <option>2시</option>
                    </select>
                </VCol>
                <VCol cols="7" class="pa-1">
                    <select multiple>
                        <option>카메라 위치 다중 선택</option>
                        <option>1시</option>
                        <option>2시</option>
                    </select>
                </VCol>
                <VCol cols="1" class="pa-1">
                    <VBtn class="search-user-info">검색</VBtn>
                </VCol>
                <VCol cols="2" class="pa-1">
                    <select>
                        <option>상의 종류</option>
                        <option>반팔</option>
                        <option>긴팔</option>
                    </select>
                </VCol>
                <VCol cols="2" class="pa-1">
                    <select>
                        <option>상의 색상</option>
                        <option>노랑</option>
                        <option>검정</option>
                    </select>
                </VCol>
                <VCol cols="2" class="pa-1">
                    <select>
                        <option>하의 종류</option>
                        <option>반바지</option>
                        <option>긴바지</option>
                    </select>
                </VCol>
                <VCol cols="2" class="pa-1">
                    <select>
                        <option>하의 색상</option>
                        <option>노랑</option>
                        <option>검정</option>
                    </select>
                </VCol>
                <VCol cols="2" class="pa-1">
                    <select>
                        <option>악세사리</option>
                        <option>귀걸이</option>
                        <option>팔찌</option>
                    </select>
                </VCol>
                <VCol cols="2" class="pa-1">
                    <VFileInput label="이미지 파일 선택" prepend-icon="mdi-paperclip" />
                </VCol>
            </VRow>

            <div class="px-6 d-flex gap-5">
                <div id="map" style="width: 100%; height: 700px"></div>
                <div class="click-main-img">
                    <v-expand-transition>
                        <v-sheet v-if="model != null">
                            <div class="d-flex fill-height align-center justify-center">
                                <img src="/public/images/avatars/avatar-1.png" alt="클릭한 이미지">
                            </div>
                        </v-sheet>
                    </v-expand-transition>
                    <div class="mt-2">
                        <span>위치 : 동래 카메라 3번 (동래역 3번출구)</span><br />
                        <span>시간 : 2024-07-22 오후 6시 30분 27초</span>
                    </div>
                </div>
            </div>
            <v-sheet class="mx-auto" elevation="8">
                <v-slide-group v-model="model" class="pa-4" selected-class="bg-primary" show-arrows>
                    <v-slide-group-item v-for="n in 15" :key="n" v-slot="{ isSelected, toggle, selectedClass }">
                        <v-card :class="['ma-4','anActive', selectedClass, { 'active-slide': model === n }]" color="grey-lighten-1" @click="handleClick(n)">
                            <div class="d-flex fill-height align-center justify-center">
                                <img src="/public/images/avatars/avatar-1.png" alt="클릭한 이미지">
                            </div>
                        </v-card>
                    </v-slide-group-item>
                </v-slide-group>
            </v-sheet>
        </VCard>
    </div>
</template>

<style scoped>
select {
    border: 1px solid rgba(34, 48, 62, 0.217);
    padding: 0 10px;
    width: 100%;
    height: 38px;
    border-radius: 5px;
    outline: none;
    cursor: pointer;
    background: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='800px' height='800px' viewBox='0 0 24 24' fill='none'%3E%3Cpath d='M5.70711 9.71069C5.31658 10.1012 5.31658 10.7344 5.70711 11.1249L10.5993 16.0123C11.3805 16.7927 12.6463 16.7924 13.4271 16.0117L18.3174 11.1213C18.708 10.7308 18.708 10.0976 18.3174 9.70708C17.9269 9.31655 17.2937 9.31655 16.9032 9.70708L12.7176 13.8927C12.3271 14.2833 11.6939 14.2832 11.3034 13.8927L7.12132 9.71069C6.7308 9.32016 6.09763 9.32016 5.70711 9.71069Z' fill='%230F0F0F'/%3E%3C/svg%3E") no-repeat right 10px center;
    background-size: 16px 16px;
}

.select-box {
    position: relative;
}

.search-user-info {
    position: absolute;
    top: 4px;
    right: 30px;
    width: 7%;
}

.mdi-paperclip {
    display: none;
}

#map {
    flex: 2;
}

.click-main-img {
    flex: 1;
}

.click-main-img img {
    width: 100%;
    height: 650px;
}

.anActive {
    opacity: .5;
}

.active-slide {
    opacity: 1;
}
</style>


<!-- 
    1. 초기 렌더링시 핀 꽂혀있는 곳 렌더링
    2. 카메라 선택시 카메라 이름 박스에 표시
    3. 카메라 선택시 아이콘 색 바뀜
    4. 카메라 박스 초기화 버튼
    5. 선택되어있는 박스 클릭스 카메라 이름 박스에 있는 해당 카메라 지움
    6. 선택한 카메라에 있는 이미지들 밑 슬라이드에 표시
-->