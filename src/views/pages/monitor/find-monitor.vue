<script setup>
import { onMounted, onUpdated } from 'vue';
import FindLoitering from '@/api/FindLoitering';
import uniqBy from 'lodash/uniqBy'

const addRadio = ref("nomal")
const map = ref([])
const locations = ref([])
const controlPage = ref(0)
const selectedCctvSids = ref([]);
const markers = ref([]);
const selectedCctvSidsResult = ref('')

// 슬라이드
const images = ref([]);
const imagesTotal = ref()

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
const startDisappearanceSelect = ref()

// 실종구간 (종료)
const endDisappearanceSelect = ref()

const indexPage = ref(1)

const formatDateTime = (year) => {
    const formattedDate = `${String(year)}:00`
    return formattedDate
}

// 셀렉트 박스 검색
const selectBoxSearch = () => {
    model.value = 0;
    if (startDisappearanceSelect.value >= endDisappearanceSelect.value) {
        alert("종료구간이 시작구간보다 앞서있거나 같습니다 다시 선택하여 주세요")
    } else {
        const startDisappearance = formatDateTime(
            startDisappearanceSelect.value,
        )

        const endDisappearance = formatDateTime(
            endDisappearanceSelect.value,
        )

        selectBoxSearchReturn(
            startDisappearance,
            endDisappearance,
            selectedCctvSidsResult.value,
            genderSelect.value,
            ageSelect.value,
            typeOfTopSelect.value,
            colorOfTopSelect.value,
            typeOfBottomSelect.value,
            colorOfBottomSelect.value,
            accSelect.value,
        )
    }
}

const selectBoxSearchReturn = async (st, en, ci, ge, ag, tyT, coT, tyB, coB, ac) => {
    let acArr;
    if (Array.isArray(ac)) {
        acArr = ac.map((item) => item.concat()).join(',')
    } else {
        acArr = ac;
    }
    if (st === "undefined:00") {
        st = undefined
    }
    if (en === "undefined:00") {
        en = undefined
    }
    if (ci) {
        const ciArray = ci.split(',');
        const uniqueCiArray = [...new Set(ciArray)];
        ci = uniqueCiArray.join(',');
    }

    try {
        const response = await FindLoitering.getDisapSearch(ge, ag, tyT, coT, tyB, coB, st, en, acArr, ci, controlPage.value)
        images.value = response.data?.content;
        imagesTotal.value = response.data.totalPages;
    } catch (e) {
        console.log('배회인원 찾기 실패', e)
    }
}

const loadSelectBoxDate = async () => {
    try {
        const response = await FindLoitering.getSelectBox()
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

const model = ref(0)


// 초기 렌더링
const placeMarkers = async () => {
    try {
        const response = await FindLoitering.getAllCctv();
        locations.value = response.data;
        cityesItems.value = response.data.cities;        
        locations.value.cctvList.forEach(location => {
            const marker = new naver.maps.Marker({
                position: new naver.maps.LatLng(location.latitude, location.longitude),
                map: map.value,
                icon: {
                    url: './images/avatars/camera_de.png',
                    size: new naver.maps.Size(30, 30),
                }
            });

            markers.value.push({
                marker,
                city: location.city
            });

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

                    const { _lat, _lng } = marker.position;

                    const clickCctv = locations.value.cctvList.filter((item) => item.latitude && item.longitude.includes(_lat && _lng))
                    const selectCctvSid = clickCctv.find((item) => item.cctvSid)
                    selectedCctvSids.value.push(selectCctvSid)
                    selectedCctvSidsResult.value = selectedCctvSids.value.map(item => item.cctvSid).join(',')
                } else {
                    marker.setIcon({
                        url: './images/avatars/camera_de.png',
                        size: new naver.maps.Size(30, 30),
                    });

                    const { _lat, _lng } = marker.position;
                    const clickCctv = locations.value.cctvList.filter((item) => item.latitude && item.longitude.includes(_lat && _lng))
                    const deselectCctvSid = clickCctv.find((item) => item.cctvSid);
                    if (deselectCctvSid) {
                        selectedCctvSids.value = selectedCctvSids.value.filter(
                            (sid) => sid.cctvSid !== deselectCctvSid.cctvSid
                        );
                        selectedCctvSidsResult.value = selectedCctvSids.value.map(item => item.cctvSid).join(',')
                    }
                }
            });
        });

    } catch (error) {
        console.log("카메라 위치 조회 실패", error);
    }
};


