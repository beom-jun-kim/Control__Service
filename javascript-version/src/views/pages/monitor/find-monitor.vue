<script setup>
import { onMounted } from 'vue';

const addRadio = ref("nomal")
const map = ref(null)
const markers = ref([])
const locations = ref([{
    latitude: 35.1657791,
    longitude: 129.1124163,
    rdAdr: "부산 수영구 남천동로 100"
},
{
    latitude: 35.166804,
    longitude: 129.1144004,
    rdAdr: "부산 수영구 남천동로108번길 31"
},
{
    latitude: 35.1698391,
    longitude: 129.1310952,
    rdAdr: "경상북도 봉화군 석포면 석포로1길 33"
},
{
    latitude: 35.1711778,
    longitude: 129.1271956,
    rdAdr: "경상남도 양산시 상북면 율리길 13"
},
])


// 실종시간 (시작)
const startDisappearanceSelect = ref({ time: '실종시간(시작)' })
const startDisappearanceItems = [
    { time: '1시' },
    { time: '2시' },
    { time: '3시' },
    { time: '4시' },
    { time: '5시' },
]


// 실종시간 (종료)
const endDisappearanceSelect = ref({ time: '실종시간(종료)' })
const endDisappearanceItems = [
    { time: '1시' },
    { time: '2시' },
    { time: '3시' },
    { time: '4시' },
    { time: '5시' },
]


// 지역 선택
const cityesSelect = ref([])
const cityesItems = [
    '서울특별시',
    '부산광역시',
    '대구광역시',
    '인천광역시',
    '광주광역시',
    '대전광역시',
    '울산광역시',
    '세종특별자치시',
    '경기도',
    '강원특별자치도',
    '충청북도',
    '충청남도',
    '전북특별자치도',
    '전라남도',
    '경상북도',
    '경상남도',
    '제주특별자치도',
]

// 상의 종류
const typeOfTopSelect = ref({ top: '상의 종류' })
const typeOfTopItems = [
    { top: '반팔' },
    { top: '긴팔' },
    { top: '5부' },
    { top: '7부' },
]

// 상의 색상
const colorOfTopSelect = ref({ color: '상의 색상' })
const colorOfTopItems = [
    { color: '빨강' },
    { color: '파랑' },
    { color: '검정' },
    { color: '초록' },
]

// 하의 종류
const typeOfBottomSelect = ref({ bottom: '하의 종류' })
const typeOfBottomItems = [
    { bottom: '긴바지' },
    { bottom: '반바지' },
    { bottom: '트레이닝' },
    { bottom: '7부' },
]

// 하의 종류
const ColorOfBottomSelect = ref({ color: '하의 색상' })
const ColorOfBottomItems = [
    { color: '긴바지' },
    { color: '반바지' },
    { color: '트레이닝' },
    { color: '7부' },
]

// 악세사리
const accSelect = ref({ acc: '악세사리' })
const accItems = [
    { acc: '팔찌' },
    { acc: '모자' },
    { acc: '안경' },
    { acc: '귀걸이' },
]

const model = ref(1)

const images = ref([
    {
        latitude: 37.485682,
        longitude: 126.986358,
        url: "/public/images/avatars/avatar-1.png",
    },
    {
        latitude: 37.486491,
        longitude: 126.981876,
        url: "/public/images/avatars/bird-9078403_1280.jpg",
    },
    {
        latitude: 37.555946,
        longitude: 126.972317,
        url: "/public/images/avatars/darling-7853389_640.jpg",
    },
    {
        latitude: 37.5384876,
        longitude: 127.0732147,
        url: "/public/images/avatars/japan-9074037_1280.jpg",
    },
    {
        latitude: 37.4909472,
        longitude: 126.971493,
        url: "/public/images/avatars/mountains-7957191_1280.jpg",
    },
    {
        latitude: 37.4794939,
        longitude: 126.9931207,
        url: "/public/images/avatars/watzmann-9024268_1280.jpg",
    },
    {
        latitude: 37.4886232,
        longitude: 126.9668169,
        url: "/public/images/avatars/wave-9067749_1280.jpg",
    },
    {
        latitude: 37.4901004,
        longitude: 127.0063426,
        url: "/public/images/avatars/etretat-7391029_1280.jpg",
    },
    {
        latitude: 37.4846519,
        longitude: 126.981632,
        url: "/public/images/avatars/penguins-9028827_1280.jpg",
    },
]);

