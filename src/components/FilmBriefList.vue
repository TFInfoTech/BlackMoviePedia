<template>
  <div>
    <FilmBriefSmall
      v-for="(item,index) in filmList"
      :key="index"
      :currentFilm="item"
      :index="index"
      :type="type"
    ></FilmBriefSmall>
  </div>
</template>

<script>
import FilmBriefListSwiper from "./FilmBriefListSwiper";
import FilmBriefSmall from "./FilmBriefSmall";
export default {
  name: "FilmBriefList",
  components: {
    FilmBriefListSwiper,
    FilmBriefSmall,
  },
  props: ["filmList", "type"],
  data() {
    return {};
  },
  created() {},
  mounted() {},
  methods: {},
};
</script>

<style>
</style>
