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
  props: ["searchItem", "itemType", "itemIndex"],
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
          name: this.searchItem.name
        };
        setTimeout(() => {
          // console.log("this.searchItem", this.searchItem);
          FilmData.GetFilmDetailOfPhoto(query).then(
            (data) => {
              if (data && data.length > 0) {
                // console.log("this.searchItem", this.searchItem);
                // console.log("data", data);
                this.displayItem.imageUrl = data[0].imgPath;
                this.displayItem.title = data[0].movieName;
                this.displayItem.linkUrl = "";
              }
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