// 초기 렌더링
const placeMarkers = async () => {
    try {
        // const bounds = new naver.maps.LatLngBounds();
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

            // bounds.extend(new naver.maps.LatLng(location.latitude, location.longitude));

            const infowindow = new naver.maps.InfoWindow({
                content: `<div style="padding:10px;"><a href="https://map.naver.com/v5/search/${encodeURIComponent(location.rdAdr)}" style="color: rgb(0, 104, 195);">${location.rdAdr}</a></div>`,
                borderWidth: 0,
                disableAnchor: true,
            });

            naver.maps.Event.addListener(marker, 'mouseover', () => {
                infowindow.open(map.value, marker);

            });
            naver.maps.Event.addListener(marker, 'mouseout', () => {
                infowindow.close();
            });

            naver.maps.Event.addListener(marker, 'click', () => {
                const currentIcon = marker.getIcon().url;
                if (currentIcon === './images/avatars/app_logo_04.png') {
                    marker.setIcon({
                        url: './images/avatars/active_marker.png',
                        size: new naver.maps.Size(55, 53),
                    });
                } else {
                    marker.setIcon({
                        url: './images/avatars/app_logo_04.png',
                        size: new naver.maps.Size(55, 53),
                    });
                }
            });
        });

        map.value.fitBounds(bounds);

    } catch (error) {
        console.log("카메라 위치 조회 실패", error);
    }
};


// 슬라이드 이미지 클릭
const slideImgHandleClick = (n, latitude, longitude) => {
    if (model.value === n) {
        return;
    } else {
        model.value = n;
    }

    markers.value.forEach(marker => marker.setMap(null));
    markers.value = [];
    
    const position = new naver.maps.LatLng(latitude, longitude);
    map.value.setCenter(position);
    map.value.setZoom(15);

    const marker = new naver.maps.Marker({
        position: position,
        map: map.value,
        icon: {
            url: './img/app_logo_04.png',
            size: new naver.maps.Size(55, 53)
        }
    });
    const infowindow = new naver.maps.InfoWindow({
        content: `<div style="padding:10px;"><a href="https://map.naver.com/v5/search/${encodeURIComponent(rdAdr)}" style="color: rgb(0, 104, 195);">${rdAdr}</a></div>`,
        borderWidth: 0,
        disableAnchor: true,
    });
    naver.maps.Event.addListener(marker, 'click', () => {
        if (infowindow.getMap()) {
            infowindow.close();
        } else {
            infowindow.open(this.map, marker);
        }
    });

    markers.value.fitBounds(bounds);
};


onMounted(async () => {
    map.value = new naver.maps.Map('map', placeMarkers());
    await placeMarkers()
})

</script>

