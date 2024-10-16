<script setup>
import { computed, onMounted } from 'vue';
import FindLoitering from '@/api/FindLoitering';

const addRadio = ref("nomal")
const map = ref([])
const locations = ref([])


// 상의 종류
const typeOfTopSelect = ref()
const typeOfTopItems = ref([])

// 상의 색상
const colorOfTopSelect = ref()
const colorOfTopItems = ref([])

// 하의 종류
const typeOfBottomSelect = ref()
const typeOfBottomItems = ref([])

// 하의 색상
const colorOfBottomSelect = ref()
const colorOfBottomItems = ref([])

// 악세사리
const accSelect = ref()
const accItems = ref([])

// 나이대
const ageSelect = ref()
const ageItems = ref([])

// 성별
const genderSelect = ref()
const genderItems = ref([])

// 지역 선택
const cityesSelect = ref()
const cityesItems = ref([])

// 실종시간 (시작)
const startYearDisappearanceSelect = ref()
const startMonthsDisappearanceSelect = ref()
const startDayDisappearanceSelect = ref()
const startHoursDisappearanceSelect = ref()
const startMinutesDisappearanceSelect = ref()

// 실종구간 (종료)
const endtYearDisappearanceSelect = ref()
const endtMonthsDisappearanceSelect = ref()
const endtDayDisappearanceSelect = ref()
const endtHoursDisappearanceSelect = ref()
const endtMinutesDisappearanceSelect = ref()

const startYear = ref(1900)
const currentYear = new Date().getFullYear()
const months = ref(Array.from({ length: 12 }, (v, k) => k + 1))
const day = ref(Array.from({ length: 31 }, (v, k) => k + 1))
const hours = ref(Array.from({ length: 24 }, (v, k) => k + 1))
const minutes = ref(Array.from({ length: 60 }, (v, k) => k + 1))

const formatDateTime = (year, month, day, hours, minutes) => {
    const formattedDate = `${String(year)}-${String(month).padStart(2, 0)}-${String(day).padStart(2, 0)}`
    const formattedTime = `${String(hours).padStart(2, 0)}:${String(minutes).padStart(2, 0)}:00`
    return `${formattedDate}T${formattedTime}`
}

// 셀렉트 박스 검색
const selectBoxSearch = () => {
    const startDisappearance = formatDateTime(startYearDisappearanceSelect.value, startMonthsDisappearanceSelect.value, startDayDisappearanceSelect.value, startHoursDisappearanceSelect.value, startMinutesDisappearanceSelect.value)
    const endDisappearance = formatDateTime(endtYearDisappearanceSelect.value, endtMonthsDisappearanceSelect.value, endtDayDisappearanceSelect.value, endtHoursDisappearanceSelect.value, endtMinutesDisappearanceSelect.value)
    const cityesSelectCctvSid = locations.value.cctvList.map((item) => item)
    const cityesSelectArr = cityesSelect.value.map((item) => item)
    const cityesSelectCctvSidFilter = cityesSelectCctvSid.filter((item) => cityesSelectArr.includes(item.city))
    const cityesSelectCctvSidResult = cityesSelectCctvSidFilter.map((item) => item.cctvSid).join(',')
    selectBoxSearchReturn(startDisappearance || null, endDisappearance || null, cityesSelectCctvSidResult || null, genderSelect.value || null, ageSelect.value || null, typeOfTopSelect.value || null, colorOfTopSelect.value || null, typeOfBottomSelect.value || null, colorOfBottomSelect.value || null, accSelect.value || null)
}

const selectBoxSearchReturn = async (st, en, ci, ge, ag, tyT, coT, tyB, coB, ac) => {
    let acArr;
    if (Array.isArray(ac)) {
        acArr = ac.map((item) => item.concat()).join(',')
    } else {
        acArr = ac;
    }
    try {
        const response = await FindLoitering.getDisapSearch(ge, ag, tyT, coT, tyB, coB, st, en, acArr, ci)
        console.log("response.data", response.data)
    } catch (e) {
        console.log('배회인원 찾기 실패', e)
    }
}



const loadSelectBoxDate = async () => {
    try {
        const response = await FindLoitering.getSelectBox()
        console.log(response.data)
        typeOfTopItems.value = response.data.upperTypes
        colorOfTopItems.value = response.data.upperColors
        typeOfBottomItems.value = response.data.lowerTypes
        colorOfBottomItems.value = response.data.lowerColors
        accItems.value = response.data.accessories
        ageItems.value = response.data.ageGroups
        genderItems.value = response.data.genders
    } catch (e) {
        console.log("셀렉트 박스 조회 실패", e)
    }
}


const years = computed(() => {
    const years = [];
    for (let i = startYear.value; i <= currentYear; i++) {
        years.push(i);
    }
    return years.reverse();
});

const model = ref(0)

