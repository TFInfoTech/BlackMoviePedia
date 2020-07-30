<template>
  <swiper-slide>
    <img
      :src="filmPhotoDetail.imgPath"
      class="slide-image"
      :data-uri="filmPhotoDetail.uri"
      :data-name="filmPhotoDetail.name"
    />
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
    // console.log ('created slide item',this.filmitem);
    setTimeout(() => {
      FilmData.GetFilmDetailOfPhoto(this.filmitem).then(
        (data) => {
          if (data && data.length > 0) {
            this.filmPhotoDetail = Object.assign(this.filmPhotoDetail, data[0]);
          }
          // console.log("this.filmPhotoDetail", this.filmPhotoDetail);
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

<style>
</style>
