<template>
    <el-container>
        <el-header>
            <el-row :gutter="10" type="flex" align="middle">
                <el-col :xs="20" :sm="20" :md="20" :lg="20" :xl="20">
                    <div class="grid-content" style="height:80px">
                        <span style="line-height:80px;font-family:PingFangSC; font-weight:700; font-size:30px; color:rgb(16, 16, 16); font-style:normal; letter-spacing:0px;"
                              data-boldtype="0">今天怀旧点啥</span>
                    </div>
                </el-col>
                <el-col :xs="4" :sm="4" :md="4" :lg="4" :xl="4">
                    <div class="grid-content" style="height:80px">
                        <router-link :to="{path:'/search'}">
                            <span style="line-height:100px;width: 24px; height: 24px; min-height: 24px; min-width: 24px;">
                                <svg xmlns="http://www.w3.org/2000/svg"
                                     class="svg-icon"
                                     style="fill: #101010;"
                                     viewBox="0 0 32 32"
                                     width="24"
                                     height="24">
                                    <path d="M 30.428 28.814 l -7.377 -7.377 c 1.614 -2.073 2.766 -4.611 2.766 -7.606 c 0 -6.681 -5.301 -11.983 -11.986 -11.983 c -6.681 0 -11.983 5.301 -11.983 11.987 c 0 6.685 5.301 11.987 11.987 11.987 c 2.997 0 5.533 -1.155 7.608 -2.769 l 7.374 7.374 l 1.614 -1.614 Z M 4.146 13.83 c 0 -5.301 4.38 -9.681 9.683 -9.681 c 5.301 0 9.679 4.38 9.679 9.683 c 0 2.303 -0.924 4.608 -2.307 6.222 l -1.155 1.152 c -1.614 1.383 -3.919 2.305 -6.223 2.305 c -5.301 0 -9.681 -4.383 -9.681 -9.683 Z" />
                                </svg>
                            </span>
                        </router-link>
                    </div>
                </el-col>
            </el-row>
        </el-header>
        <el-main>
            <el-row :gutter="10">
                <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
                    <div class="grid-content" style="height:600px">
                        <el-tabs v-model="activeName" @tab-click="handleClick">
                            <el-tab-pane label="随便" name="1">
                                <FilmBrief></FilmBrief>
                            </el-tab-pane>
                            <el-tab-pane label="影星" name="3">
                            </el-tab-pane>
                            <el-tab-pane label="视频" name="4">
                                <FilmBriefList :filmList="filmList" :type="2"></FilmBriefList>
                            </el-tab-pane>
                            <el-tab-pane label="电影" name="5">
                                <FilmBriefList :filmList="filmList" :type="1"></FilmBriefList>
                            </el-tab-pane>
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
    import FilmBriefList from "@/components/FilmBriefList";
    import FilmData from "@/data/film";
    export default {
        components: {
            Footer,
            FilmBrief,
            FilmBriefList,
        },
        data() {
            return {
                activeName: "1",
                filmList: [],    
            };
        },
        created() {
            this.getFilms();
        },
        methods: {
            handleClick(tab, event) {
                console.log(tab, event);
            },
            getFilms() {
                return new Promise((resolve, reject) => {
                    let query = {};
                    query.type = "黑白";
                    query.pageth = 1;
                    query.pageSize = 50;
                    var that = this;
                    FilmData.GetFilmList(query)
                        .then(function (result) {
                            that.filmList = result;
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
        color: #409EFF;
        font-size: x-large;
        font-weight: 400;
    }
</style>