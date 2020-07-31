<template>
  <div>
    <div v-if="videoitem.videouri!=undefined && videoitem.videouri!=''">
      <!--<el-button @click="clickbutton">圆角按钮</el-button>-->
      <el-row :gutter="10">
        <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
          <div class="grid-movie-card bg-purple-movie-card">
            <el-row :gutter="10">
              <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
                <div class="grid-content" style="text-align:center;padding:5px">
                  <video
                    :id="'myVideo'+index"
                    data-setup="{}"
                    class="video-js"
                    name="videoname"
                  >
                    <source :src="videoitem.videouri" type="application/x-mpegURL" />
                  </video>
                </div>
              </el-col>
            </el-row>
            <el-row :gutter="10" v-if="type===2">
              <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
                <div class="grid-content">
                  <span
                    class="--mb--rich-text"
                    style="margin-left:5px;font-family:PingFangSC; font-weight:700; font-size:24px; color:rgba(123, 123, 123, 1); font-style:normal; letter-spacing:0px; line-height:33px; text-decoration:none;"
                    data-boldtype="0"
                  >{{currentFilm.name}}&nbsp;{{currentFilm.date}}</span>
                </div>
              </el-col>
            </el-row>
            <el-row :gutter="10" v-if="type===2">
              <el-col :xs="4" :sm="4" :md="4" :lg="4" :xl="4">
                <div class="grid-content">
                  <span
                    class="--mb--rich-text"
                    style="margin-left:5px;font-family:PingFangSC; font-weight:500; font-size:16px; color:rgba(123, 123, 123, 1); font-style:normal; letter-spacing:0px; line-height:23px; text-decoration:none;"
                    data-boldtype="0"
                  >剧组:</span>
                </div>
              </el-col>
              <el-col :xs="20" :sm="20" :md="20" :lg="20" :xl="20">
                <div class="grid-content">
                  <span
                    style="font-family:PingFangSC; font-weight:500; font-size:16px; color:rgba(123, 123, 123, 1); font-style:normal; letter-spacing:0px; line-height:23px; text-decoration:none;"
                    data-boldtype="0"
                  >{{videoitem.contributorStr }}</span>
                </div>
              </el-col>
            </el-row>
          </div>
        </el-col>
      </el-row>
    </div>
    <div v-if="type===1&&(videoitem.videouri===undefined || videoitem.videouri==='')">暂时还没有收集到影像资料</div>
  </div>
</template>

<script>
import FilmData from "@/data/film";
export default {
  name: "FilmBriefSmall",
  props: ["currentFilm", "index", "type"],
  data() {
    return {
      videoitem: { videouri: "" },
      //a: {}
    };
  },
  created() {
    this.getVideoDetail(this.currentFilm, this.index);
  },
  mounted() {},
  watch: {},
  methods: {
    //clickbutton() {
    //    this.a = document.getElementById('myVideo1_html5_api');
    //    console.log('是否暂停', this.a.paused)
    //    this.a.pause();
    //},
    setVideo(videoitem, that) {
      that.$nextTick(() => {
        var timer;

        let myPlayer = this.$video("myVideo" + this.index, {
          autoplay: false,
          preload: "auto",
          width: "355px",
          height: "200px",
          controls: true,
        });
        clearTimeout(timer); //清除延迟执行
      });
    },
    getVideoDetail(currentFilm, index) {
      return new Promise((resolve, reject) => {
        let queryuri = {};
        queryuri.uri = currentFilm.uri;
        var that = this;
        FilmData.GetFilmVideoDetailByFilmURI(queryuri)
          .then(function (result) {
            if (result.videouri != "") {
              that.videoitem = result;
              that.videoitem.index = index;
              that.setVideo(that.videoitem, that);
              resolve();
            }
          })
          .catch((error) => {
            reject(error);
          });
      });
    },
  },
};
</script>

<style>
</style>
