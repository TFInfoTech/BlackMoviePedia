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

import "@/components/Vant";
// rem
import "amfe-flexible";
// 把变量挂载到vue的原型上

// import style
import 'swiper/css/swiper.css'

Vue.use(VueAwesomeSwiper)

Vue.prototype.$axios = $axios;

Vue.mixin(mixin);

Vue.config.productionTip = false;

new Vue({
  store,
  router,
  render: h => h(App)
}).$mount("#app");