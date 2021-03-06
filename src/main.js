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
import Utils from './utils/common.js';
Vue.prototype.utils = Utils;

// rem
import "amfe-flexible";
// 把变量挂载到vue的原型上
import Video from 'video.js'
import VideoPlayer from 'vue-video-player'

// import style
import '@/assets/style/site_style.css'
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
// Vue.prototype.$axios = $axios;

Vue.prototype.$video = Video;
Vue.mixin(mixin);

Vue.config.productionTip = false;

new Vue({
  store,
  router,
  render: h => h(App),
  // components:{
  //   Video  //在 index.html页面不使用这个组件，就会返回 We're sorry but demo3 doesn't work properly without JavaScript enabled. Please enable it to continue.
  //  }
}).$mount("#app");
