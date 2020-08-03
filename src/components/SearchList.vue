<template>
  <div>
    <div class="waterfall px-container clearfix" v-cloak>
      <ul class="px-waterfall left" v-for="(el,i) in newWaterfallData" :key="i">
        <li v-for="(item,index) in el" :key="index">
            <SearchListItem :searchItem="item" :itemType="itemType" :itemIndex="i*2+index"></SearchListItem>
          <!-- <div style="position: relative">
            <router-link to="/goodsdetail/1">
              <img :src="emptyUrl" class="card-image" alt v-loading="true" />
            </router-link>
            <h3 class="color-fff fh" v-if="item.e_intro">{{item.e_intro}}</h3>
          </div>-->
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
import SearchListItem from "@/components/SearchListItem";
export default {
  components: {
    SearchListItem
  },
  data() {
    return {
      newWaterfallData: "",
      waterfallDataNumber: "",
      emptyUrl: require("../assets/img/MovieBackground.jpg"),
    };
  },
  created() {
    // console.log("waterfallData", this.waterfallData);
    // let [...waterfallData] = this.waterfallData;
    // let [...newWaterfallData] = [[], []];
    // waterfallData.forEach((el, i) => {
    //   switch (i % 2) {
    //     case 0:
    //       newWaterfallData[0].push(el);
    //       break;
    //     case 1:
    //       newWaterfallData[1].push(el);
    //       break;
    //   }
    // });
    // this.newWaterfallData = newWaterfallData;
    // console.log("newWaterfallData", this.newWaterfallData);
  },
  watch: {
    waterfallData() {
      let that = this;
      if (this.waterfallData) {
        // console.log("this.waterfallData", this.waterfallData);
        let [...waterfallData] = that.waterfallData;
        // console.log("waterfallData", waterfallData1.length);
        if (waterfallData.length > 0) {
          let [...newWaterfallData] = [[], []];
          //   console.log("waterfallData", waterfallData1);
          waterfallData.forEach((el, i) => {
            switch (i % 2) {
              case 0:
                newWaterfallData[0].push(el);
                break;
              case 1:
                newWaterfallData[1].push(el);
                break;
            }
          });
          this.newWaterfallData = newWaterfallData;
          // console.log("this.newWaterfallData", this.newWaterfallData);
        }
      }
    },
  },
  props: ["waterfallData","itemType"],
};
</script>
<style lang="scss">
.px-container {
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
}
.clearfix:before,
.clearfix:after {
  content: "";
  display: block;
  clear: both;
}
.clearfix {
  zoom: 1;
}
.left {
  float: left;
}
.color-fff {
  color: #fff;
}
.fh {
//   overflow: hidden;
}
[v-cloak] {
  display: none !important;
}
.waterfall {

}
.px-waterfall {
  width: 50%;

  //   &:nth-child(2n + 2) {
  //     margin: 0 30px;
  //   }
  &:img.bg-img {
    border-radius: 8px;
  }
  h3 {
    text-overflow: ellipsis;
    white-space: nowrap;
    text-overflow: ellipsis;
    height: 30px;
    font-family: PingFangSC-Semibold;
    font-weight: 600;
    line-height: 30px;
    letter-spacing: 6px;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 999;
  }
  li {
    background: #fff;
    border-radius: 8px;
    margin-bottom: 20px;
  }
}

.px-hot-tag {
  position: absolute;
  top: 0;
  border-radius: 8px;
  width: 71px;
  height: 30px;
  img {
    border-radius: 8px 0 8px 0;
  }
}
.photo {
  position: relative;
  height: 25px;
  .keywordbox {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    height: 25px;
  }
}
.keyword {
  height: 25px;
  line-height: 25px;
  padding: 0 22px;
  text-align: center;
  .color-666-line {
    border-bottom: 2px solid #666666;
  }
  .red-line {
    border-bottom: 2px solid #f65050;
  }
}
</style>
