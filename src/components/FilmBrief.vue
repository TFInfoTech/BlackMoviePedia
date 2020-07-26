<template>
  <div>
    <el-row :gutter="10">
      <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
        <div class="grid-movie-card bg-purple-movie-card" style="height:400px">
          <el-row :gutter="10">
            <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
              <div class="grid-content" style="height:250px;text-align:center">
                <img
                  :src="currentFilm.url"
                  class="slide-image"
                  :data-uri="currentFilm.filmuri"
                  :data-name="currentFilm.filmName"
                  style="margin-top:3px"
                />
              </div>
            </el-col>
          </el-row>
          <el-row :gutter="10">
            <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
              <div class="grid-content">
                <span
                  class="--mb--rich-text"
                  style="margin-left:5px;font-family:PingFangSC; font-weight:700; font-size:24px; color:rgba(123, 123, 123, 1); font-style:normal; letter-spacing:0px; line-height:33px; text-decoration:none;"
                  data-boldtype="0"
                >{{currentFilm.filmName===""?(currentFilm.filmname===""?currentFilm.name===""?"":currentFilm.name:currentFilm.filmname):currentFilm.filmName}} - {{ currentFilm.filmdate===""?currentFilm.date===""?"":currentFilm.date:currentFilm.filmdate }}</span>
              </div>
            </el-col>
          </el-row>
          <el-row :gutter="10">
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
                >{{currentFilm.contributorStr }}</span>
              </div>
            </el-col>
          </el-row>
          <el-row :gutter="10">
            <el-col :xs="4" :sm="4" :md="4" :lg="4" :xl="4">
              <div class="grid-content">
                <span
                  class="--mb--rich-text"
                  style="margin-left:5px;font-family:PingFangSC; font-weight:500; font-size:16px; color:rgba(123, 123, 123, 1); font-style:normal; letter-spacing:0px; line-height:23px; text-decoration:none;"
                  data-boldtype="0"
                >简介:</span>
              </div>
            </el-col>
            <el-col :xs="20" :sm="20" :md="20" :lg="20" :xl="20">
              <div class="grid-content">
                <span
                  style="margin-left:5px;font-family:PingFangSC; font-weight:500; font-size:16px; color:rgba(123, 123, 123, 1); font-style:normal; letter-spacing:0px; line-height:23px; text-decoration:none;"
                  data-boldtype="0"
                ></span>
              </div>
            </el-col>
          </el-row>
        </div>
      </el-col>
    </el-row>
    <el-row :gutter="10">
      <el-col :xs="5" :sm="5" :md="5" :lg="5" :xl="5">
        <div class="grid-content bg-transparent"></div>
      </el-col>
      <el-col :xs="6" :sm="6" :md="6" :lg="6" :xl="6">
        <div class="grid-content bg-transparent">
          <el-button round @click="GoToNextFilm ()">不稀罕</el-button>
        </div>
      </el-col>
      <el-col :xs="2" :sm="2" :md="2" :lg="2" :xl="2">
        <div class="grid-content bg-transparent"></div>
      </el-col>
      <el-col :xs="6" :sm="6" :md="6" :lg="6" :xl="6">
        <div class="grid-content bg-transparent">
          <el-button type="info" round>要欣赏</el-button>
        </div>
      </el-col>
      <el-col :xs="5" :sm="5" :md="5" :lg="5" :xl="5">
        <div class="grid-content bg-transparent"></div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import FilmData from "@/data/film";
export default {
  name: "FilmBrief",
  props: ["filmList"],
  data() {
    return {
      currentDate: new Date(),
      emptyUrl: require("../assets/img/MovieBackground.jpg"),
      filmNum: 0,
      filmIndex: 0,
      currentFilm: { url: this.emptyUrl, contributorStr: "" },
    };
  },
  created() {

  },
  mounted() {
    //this.GETA();
  },
  watch: {
    filmList() {
      // console.log("this.filmList", this.filmList);
      if (this.filmList) {
        this.filmNum = this.filmList.length;
        if (this.filmNum > 0) {
          // this.getFilmDetailOfPhoto(this.filmList[0]);
          // console.log("currentFilm", this.currentFilm);
          this.GetFilmInfo(this.filmList[0]);
        }
      }
    },
  },
  methods: {
    GoToNextFilm() {
      // console.log("filmNum", this.filmNum);
      // console.log("filmIndex", this.filmIndex);
      this.filmIndex++;
      if (this.filmIndex >= 0 && this.filmIndex < this.filmNum) {
        this.ClearCurrentFilm();
        // this.getFilmDetailOfPhoto(this.filmList[this.filmIndex]);
        // this.getFilmDetailOfUri(this.filmList[this.filmIndex]);
        this.GetFilmInfo(this.filmList[this.filmIndex]);
      }
    },
    ClearCurrentFilm() {
      this.currentFilm = {
        url: this.emptyUrl,
        date: "",
        filmName: "",
        filmdate: "",
        filmname: "",
        filmuri: "",
        videouri: "",
        contributorStr: "",
      };
    },
    GetFilmInfo(filmObj) {
      FilmData.GetFilmDetailOfPhoto(filmObj).then(
        (data) => {
          this.currentFilm = Object.assign(this.currentFilm, data);
        },
        (err) => {}
      );
      FilmData.GetFilmDetailOfUri(filmObj).then(
        (data) => {
          this.currentFilm = Object.assign(this.currentFilm, data);
        },
        (err) => {}
      );
    }
  },
};
</script>

<style>
.bg-purple-movie-card {
  background: #eaecf1;
}
.grid-movie-card {
  border-radius: 8px;
  min-height: 36px;
}
</style>
