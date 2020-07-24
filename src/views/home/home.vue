<template>
  <el-container>
    <el-header>
      <el-row :gutter="10" type="flex" align="middle">
        <el-col :xs="20" :sm="20" :md="20" :lg="20" :xl="20">
          <div class="grid-content" style="height:80px">
            <span
              style="line-height:80px;font-family:PingFangSC; font-weight:700; font-size:30px; color:rgb(16, 16, 16); font-style:normal; letter-spacing:0px;"
              data-boldtype="0"
            >今天怀旧点啥</span>
          </div>
        </el-col>
        <el-col :xs="4" :sm="4" :md="4" :lg="4" :xl="4">
          <div class="grid-content" style="height:80px">
            <span
              style="line-height:100px;width: 24px; height: 24px; min-height: 24px; min-width: 24px;"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="svg-icon"
                style="fill: #101010;"
                viewBox="0 0 32 32"
                width="24"
                height="24"
              >
                <path
                  d="M 30.428 28.814 l -7.377 -7.377 c 1.614 -2.073 2.766 -4.611 2.766 -7.606 c 0 -6.681 -5.301 -11.983 -11.986 -11.983 c -6.681 0 -11.983 5.301 -11.983 11.987 c 0 6.685 5.301 11.987 11.987 11.987 c 2.997 0 5.533 -1.155 7.608 -2.769 l 7.374 7.374 l 1.614 -1.614 Z M 4.146 13.83 c 0 -5.301 4.38 -9.681 9.683 -9.681 c 5.301 0 9.679 4.38 9.679 9.683 c 0 2.303 -0.924 4.608 -2.307 6.222 l -1.155 1.152 c -1.614 1.383 -3.919 2.305 -6.223 2.305 c -5.301 0 -9.681 -4.383 -9.681 -9.683 Z"
                />
              </svg>
            </span>
          </div>
        </el-col>
      </el-row>        
    </el-header>
    <el-main>
      <el-row :gutter="10" >
        <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
          <div class="grid-content" style="height:500px">
            <el-tabs v-model="activeName" @tab-click="handleClick">
              <el-tab-pane label="随便" name="1">
                  <FilmBrief></FilmBrief>
              </el-tab-pane>
              <el-tab-pane label="推荐" name="2">推荐</el-tab-pane>
              <el-tab-pane label="影星" name="3">影星</el-tab-pane>
              <el-tab-pane label="电影" name="4">电影</el-tab-pane>
            </el-tabs>
          </div>
        </el-col>
      </el-row>
    </el-main>
    <el-footer>
      <Footer></Footer>
    </el-footer>
  </el-container>
</template>

<script>
import Footer from "@/components/Footer";
import FilmBrief from "@/components/FilmBrief";

export default {
  components: {
    Footer,FilmBrief
  },
  data() {
    return {
      activeName: "1"
    };
  },
  methods: {
    handleClick(tab, event) {
      console.log(tab, event);
    }
  }
};
</script>

<style>
body > .el-container {
  padding-top: 20px;
  padding-left: 20px;
  padding-right: 20px;
}
.el-row {
  margin-bottom: 10px;
  &:last-child {
    margin-bottom: 0;
  }
}
.el-col {
  border-radius: 4px;
}
.bg-purple-dark {
  background: #99a9bf;
}
.bg-purple {
  background: #d3dce6;
}
.bg-purple-light {
  background: #e5e9f2;
}
.grid-content {
  border-radius: 4px;
  min-height: 36px;
}
</style>