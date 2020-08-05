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
            >{{actorObj.name}}</span>
          </div>
        </el-col>
      </el-row>
    </el-header>
    <el-main>
      <el-row :gutter="10">
        <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
          <JtTemplate :pData="actorInfo" :pTemplate="template" v-if="actorInfo && template"></JtTemplate>
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
import JtTemplate from "@/components/jtTemplate";
import FilmData from "@/data/film";
export default {
  components: {
    Footer,
    JtTemplate,
  },
  data() {
    return {
      actorObj: {},
      actorInfo: {},
      template: {},
    };
  },

  mounted() {},
  created() {
    this.actorObj = {
      uri: this.$route.params.uri,
      name: this.$route.params.name,
    };
    this.GetJtTemplate().then(() => {
      console.log("this.jtTemplate", this.template);
      this.GetActorInfo(this.actorObj);
    });
    // this.GetFilmInfo(this.actorObj);
  },
  methods: {
    back() {
      history.back();
    },
    GetActorInfo(actorObj) {
      let that = this;
      console.log("actorObj.uri", actorObj.uri);
      FilmData.getActorDetailByUri(actorObj).then(
        (data) => {
          that.actorInfo = Object.assign({}, that.actorInfo, data);
          //   console.log("that.actorInfo", that.actorInfo);
        },
        (err) => {
          console.log("获取演员详细信息失败，失败原因：", err);
        }
      );
    },
    GetJtTemplate() {
      return new Promise((resolve, reject) => {
        let that = this;
        axios
          .get("transform/actorFull.json")
          .then((res) => {
            that.template = Object.assign({}, that.template, res.data);
            console.log("that.jtTemplate", that.template);
            resolve();
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