<template>
    <div>
        <VCard title="배회 인원 찾기">
            <div class="px-6">
                <div class="radio-box">
                    <div class="radio-box-wrap">
                        <input type="radio" id="addPhone" name="addId" v-model="addRadio" value="nomal">
                        <label for="addPhone">일반 검색</label>
                    </div>
                    <div class="radio-box-wrap">
                        <input type="radio" id="addId" name="addId" v-model="addRadio" value="img">
                        <label for="addId">이미지 검색</label>
                    </div>
                </div>

                <VRow class="mb-4" v-if="addRadio === 'nomal'">
                    <VCol cols="2" class="pa-1">
                        <v-select v-model="startDisappearanceSelect" :items="startDisappearanceItems" item-title="time"
                            item-value="abbr" label="실종시간(시작)" persistent-hint return-object single-line></v-select>
                    </VCol>
                    <VCol cols="2" class="pa-1">
                        <v-select v-model="endDisappearanceSelect" :items="endDisappearanceItems" item-title="time"
                            item-value="abbr" label="실종시간(종료)" persistent-hint return-object single-line></v-select>
                    </VCol>
                    <VCol cols="8" class="pa-1">
                        <v-select v-model="cityesSelect" :items="cityesItems" label="지역선택" multiple
                            persistent-hint></v-select>
                    </VCol>
                    <VCol cols="2" class="pa-1">
                        <v-select v-model="typeOfTopSelect" :items="typeOfTopItems" item-title="top" item-value="abbr"
                            label="상의 종류" persistent-hint return-object single-line></v-select>
                    </VCol>
                    <VCol cols="2" class="pa-1">
                        <v-select v-model="colorOfTopSelect" :items="colorOfTopItems" item-title="color"
                            item-value="abbr" label="상의 색상" persistent-hint return-object single-line></v-select>
                    </VCol>
                    <VCol cols="2" class="pa-1">
                        <v-select v-model="typeOfBottomSelect" :items="typeOfBottomItems" item-title="bottom"
                            item-value="abbr" label="하의 종류" persistent-hint return-object single-line></v-select>
                    </VCol>
                    <VCol cols="2" class="pa-1">
                        <v-select v-model="ColorOfBottomSelect" :items="ColorOfBottomItems" item-title="color"
                            item-value="abbr" label="하의 색상" persistent-hint return-object single-line></v-select>
                    </VCol>
                    <VCol cols="2" class="pa-1">
                        <v-select v-model="accSelect" :items="accItems" item-title="acc" item-value="abbr" label="악세사리"
                            persistent-hint return-object single-line></v-select>
                    </VCol>
                    <VCol cols="2" class="pa-1">
                        <VBtn class="search-user-info" @click="searchContainer">검색</VBtn>
                    </VCol>
                </VRow>
                <VRow class="mb-4" v-if="addRadio === 'img'">
                    <VCol cols="6" class="pa-1">
                        <VFileInput label="이미지 파일 선택" prepend-icon="mdi-paperclip" />
                    </VCol>
                    <VCol cols="1" class="pa-1">
                        <VBtn class="search-user-info" @click="searchContainer">검색</VBtn>
                    </VCol>
                </VRow>
            </div>

            <div class="px-6 d-flex gap-5">
                <div id="map" style="width: 100%; height: 700px"></div>
                <div class="click-main-img" v-if="model !== null">
                    <v-expand-transition>
                        <v-sheet>
                            <div class="d-flex fill-height align-center justify-center">
                                <img :src="images[model - 1].url" alt="선택된 이미지" />
                            </div>
                            <div class="mt-2">
                                <span>위치 : 동래 카메라 3번 (동래역 3번출구)</span><br />
                                <span>시간 : 2024-07-22 오후 6시 30분 27초</span>
                            </div>
                        </v-sheet>
                    </v-expand-transition>
                </div>
            </div>
            <v-sheet class="mx-auto" elevation="8">
                <v-slide-group v-if="images !== 0" v-model="model" class="pa-4" selected-class="bg-primary" show-arrows>
                    <v-slide-group-item v-for="(image, index) in images" :key="index"
                        v-slot="{ isSelected, toggle, selectedClass }">
                        <v-card :class="['ma-4', 'anActive', selectedClass, { 'active-slide': model === index + 1 }]"
                            color="grey-lighten-1"
                            @click="slideImgHandleClick(index + 1, image.latitude, image.longitude)" height="200"
                            width="200">
                            <div class="d-flex fill-height align-center justify-center">
                                <img :src="image.url" alt="슬라이드 이미지" style="width: 100%; height: 100%;">
                            </div>
                        </v-card>
                    </v-slide-group-item>
                </v-slide-group>
            </v-sheet>
        </VCard>
    </div>
</template>

<style scoped>
.radio-box {
    display: flex;
    width: 100%;
    margin: 0 0 25px;
}

.radio-box .radio-box-wrap {
    white-space: nowrap;
    font-size: 17px;
}

.radio-box .radio-box-wrap:first-child {
    margin-right: 40px;
}

.radio-box input {
    margin-right: 7px;
    accent-color: #111;
}

.radio-box label {
    cursor: pointer;
}

select {
    border: 1px solid rgba(34, 48, 62, 0.217);
    padding: 0 10px;
    width: 100%;
    height: 40px;
    border-radius: 5px;
    outline: none;
    cursor: pointer;
    background: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='800px' height='800px' viewBox='0 0 24 24' fill='none'%3E%3Cpath d='M5.70711 9.71069C5.31658 10.1012 5.31658 10.7344 5.70711 11.1249L10.5993 16.0123C11.3805 16.7927 12.6463 16.7924 13.4271 16.0117L18.3174 11.1213C18.708 10.7308 18.708 10.0976 18.3174 9.70708C17.9269 9.31655 17.2937 9.31655 16.9032 9.70708L12.7176 13.8927C12.3271 14.2833 11.6939 14.2832 11.3034 13.8927L7.12132 9.71069C6.7308 9.32016 6.09763 9.32016 5.70711 9.71069Z' fill='%230F0F0F'/%3E%3C/svg%3E") no-repeat right 10px center;
    background-size: 16px 16px;
}

.camera-place {
    width: 100%;
    height: 40px;
    border: 1px solid rgba(34, 48, 62, 0.217);
    overflow-y: auto;
    border-radius: 5px;
    padding: 5px 10px;
    line-height: 2;
    scroll-snap-type: y mandatory;
}

.camera-place span {
    scroll-snap-align: start;
}

.search-user-info {
    width: 100%;
}

.mdi-paperclip {
    display: none;
}

#map {
    flex: 3;
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