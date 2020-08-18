<template>
  <div>
    <swiper ref="mySwiper" :options="swiperOptions">
      <SwiperItem v-for="(item,index) in filmList" :key="index" :filmitem="item" :itemIndex="index"></SwiperItem>
      <div class="swiper-button-prev" slot="button-prev"></div>
      <div class="swiper-button-next" slot="button-next"></div>
    </swiper>
  </div>
</template>

<script>
import SwiperItem from "./SwiperItem";
export default {
  name: "FilmBriefListSwiper",
    props: ["filmList"],
  components: {
    SwiperItem,
  },
  data() {
    return {
    //   filmPhotoDetail: { url: this.emptyUrl },
    //   emptyUrl: require("../assets/img/MovieBackground.jpg"),

    //   filmList: [
    //     {
    //       date: "1935",
    //       name: "风云儿女",
    //       uri: "http://data.library.sh.cn/dy/resource/movie/futcughzte0332ie",
    //     },
    //   ],
      swiperOptions: {
        effect: "cube",
        grabCursor: true,
        observer: true, //修改swiper自己或子元素时，自动初始化swiper
        observeParents: true, //修改swiper的父元素时，自动初始化swiper
        cubeEffect: {
          shadow: true,
          slideShadows: true,
          shadowOffset: 20,
          shadowScale: 0.94,
        },
        pagination: {
          el: ".swiper-pagination",
        },
        navigation: {
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev",
        },
        autoplay: {
          delay: 5000,
          stopOnLastSlide: false,
          disableOnInteraction: true,
        },
      },
    };
  },
  computed: {
    swiper() {
      return this.$refs.mySwiper.$swiper;
    },
  },
  watch: {
    // filmList() {
    //   console.log("update filmList", this.filmList);
    // },
  },
  created() {
    // console.log("created filmList", this.filmList);
  },
  mounted() {},
  methods: {},
};
</script>

<style scoped>

.swiper-container {
  width: 320px;
  height: 500px;
  text-align: center;
}
</style>