// 슬라이드 이미지 클릭
const slideImgHandleClick = (i, latitude, longitude, address) => {
    if (model.value !== i) {
        model.value = i;
    }

    const position = new naver.maps.LatLng(latitude, longitude);
    map.value.setCenter(position);
    map.value.setZoom(15);

    const marker = new naver.maps.Marker({
        position: position,
        map: map.value,
        icon: {
            url: './images/avatars/camera_active_color.png',
            size: new naver.maps.Size(30, 30)
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
        if (currentIcon === './images/avatars/camera_active_color.png') {
            marker.setIcon({
                url: './images/avatars/camera_de.png',
                size: new naver.maps.Size(30, 30),
            });

            const { _lat, _lng } = marker.position;
            const clickCctv = locations.value.cctvList.filter((item) => item.latitude && item.longitude.includes(_lat && _lng))
            const deselectCctvSid = clickCctv.find((item) => item.cctvSid);
            if (deselectCctvSid) {
                selectedCctvSids.value = selectedCctvSids.value.filter(
                    (sid) => sid.cctvSid !== deselectCctvSid.cctvSid
                );
                selectedCctvSidsResult.value = selectedCctvSids.value.map(item => item.cctvSid).join(',')
            }
        } else {
            marker.setIcon({
                url: './images/avatars/camera_active_color.png',
                size: new naver.maps.Size(30, 30),
            });
            const { _lat, _lng } = marker.position;

            const clickCctv = locations.value.cctvList.filter((item) => item.latitude && item.longitude.includes(_lat && _lng))
            const selectCctvSid = clickCctv.find((item) => item.cctvSid)
            selectedCctvSids.value.push(selectCctvSid)
            selectedCctvSidsResult.value = selectedCctvSids.value.map(item => item.cctvSid).join(',')
        }
    });
};

watch(cityesSelect, (newVal) => {
    updateMarkersBasedOnCitySelection(newVal);
});

const updateMarkersBasedOnCitySelection = (selectedCities) => {
    let firstSelectedMarkerPosition = null;

    selectedCctvSids.value = selectedCctvSids.value.filter((cctv) =>
        selectedCities.includes(cctv.city)
    );


    markers.value.forEach((markerObj) => {
        if (selectedCities.includes(markerObj.city)) {
            markerObj.marker.setIcon({
                url: './images/avatars/camera_active_color.png',
                size: new naver.maps.Size(30, 30),
            });

            if (!firstSelectedMarkerPosition) {
                firstSelectedMarkerPosition = markerObj.marker.getPosition();
            }

            const { _lat, _lng } = markerObj.marker.position;

            const clickCctv = locations.value.cctvList.filter((item) => item.latitude && item.longitude.includes(_lat && _lng))
            const selectCctvSid = clickCctv.find((item) => item.cctvSid)
            selectedCctvSids.value.push(selectCctvSid)
            const uniqueCctvArray = selectedCctvSids.value.filter((obj, index, self) =>
                index === self.findIndex((o) => o.cctvSid === obj.cctvSid)
            );
            const selectedCctvSidsResultBefore = uniqueCctvArray.map(item => item.cctvSid).join(',')
            selectedCctvSidsResult.value = selectedCctvSidsResultBefore
        } else {
            markerObj.marker.setIcon({
                url: './images/avatars/camera_de.png',
                size: new naver.maps.Size(30, 30),
            });
        }
    });
    if (firstSelectedMarkerPosition) {
        map.value.setCenter(firstSelectedMarkerPosition);
        map.value.setZoom(10);
    }
};

const indexPageLoadAllUser = async (page) => {
    model.value = 0;
    indexPage.value = page;
    controlPage.value = page - 1;
    if (startDisappearanceSelect.value >= endDisappearanceSelect.value) {
        alert("종료구간이 시작구간보다 앞서있거나 같습니다 다시 선택하여 주세요")
    } else {
        const startDisappearance = formatDateTime(
            startDisappearanceSelect.value,
        )

        const endDisappearance = formatDateTime(
            endDisappearanceSelect.value,
        )

        selectBoxSearchReturn(
            startDisappearance,
            endDisappearance,
            selectedCctvSidsResult.value,
            genderSelect.value,
            ageSelect.value,
            typeOfTopSelect.value,
            colorOfTopSelect.value,
            typeOfBottomSelect.value,
            colorOfBottomSelect.value,
            accSelect.value,
        )
    }
}

onMounted(async () => {
    map.value = new naver.maps.Map('map', placeMarkers());
    await placeMarkers()

    await loadSelectBoxDate()
    genderSelect.value = genderItems.value[genderItems.value.length - 1]?.value;
    ageSelect.value = genderItems.value[genderItems.value.length - 1]?.value;
    typeOfTopSelect.value = genderItems.value[genderItems.value.length - 1]?.value;
    colorOfTopSelect.value = genderItems.value[genderItems.value.length - 1]?.value;
    typeOfBottomSelect.value = genderItems.value[genderItems.value.length - 1]?.value;
    colorOfBottomSelect.value = genderItems.value[genderItems.value.length - 1]?.value;
    accSelect.value = genderItems.value[genderItems.value.length - 1]?.value;
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
                            <span>실종 탐색 구간 (시작)</span>
                        </div>
                        <VRow>
                            <VCol class="px-1">
                                <VTextField type="datetime-local" v-model="startDisappearanceSelect" />
                            </VCol>
                        </VRow>
                        <div class="select-box-title">
                            <span>실종 탐색 구간 (종료)</span>
                        </div>
                        <VRow>
                            <VCol class="px-1">
                                <VTextField type="datetime-local" v-model="endDisappearanceSelect" />
                            </VCol>
                        </VRow>
                        <div class="select-box-title">
                            <span>기타 정보</span>
                        </div>
                        <VRow>
                            <VCol cols="3">
                                <v-select v-model="cityesSelect" :items="cityesItems" label="지역선택" multiple
                                    persistent-hint></v-select>
                            </VCol>
                            <VCol cols="3">
                                <v-select v-model="genderSelect" :items="genderItems" item-title="label"
                                    item-value="value" label="성별" persistent-hint></v-select>
                            </VCol>
                            <VCol cols="3">
                                <v-select v-model="ageSelect" :items="ageItems" item-title="label" item-value="value"
                                    label="나이대" persistent-hint></v-select>
                            </VCol>
                            <VCol cols="3">
                                <v-select v-model="typeOfTopSelect" :items="typeOfTopItems" item-title="label"
                                    item-value="value" label="상의 종류" persistent-hint></v-select>
                            </VCol>
                            <VCol cols="3">
                                <v-select v-model="colorOfTopSelect" :items="colorOfTopItems" item-title="label"
                                    item-value="value" label="상의 색상"></v-select>
                            </VCol>
                            <VCol cols="3">
                                <v-select v-model="typeOfBottomSelect" :items="typeOfBottomItems" item-title="label"
                                    item-value="value" label="하의 종류"></v-select>
                            </VCol>
                            <VCol cols="3">
                                <v-select v-model="colorOfBottomSelect" :items="colorOfBottomItems" item-title="label"
                                    item-value="value" label="하의 색상"></v-select>
                            </VCol>
                            <VCol cols="3">
                                <v-select v-model="accSelect" :items="accItems" label="악세사리" multiple item-title="label"
                                    item-value="value" persistent-hint></v-select>
                            </VCol>
                            <VCol cols="12" class="py-0 text-right">
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
                <div class="click-main-img" :class="{ 'slideVisible': images[model] && images.length > 0 }">
                    <v-expand-transition>
                        <v-sheet v-if="images[model] && images.length > 0">
                            <div class="d-flex fill-height align-center justify-center">
                                <img :src="`http://localhost:8082/uploads/${images[model]?.fileName}`" alt="선택된 이미지" />
                            </div>
                            <div class="mt-2">
                                <span>위치 : {{ images[model].address }}</span><br />
                                <span>카메라명 : {{ images[model].cctvName }}</span><br />
                                <span>시간 : {{ images[model].createDate }}</span>
                            </div>
                        </v-sheet>
                    </v-expand-transition>
                </div>
            </div>
            <v-sheet class="mx-auto" elevation="8">
                <v-slide-group v-if="images.length !== 0" v-model="model" class="pa-4" selected-class="bg-primary"
                    show-arrows>
                    <v-slide-group-item v-for="(image, index) in images" :key="index"
                        v-slot="{ isSelected, toggle, selectedClass }">
                        <v-card :class="['ma-4', 'anActive', selectedClass, { 'active-slide': model === index }]"
                            color="grey-lighten-1"
                            @click="slideImgHandleClick(index, image.latitude, image.longitude, image.address)"
                            height="200" width="200">
                            <div class="d-flex fill-height align-center justify-center">
                                <img :src="`http://localhost:8082/uploads/${image?.fileName}`" alt="슬라이드 이미지"
                                    style="width: 100%; height: 100%;">
                            </div>
                        </v-card>
                    </v-slide-group-item>
                </v-slide-group>
                <v-slide-group v-else class="py-4"></v-slide-group>
                <div class="d-flex justify-center w-100 pb-3">
                    <nav>
                        <ul class="d-flex">
                            <li class="border mx-1 text-center li" v-for="page in imagesTotal" :key="page"
                                :class="{ active: indexPage === page }">
                                <span @click.prevent="indexPageLoadAllUser(page)" style="display: block;">{{ page
                                    }}</span>
                            </li>
                        </ul>
                    </nav>
                </div>
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
    width: 23%;
}

.mdi-paperclip {
    display: none;
}

#map {
    flex: 1;
}

/* #map.slideVisibleMap {
    flex: 3;
} */

.click-main-img.slideVisible {
    width: 400px;
}

.click-main-img img {
    width: 100%;
    height: 630px;
}

.anActive {
    opacity: .5;
}

.active-slide {
    opacity: 1;
}

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