const images = ref([
    {
        latitude: 36.5083073428532,
        longitude: 127.262445014563,
        address: "세종 절재로 194 중앙타운 202호",
        url: "/public/images/avatars/avatar-1.png",
    },
    {
        latitude: 36.4981148,
        longitude: 127.3132612,
        address: "세종 한누리대로 1820 205,206호",
        url: "/public/images/avatars/bird-9078403_1280.jpg",
    },
    {
        latitude: 36.3955991096515,
        longitude: 127.405768056295,
        address: "대전 유성구 문지로 323-21 1층",
        url: "/public/images/avatars/darling-7853389_640.jpg",
    },
    {
        latitude: 36.3346887701113,
        longitude: 127.450172736698,
        address: "대전 유성구 문지로 323-21 1층",
        url: "/public/images/avatars/japan-9074037_1280.jpg",
    },
    // {
    //     latitude: 37.4909472,
    //     longitude: 126.971493,
    //     url: "/public/images/avatars/mountains-7957191_1280.jpg",
    // },
    // {
    //     latitude: 37.4794939,
    //     longitude: 126.9931207,
    //     url: "/public/images/avatars/watzmann-9024268_1280.jpg",
    // },
    // {
    //     latitude: 37.4886232,
    //     longitude: 126.9668169,
    //     url: "/public/images/avatars/wave-9067749_1280.jpg",
    // },
    // {
    //     latitude: 37.4901004,
    //     longitude: 127.0063426,
    //     url: "/public/images/avatars/etretat-7391029_1280.jpg",
    // },
    // {
    //     latitude: 37.4846519,
    //     longitude: 126.981632,
    //     url: "/public/images/avatars/penguins-9028827_1280.jpg",
    // },
]);


// 초기 렌더링
const placeMarkers = async () => {
    try {
        // const bounds = new naver.maps.LatLngBounds();

        const response = await FindLoitering.getAllCctv();
        locations.value = response.data;
        cityesItems.value = response.data.cities;
        console.log("locations.value", locations.value)
        locations.value.cctvList.forEach(location => {
            const marker = new naver.maps.Marker({
                position: new naver.maps.LatLng(location.latitude, location.longitude),
                map: map.value,
                icon: {
                    url: './images/avatars/camera_de.png',
                    size: new naver.maps.Size(30, 30),
                }
            });

            // bounds.extend(new naver.maps.LatLng(location.latitude, location.longitude));

            const infowindow = new naver.maps.InfoWindow({
                content: `<div style="padding:10px;"><a href="https://map.naver.com/v5/search/${encodeURIComponent(location.address)}" style="color: rgb(0, 104, 195);">${location.address}</a></div>`,
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
                if (currentIcon === './images/avatars/camera_de.png') {
                    marker.setIcon({
                        url: './images/avatars/camera_active_color.png',
                        size: new naver.maps.Size(30, 30),
                    });
                } else {
                    marker.setIcon({
                        url: './images/avatars/camera_de.png',
                        size: new naver.maps.Size(30, 30),
                    });
                }
            });
        });

        // map.value.fitBounds(bounds);

    } catch (error) {
        console.log("카메라 위치 조회 실패", error);
    }
};


// 슬라이드 이미지 클릭
const slideImgHandleClick = (i, latitude, longitude, address) => {
    if (model.value !== i) {
        model.value = i;
    }

    // markers.value.forEach(marker => marker.setMap(null));
    // markers.value = [];

    const position = new naver.maps.LatLng(latitude, longitude);
    map.value.setCenter(position);
    map.value.setZoom(15);

    const marker = new naver.maps.Marker({
        position: position,
        map: map.value,
        icon: {
            url: './images/avatars/camera_de_big.png',
            size: new naver.maps.Size(40, 40)
        }
    });
    const infowindow = new naver.maps.InfoWindow({
        content: `<div style="padding:10px;"><a href="https://map.naver.com/v5/search/${encodeURIComponent(address)}" style="color: rgb(0, 104, 195);">${address}</a></div>`,
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
        if (currentIcon === './images/avatars/camera_de_big.png') {
            marker.setIcon({
                url: './images/avatars/camera_active_color_big.png',
                size: new naver.maps.Size(40, 40),
            });
        } else {
            marker.setIcon({
                url: './images/avatars/camera_de_big.png',
                size: new naver.maps.Size(40, 40),
            });
        }
    });

    // markers.value.fitBounds(bounds);
};


