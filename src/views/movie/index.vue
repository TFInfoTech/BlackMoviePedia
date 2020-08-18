<template>
  <el-container>
    <el-header>
      <el-row :gutter="10" type="flex" align="middle">
        <el-col :xs="2" :sm="2" :md="2" :lg="2" :xl="2">
          <div class="grid-content" style="padding-top:10px">
            <i class="el-icon-back" @click="back()"></i>
          </div>
        </el-col>
        <el-col :xs="20" :sm="20" :md="20" :lg="20" :xl="20">
          <div class="grid-content" style="height:80px">
            <span
              style="line-height:80px;font-family:PingFangSC; font-weight:700; font-size:30px; color:rgb(16, 16, 16); font-style:normal; letter-spacing:0px;"
              data-boldtype="0"
            >{{filmDetail.name}}</span>
          </div>
        </el-col>
      </el-row>
    </el-header>
    <el-main>
      <el-row :gutter="10">
        <el-col :xs="6" :sm="6" :md="6" :lg="6" :xl="6">
          <div class="grid-content detail-title">
            <span
              class="--mb--rich-text"
              style="margin-left:5px;font-family:PingFangSC; font-weight:600; font-size:16px; color:rgba(123, 123, 123, 1); font-style:normal; letter-spacing:0px; line-height:23px; text-decoration:none;"
              data-boldtype="0"
            >上映日期:</span>
          </div>
        </el-col>
        <el-col :xs="18" :sm="18" :md="18" :lg="18" :xl="18">
          <div class="grid-content">
            <span
              style="font-family:PingFangSC; font-weight:500; font-size:16px; color:rgba(123, 123, 123, 1); font-style:normal; letter-spacing:0px; line-height:23px; text-decoration:none;"
              data-boldtype="0"
            >{{filmDetail.date }}</span>
          </div>
        </el-col>
      </el-row>
      <el-row :gutter="10">
        <el-col :xs="6" :sm="6" :md="6" :lg="6" :xl="6">
          <div class="grid-content detail-title">
            <span
              class="--mb--rich-text"
              style="margin-left:5px;font-family:PingFangSC; font-weight:600; font-size:16px; color:rgba(123, 123, 123, 1); font-style:normal; letter-spacing:0px; line-height:23px; text-decoration:none;"
              data-boldtype="0"
            >剧组:</span>
          </div>
        </el-col>
        <el-col :xs="18" :sm="18" :md="18" :lg="18" :xl="18">
          <div class="grid-content">
            <span
              style="font-family:PingFangSC; font-weight:500; font-size:16px; color:rgba(123, 123, 123, 1); font-style:normal; letter-spacing:0px; line-height:23px; text-decoration:none;"
              data-boldtype="0"
            >{{filmDetail.contributorStr }}</span>
          </div>
        </el-col>
      </el-row>
      <el-row :gutter="10">
        <el-col :xs="6" :sm="6" :md="6" :lg="6" :xl="6">
          <div class="grid-content detail-title">
            <span
              class="--mb--rich-text"
              style="margin-left:5px;font-family:PingFangSC; font-weight:600; font-size:16px; color:rgba(123, 123, 123, 1); font-style:normal; letter-spacing:0px; line-height:23px; text-decoration:none;"
              data-boldtype="0"
            >剧照</span>
          </div>
        </el-col>
      </el-row>

      <el-row :gutter="10">
        <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
          <div class="grid-content">
            <swiper class="swiper" :options="swiperOption">
              <swiper-slide v-for="(item,index) in FilePhotoList" :key="index" class="flexClass">
                <el-card :body-style="{ padding: '0px' }">
                  <img :src="item.imgPath" class="movie_detail_photo" />
                </el-card>
              </swiper-slide>
            </swiper>
          </div>
        </el-col>
      </el-row>
      <el-row :gutter="10">
        <el-col :xs="6" :sm="6" :md="6" :lg="6" :xl="6">
          <div class="grid-content detail-title">
            <span
              class="--mb--rich-text"
              style="margin-left:5px;font-family:PingFangSC; font-weight:600; font-size:16px; color:rgba(123, 123, 123, 1); font-style:normal; letter-spacing:0px; line-height:23px; text-decoration:none;"
              data-boldtype="0"
            >影像资料</span>
          </div>
        </el-col>
      </el-row>
      <el-row :gutter="10">
        <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
          <div class="grid-content">
            <FilmBriefList :filmList="filmList" :type="1"></FilmBriefList>
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
import FilmBriefList from "@/components/FilmBriefList";
import FilmData from "@/data/film";
export default {
  components: {
    Footer,
    FilmBriefList,
  },
  data() {
    return {
      filmList: [],
      FilePhotoList: [{ imgPath: "" }],
      VideoList: [],
      filmDetail: {
        name: "",
        date: "",
        imgPath: this.emptyUrl,
        contributorStr: "",
      },
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
      playerOptions: {
        playbackRates: [0.7, 1.0, 1.5, 2.0], //播放速度
        autoplay: false, //如果true,浏览器准备好时开始回放。
        muted: false, // 默认情况下将会消除任何音频。
        loop: false, // 导致视频一结束就重新开始。
        preload: "auto", // 建议浏览器在<video>加载元素后是否应该开始下载视频数据。auto浏览器选择最佳行为,立即开始加载视频（如果浏览器支持）
        language: "zh-CN",
        aspectRatio: "16:9", // 将播放器置于流畅模式，并在计算播放器的动态大小时使用该值。值应该代表一个比例 - 用冒号分隔的两个数字（例如"16:9"或"4:3"）
        fluid: true, // 当true时，Video.js player将拥有流体大小。换句话说，它将按比例缩放以适应其容器。
        sources: [
          {
            type: "application/x-mpegURL", //这里的种类支持很多种：基本视频格式、直播、流媒体等，具体可以参看git网址项目
            src:
              "http://img.library.sh.cn/dy/video/564l844dni8363qf/movie.m3u8", //url地址
          },
          //, {
          //    type: "video/mp4",
          //    // mp4
          //    src: "http://vjs.zencdn.net/v/oceans.mp4",
          //    // webm
          //    // src: "https://cdn.theguardian.tv/webM/2015/07/20/150716YesMen_synd_768k_vp8.webm"
          //}
        ],
        hls: true,
        poster: "../../assets/img/nature-7.jpg", //你的封面地址
        // width: document.documentElement.clientWidth, //播放器宽度
        notSupportedMessage: "此视频暂无法播放，请稍后再试", //允许覆盖Video.js无法播放媒体源时显示的默认信息。
        controlBar: {
          timeDivider: true,
          durationDisplay: true,
          remainingTimeDisplay: false,
          fullscreenToggle: true, //全屏按钮
        },
      },
    };
  },
  mounted() {},
  created() {
    var filmObj = {
      name: this.$route.params.name,
      uri: this.$route.params.uri,
    };

    this.filmDetail.name = filmObj.name;
    this.GetFilmInfo(filmObj);
    this.filmList=[{uri:filmObj.uri}]
  },
  methods: {
    back() {
      history.back();
    },
    GetFilmInfo(filmObj) {
      FilmData.GetFilmDetailOfPhoto(filmObj).then(
        (data) => {
          if (data && data.length > 0) {
            // this.FilePhotoList = Object.assign(this.FilePhotoList, data);
            this.FilePhotoList = data;
            // console.log("FilePhotoList", this.FilePhotoList);
          }
        },
        (err) => {}
      );
      FilmData.GetFilmDetailOfUri(filmObj).then(
        (data) => {
          this.filmDetail = Object.assign(this.filmDetail, data);
          // console.log ('GetFilmDetailOfUri',data)
        },
        (err) => {}
      );
    },
  },
};
</script>

<style>
.el-tabs__item.is-active {
  color: #409eff;
  font-size: x-large;
  font-weight: 400;
}
.detail-title {
  text-align: left;
  padding-right: 5px;
}
.swiper-container {
  /* width: 250px; */
  height: 150px;
}

.swiper-slide {
  background-image: none;
  background: rgba(241, 238, 238, 0.932);
}

.swiper-slide {
  width: 100%;
}

.swiper-slide:nth-child(2n) {
  width: 40%;
}

.swiper-slide:nth-child(3n) {
  width: 20%;
}

.film-attribute {
  font-size: 13px;
  color: #999;
}

.bottom {
  margin-top: 13px;
  line-height: 12px;
}

.button {
  padding: 0;
  float: right;
}
.movie_detail_photo {
  width: 100%;
  height: 75%;
  display: block;
}
</style>