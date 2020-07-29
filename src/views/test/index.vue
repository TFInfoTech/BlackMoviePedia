
<template>
  <div>
    <div></div>
    <Footer page="demo"></Footer>
  </div>
</template>

<script>
import * as mservice from "@/api/movie";
export default {
  created() {
    for (let i = 0; i < this.filmList.length; i++) {
      //   clearTimeout(this.timer);
      //   setTimeout(() => {
      //     mservice.fetchPhotoByName(this.filmList[i]).then((response) => {
      //       if (response.result == "0") {
      //         let photos = response.data;
      //         // console.log("fetchPhotoByName", response);
      //         console.log(
      //           "photos",
      //           this.filmList[i].freetext,
      //           photos.uri,
      //           response
      //         );
      //       }
      //     });
      //   }, 5000);
      //   setTimeout(() => {
      //     console.log("fetchPhotoByName", i);
      //   }, 2000);
      (function (e) {
        setTimeout(function () {
          console.log("fetchPhotoByName", i);
        }, 2000 * i);
      })(i);
    }
  },
  data() {
    return {
      //   timer: null,
      filmList: [
        {
          freetext: "新女性",
        },
        {
          freetext: "大路",
        },
        {
          freetext: "风云儿女",
        },
        {
          freetext: "人生",
        },
        {
          freetext: "桃李劫",
        },
        {
          freetext: "孤岛春秋",
        },
        {
          freetext: "红羊豪侠传",
        },
        {
          freetext: "天伦",
        },
        {
          freetext: "野草闲花",
        },
        {
          freetext: "渔光曲",
        },
      ],
      searched: false,
    };
  },
  methods: {},
};
</script>

<style lang="less" scoped>
div {
  height: 100px;
  width: 100px;
  background: green;
}
.van-loading {
  display: inline-block;
  margin: 5px 0 5px 20px;
  background: gray;
}
</style>