onMounted(async () => {
    map.value = new naver.maps.Map('map', placeMarkers());
    await placeMarkers()

    await loadSelectBoxDate()
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

                <div class="mb-4" v-if="addRadio === 'nomal'">
                    <VCol>
                        <div class="select-box-title">
                            <span>실종구간 (시작)</span>
                        </div>
                        <VRow>
                            <VCol class="px-1">
                                <v-select v-model="startYearDisappearanceSelect" :items="years" label="연도"></v-select>
                            </VCol>
                            <VCol class="px-1">
                                <v-select v-model="startMonthsDisappearanceSelect" :items="months" label="월"></v-select>
                            </VCol>
                            <VCol class="px-1">
                                <v-select v-model="startDayDisappearanceSelect" :items="day" label="일"></v-select>
                            </VCol>
                            <VCol class="px-1">
                                <v-select v-model="startHoursDisappearanceSelect" :items="hours" label="시간"></v-select>
                            </VCol>
                            <VCol class="px-1">
                                <v-select v-model="startMinutesDisappearanceSelect" :items="minutes"
                                    label="분"></v-select>
                            </VCol>
                        </VRow>
                        <div class="select-box-title">
                            <span>실종구간 (종료)</span>
                        </div>
                        <VRow>
                            <VCol class="px-1">
                                <v-select v-model="endtYearDisappearanceSelect" :items="years" label="연도"></v-select>
                            </VCol>
                            <VCol class="px-1">
                                <v-select v-model="endtMonthsDisappearanceSelect" :items="months" label="월"></v-select>
                            </VCol>
                            <VCol class="px-1">
                                <v-select v-model="endtDayDisappearanceSelect" :items="day" label="일"></v-select>
                            </VCol>
                            <VCol class="px-1">
                                <v-select v-model="endtHoursDisappearanceSelect" :items="hours" label="시간"></v-select>
                            </VCol>
                            <VCol class="px-1">
                                <v-select v-model="endtMinutesDisappearanceSelect" :items="minutes"
                                    label="분"></v-select>
                            </VCol>
                        </VRow>
                        <div class="select-box-title">
                            <span>기타 정보</span>
                        </div>
                        <VRow>
                            <VCol cols="3" class="pa-1">
                                <v-select v-model="cityesSelect" :items="cityesItems" label="지역선택" multiple
                                    persistent-hint></v-select>
                            </VCol>
                            <VCol cols="3" class="pa-1">
                                <v-select v-model="genderSelect" :items="genderItems" item-title="label"
                                    item-value="value" label="성별" persistent-hint></v-select>
                            </VCol>
                            <VCol cols="3" class="pa-1">
                                <v-select v-model="ageSelect" :items="ageItems" item-title="label" item-value="value"
                                    label="나이대" persistent-hint></v-select>
                            </VCol>
                            <VCol cols="3" class="pa-1">
                                <v-select v-model="typeOfTopSelect" :items="typeOfTopItems" item-title="label"
                                    item-value="value" label="상의 종류" persistent-hint></v-select>
                            </VCol>
                            <VCol cols="3" class="pa-1">
                                <v-select v-model="colorOfTopSelect" :items="colorOfTopItems" item-title="label"
                                    item-value="value" label="상의 색상"></v-select>
                            </VCol>
                            <VCol cols="3" class="pa-1">
                                <v-select v-model="typeOfBottomSelect" :items="typeOfBottomItems" item-title="label"
                                    item-value="value" label="하의 종류"></v-select>
                            </VCol>
                            <VCol cols="3" class="pa-1">
                                <v-select v-model="colorOfBottomSelect" :items="colorOfBottomItems" item-title="label"
                                    item-value="value" label="하의 색상"></v-select>
                            </VCol>
                            <VCol cols="3" class="pa-1">
                                <v-select v-model="accSelect" :items="accItems" label="악세사리" multiple item-title="label"
                                    item-value="value" persistent-hint></v-select>
                            </VCol>
                            <VCol cols="12" class="pa-1 text-right">
                                <VBtn class="search-user-info" @click="selectBoxSearch">
                                    검색</VBtn>
                            </VCol>
                        </VRow>
                    </VCol>
                </div>
                <VRow class="mb-4" v-if="addRadio === 'img'">
                    <VCol cols="6" class="pa-1">
                        <VFileInput label="이미지 파일 선택" prepend-icon="mdi-paperclip" />
                    </VCol>
                    <VCol cols="1" class="pa-1">
                        <VBtn class="search-user-info">검색</VBtn>
                    </VCol>
                </VRow>
            </div>

            <div class="px-6 d-flex gap-5">
                <div id="map" style="width: 100%; height: 700px"></div>
                <div class="click-main-img" v-if="model !== null">
                    <v-expand-transition>
                        <v-sheet>
                            <div class="d-flex fill-height align-center justify-center">
                                <img :src="images[model].url" alt="선택된 이미지" />
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
                        <v-card :class="['ma-4', 'anActive', selectedClass, { 'active-slide': model === index }]"
                            color="grey-lighten-1"
                            @click="slideImgHandleClick(index, image.latitude, image.longitude, image.address)"
                            height="200" width="200">
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

.select-box-title:first-child {
    margin-top: 0;
}

.select-box-title {
    margin: 25px 0 5px;
    font-size: 17px;
    transform: translateX(-5px);
}

.select-box-title:nth-child(5) {
    margin-bottom: 12px;
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
    width: 24.5%;
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