<template>
  <div>
    <!-- <el-row :gutter="10" style="padding-top:5px">
      <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
        <span class="block-label">{{template.label}}</span>
      </el-col>
    </el-row>-->
    <el-row :gutter="10">
      <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
        <el-table :data="blockData" :show-header="template.showHeader" style="width: 100%">
          <template v-for="col in template.columns">
            <el-table-column
              :key="col.column"
              :label="col.label"
              :prop="col.column"
              header-align="center"
            >
              <template slot-scope="scope">
                <div :style="col.style">{{ DataConvert (scope.row[col.column],col.dataConvertion) }}</div>
              </template>
            </el-table-column>
          </template>
        </el-table>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  name: "jtTable",
  props: ["blockData", "template", "index"], //template 对应模板中的display
  components: {},
  data() {
    return {
      emptyActorImage: require("../assets/img/EmptyHead.jpg"),
    };
  },
  created() {},
  mounted() {},
  watch: {
    // blockData: function () {
    //   console.log("blockData", this.blockData);
    // },
  },
  methods: {
    DataConvert(inputData, convert) {
      // console.log("inputData", inputData);
      if (convert) {
        if (convert[inputData]) {
          return convert[inputData];
        }
      }
      return inputData;
    },
  },
};
</script>

<style>
</style>
