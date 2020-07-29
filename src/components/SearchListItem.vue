<template>
  <div style="position: relative; padding:1px">
    <router-link :to="displayItem.linkUrl">
      <img :src="displayItem.imageUrl" class="card-image" alt />
    </router-link>
    <h3 class="color-fff fh" v-if="displayItem.title">{{displayItem.title}}</h3>
  </div>
</template>

<script>
import FilmData from "@/data/film";
export default {
  name: "SearchItem",
  props: ["searchItem", "itemType","itemIndex"],
  components: {},
  data() {
    return {
      displayItem: { imageUrl: "", title: "", linkUrl: "" },
    };
  },
  created() {
    // console.log("created");

    switch (this.itemType) {
      case "film":
        var query = {
          name: this.searchItem.filmname,
          uri: this.searchItem.filmname,
        };
        setTimeout(() => {
          FilmData.GetFilmDetailOfPhoto(this.searchItem).then(
            (data) => {
                console.log("this.searchItem", this.searchItem);
                console.log("data", data.filmName,data.filmuri,data.url);
              this.displayItem.imageUrl = data.url;
              this.displayItem.title = data.filmName;
              this.displayItem.linkUrl = "";
              // console.log("this.displayItem", this.displayItem);
            },
            (err) => {}
          );
        }, 500 * this.itemIndex);
        break;
    }
  },
  mounted() {},
  watch: {},
  methods: {},
};
</script>

<style>
.card-image {
  width: 100%;
  height: 100%;
  object-fit: contain;
}
</style>
