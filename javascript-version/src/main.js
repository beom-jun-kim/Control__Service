import { createApp } from "vue";
import App from "@/App.vue";
import { registerPlugins } from "@core/utils/plugins";

// Styles
import "@core/scss/template/index.scss";
import "@layouts/styles/index.scss";
import "@styles/styles.scss";

// Create vue app
const app = createApp(App);

// Register plugins
registerPlugins(app);

// 네이버 맵 스크립트 동적으로 추가
const naverMapScript = document.createElement("script");
naverMapScript.type = "text/javascript";
naverMapScript.src = `https://oapi.map.naver.com/openapi/v3/maps.js?ncpClientId=${
  import.meta.env.VITE_APP_API_CLIENT_ID
}&submodules=geocoder`;
document.head.appendChild(naverMapScript);

// Mount vue app
app.mount("#app");
