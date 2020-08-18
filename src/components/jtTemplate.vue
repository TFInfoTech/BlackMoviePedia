<template>
  <div>
    <div v-if="jtData">
      <el-collapse v-model="activeName" accordion>
        <el-collapse-item
          v-for="(block,index) in displayTemplate"
          :key="index"
          :name="index"
          :disabled="block.display.type==='label'"
        >
          <template slot="title">
            <span class="block-label">{{block.display.label}}</span>
            <span v-if="block.display.type==='label'">{{jtData[index]}}</span>
          </template>
          <div v-if="block.display.type==='table'">
            <jtTable
              :blockData="jtData[index]"
              :template="block.display"
              :index="index"
              v-if="jtData.nameinfo"
            ></jtTable>
          </div>
          <div v-if="block.display.type==='imageSlide'">
            <swiper ref="mySwiper" :options="swiperOption">
              <swiper-slide v-for="(item,index) in jtData[index]" :key="index">
                <img :src="item[block.display.imageColumn]" class="jt-slide-image" />
              </swiper-slide>
            </swiper>
          </div>
        </el-collapse-item>
      </el-collapse>
    </div>
    <el-backtop></el-backtop>
  </div>
</template>

<script>
import jtTable from "@/components/jtTable";
import jsonTransform from "@/utils/jsonTransform";
export default {
  name: "jtTemplate",
  props: ["pData", "pTemplate"], //template 对应模板中的display
  components: { jtTable },
  data() {
    return {
      jtData: {},
      activeName: "",
      swiperOption: {
        slidesPerView: 3,
        spaceBetween: 5,
        observer: true, //修改swiper自己或子元素时，自动初始化swiper
        observeParents: true, //修改swiper的父元素时，自动初始化swiper
        centeredSlides: false,
        pagination: {
          el: ".swiper-pagination",
          clickable: true,
        },
      },
    };
  },
  created() {
    // console.log("pData", this.pData);
    // console.log("pTmplate", this.pTmplate);
    // this.jtData = jsonTransform.jsonTransform(this.pData, this.pTmplate);
    // console.log("this.jtData", this.jtData);
  },
  mounted() {},
  computed: {
    displayTemplate() {
      var newTemplate = {};
      for (var node in this.pTemplate) {
        if (this.pTemplate[node].display) {
          newTemplate[node] = this.pTemplate[node];
          if (this.activeName === "") {
            this.activeName = node;
          }
        }
      }
      // console.log("newTemplate", newTemplate);
      return newTemplate;
    },
  },
  watch: {
    pData: function () {
      setTimeout(() => {
        console.log("pTemplate", this.pTemplate);
        // console.log("pData", this.pData);
        this.jtData = jsonTransform.jsonTransform(this.pData, this.pTemplate);
        console.log("this.jtData", this.jtData);
      }, 500);
    },
    // pTmplate: function () {
    //   console.log("pTmplate", this.pTmplate);
    //   console.log("pData", this.pData);
    //   this.jtData = jsonTransform.jsonTransform(this.pData, this.pTemplate);
    // },
  },
  methods: {},
};
</script>

<style>
.bg-block {
  position: relative;
  padding: 2px;
  background: #eaedf0;
}
.block-label {
  margin: 5px;
  font-weight: 600;
}
.el-collapse-item__header {
  background: #eaedf0 !important;
}
.el-collapse-item {
  border-top: 1px solid rgb(87, 86, 86) !important;
}
.block-label {
  color: black !important;
}
.el-collapse-item__content {
  padding-top: 3px !important;
  padding-bottom: 3px !important;
}
.jt-slide-image {
  width: 90%;
  height: 100%;
  object-fit: contain;
}
</style>
