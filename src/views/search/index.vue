<template>
  <el-container>
    <el-header style="margin-top:15px">
      <el-row :gutter="10" type="flex" align="middle">
        <el-col :xs="2" :sm="2" :md="2" :lg="2" :xl="2">
          <div class="grid-content" style="padding-top:10px">
            <i class="el-icon-back" @click="back()"></i>
          </div>
        </el-col>
        <el-col :xs="22" :sm="22" :md="22" :lg="22" :xl="22">
          <div class="grid-content bg-purple">
            <el-input placeholder="请输入影片名或人名" v-model="searchInput" class="input-with-select">
              <el-button slot="append" icon="el-icon-search" @click="search()"></el-button>
            </el-input>
          </div>
        </el-col>
      </el-row>
    </el-header>
    <el-main>
      <el-row :gutter="10" type="flex" align="middle" v-if="filmList.length===0">
        <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
          <el-row :gutter="10" type="flex" align="middle">
            <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
              <div class="grid-content">
                <span
                  class="--mb--rich-text"
                  style="font-family:PingFangSC; font-weight:700; font-size:18px; color:rgb(16, 16, 16); font-style:normal; letter-spacing:0px; line-height:25px; text-decoration:none;"
                  data-boldtype="0"
                >推荐你看</span>
              </div>
            </el-col>
          </el-row>
          <el-row :gutter="10" type="flex" align="middle">
            <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
              <div class="grid-content">
                <el-tag
                  class="quick-tag"
                  @close="handleCloseTag(tag)"
                  v-for="tag in searchTags"
                  :key="tag"
                  closable
                  type
                  @click="pasteInput (tag)"
                >{{tag}}</el-tag>
              </div>
            </el-col>
          </el-row>
        </el-col>
      </el-row>
      <el-row :gutter="10" type="flex" align="middle" v-if="hasNoResult">
        <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
          <div
            class="grid-content"
            style="text-align:center;font-weight:600;color:rgba(123, 123, 123, 1)"
          >啥也没找着，找找别的试试</div>
        </el-col>
      </el-row>
      <el-row :gutter="10" type="flex" align="middle" v-if="!hasNoResult">
        <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
          <SearchList :waterfallData="filmList"></SearchList>
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
import SearchList from "@/components/SearchList";
import FilmData from "@/data/film";

export default {
  components: {
    Footer,
    SearchList,
  },
  data() {
    return {
      searchInput: "",
      searchTags: ["风云儿女", "新女性", "天伦", "人生", "渔光曲"],
      filmList: [
        // {
        //   abbreviateName: "",
        //   date: "1927",
        //   name: "田七郎",
        //   uri: "http://data.library.sh.cn/dy/resource/movie/3w67jnfaot1csjxa",
        // },
        // {
        //   abbreviateName: "",
        //   date: "1927",
        //   name: "田七郎",
        //   uri: "http://data.library.sh.cn/dy/resource/movie/3w67jnfaot1csjxa",
        // },
      ],
      searched: false,
    };
  },
  computed: {
    hasNoResult() {
      // console.log ('check hasNoResult')
      if (this.searched && this.filmList.length === 0) {
        return true;
      } else {
        return false;
      }
    },
  },
  methods: {
    back() {
      history.back();
    },
    pasteInput(inputValue) {
      this.searchInput = inputValue;
    },
    handleCloseTag(tag) {
      this.searchTags.splice(this.searchTags.indexOf(tag), 1);
    },
    search() {
      return new Promise((resolve, reject) => {
        let query = {};
        query.type = "黑白";
        query.name = this.searchInput;
        query.pageth = 1;
        query.pageSize = 10;
        var that = this;
        FilmData.GetFilmList(query)
          .then(function (result) {
            that.$nextTick(() => {
              // that.filmList = Object.assign({}, that.filmList, result);
              that.filmList = result;
              that.searched = true;
              console.log("that.filmList", that.filmList);
            });
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
.quick-tag {
  margin: 5px;
}
</style>