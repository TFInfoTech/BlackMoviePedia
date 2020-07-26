<template>
  <swiper-slide>
    <img
      :src="filmPhotoDetail.url"
      class="slide-image"
      :data-uri="filmPhotoDetail.filmuri"
      :data-name="filmPhotoDetail.filmName"
    />
  </swiper-slide>
</template>

<script>
import FilmData from "@/data/film";
export default {
  name: "SwiperItem",
  props: ["filmitem"],
  components: {},
  data() {
    return {
      filmPhotoDetail: { url: "", filmuri: "", filmName: "" },
    };
  },
  created() {
    // FilmData.GetFilmDetailOfPhoto(this.filmitem);
    // console.log ('created slide item',this.filmitem);
    FilmData.GetFilmDetailOfPhoto(this.filmitem).then(
      (data) => {
        this.filmPhotoDetail = Object.assign(this.filmPhotoDetail, data);
        // console.log("this.filmPhotoDetail", this.filmPhotoDetail);
      },
      (err) => {}
    );
  },
  mounted() {},
  watch: {},
  methods: {},
};
</script>

<style>
</style>
