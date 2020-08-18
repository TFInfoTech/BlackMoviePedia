<template>
  <swiper-slide v-if="filmitem">
    <router-link :to="{ name:'movie',params:{'name':filmitem.name,'uri':filmitem.uri} }">
      <img
        :src="filmPhotoDetail.imgPath"
        class="slide-image"
      />
    </router-link>
  </swiper-slide>
</template>

<script>
import FilmData from "@/data/film";
export default {
  name: "SwiperItem",
  props: ["filmitem", "itemIndex"],
  components: {},
  data() {
    return {
      filmPhotoDetail: { imgPath: "", filmuri: "", filmName: "" },
    };
  },
  created() {
    // FilmData.GetFilmDetailOfPhoto(this.filmitem);
    console.log ('created slide item',this.filmitem);
    setTimeout(() => {
      FilmData.GetFilmDetailOfPhoto(this.filmitem).then(
        (data) => {
          if (data && data.length > 0) {
            this.filmPhotoDetail = Object.assign(this.filmPhotoDetail, data[0]);
          }
          console.log("this.filmPhotoDetail", this.filmPhotoDetail);
        },
        (err) => {}
      );
    }, 500 * this.itemIndex);
  },
  mounted() {},
  watch: {},
  methods: {},
};
</script>

<style scoped>
.swiper-slide {
  background-position: center;
  background-size: cover;
  background-image: url("../assets/img/MovieBackground.jpg") !important;
  border-radius: 10px;
}
.slide-image {
  width: 90%;
  height: 100%;
  object-fit: contain;
}
</style>
