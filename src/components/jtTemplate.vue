<template>
  <div>
    <div v-if="jtData">
      <div v-for="(block,index) in pTemplate" :key="index">
        <div v-if="block.display">
          <jtTable :blockData="jtData[index]" :template="block.display" v-if="jtData.nameinfo"></jtTable>
        </div>
      </div>
    </div>
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
    };
  },
  created() {
    // console.log("pData", this.pData);
    // console.log("pTmplate", this.pTmplate);
    // this.jtData = jsonTransform.jsonTransform(this.pData, this.pTmplate);
    // console.log("this.jtData", this.jtData);
  },
  mounted() {},
  watch: {
    pData: function () {
      setTimeout(() => {
        // console.log("pTemplate", this.pTemplate);
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
</style>
