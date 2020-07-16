import Vue from "vue";
// import "vant/lib/index.css";
import App from "./App.vue";
import router from "./router/index";
// import "@/assets/style/font/iconfont.css";
import "@/assets/style/index.less";
import $axios from "@/utils/request";
import mixin from "./mixin/index";
import store from "./store/index";
import VueAwesomeSwiper from 'vue-awesome-swiper'
import 'element-ui/lib/theme-chalk/index.css';
import ElementUi from 'element-ui';
import "@/components/Vant";
// rem
import "amfe-flexible";
// 把变量挂载到vue的原型上
import Video from 'video.js'
import VideoPlayer from 'vue-video-player'
import common from './common/common'




// import style
import 'swiper/css/swiper.css'
import '@/assets/style/common.css'
import 'video.js/dist/video-js.css'
require('video.js/dist/video-js.css')
require('vue-video-player/src/custom-theme.css')

//const hls = require("videojs-contrib-hls")
import hls from 'videojs-contrib-hls'

Vue.use(VideoPlayer)
Vue.use(hls)
Vue.use(VueAwesomeSwiper)

Vue.use(ElementUi);
Vue.prototype.$axios = $axios;

Vue.prototype.$video = Video;
Vue.mixin(mixin);

Vue.config.productionTip = false;

Vue.prototype.$common = common 
new Vue({
  store,
  router,
  render: h => h(App)
}).$mount("#app");
