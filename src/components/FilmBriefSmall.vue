<template>
    <div>
        <el-row :gutter="10">
            <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
                <div class="grid-movie-card bg-purple-movie-card" style="height:300px">
                    <el-row :gutter="10">
                        <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
                            <div class="grid-content" style="height:150px;text-align:center">
                                <video :id="'myVideo'+videoitem.index" controls=true autoplay="muted" preload="auto" width="400px" height="200px" data-setup='{}'
                                       class="video-js">
                                    <source :src="videoitem.videouri" type="application/x-mpegURL">
                                </video>
                            </div>
                        </el-col>
                    </el-row>
                    <el-row :gutter="10">
                        <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
                            <div class="grid-content">
                                <span class="--mb--rich-text"
                                      style="margin-left:5px;font-family:PingFangSC; font-weight:700; font-size:24px; color:rgba(123, 123, 123, 1); font-style:normal; letter-spacing:0px; line-height:33px; text-decoration:none;"
                                      data-boldtype="0">{{currentFilm.name}}&nbsp;{{currentFilm.date}}</span>
                            </div>
                        </el-col>
                    </el-row>
                    <el-row :gutter="10">
                        <el-col :xs="4" :sm="4" :md="4" :lg="4" :xl="4">
                            <div class="grid-content">
                                <span class="--mb--rich-text"
                                      style="margin-left:5px;font-family:PingFangSC; font-weight:500; font-size:16px; color:rgba(123, 123, 123, 1); font-style:normal; letter-spacing:0px; line-height:23px; text-decoration:none;"
                                      data-boldtype="0">剧组:</span>
                            </div>
                        </el-col>
                        <el-col :xs="20" :sm="20" :md="20" :lg="20" :xl="20">
                            <div class="grid-content">
                                <span style="font-family:PingFangSC; font-weight:500; font-size:16px; color:rgba(123, 123, 123, 1); font-style:normal; letter-spacing:0px; line-height:23px; text-decoration:none;"
                                      data-boldtype="0">{{videoitem.contributorStr }}</span>
                            </div>
                        </el-col>
                    </el-row>
                </div>
            </el-col>
        </el-row>
    </div>
</template>

<script>
    import FilmData from "@/data/film";
    export default {
        name: "FilmBriefSmall",
        props: ['currentFilm', 'index'],
        data() {
            return {
                videoitem: {},            };
        },
        created() {
        },
        mounted() {
            this.getVideoDetail(this.currentFilm, this.index);
        },
        watch: {
            'videoitem': function () {
                this.setVideo(this.videoitem);
            }
        },
        methods: {
            setVideo(videoitem) {
                var timer
                clearTimeout(timer);  //清除延迟执行

                timer = setTimeout(() => {   //设置延迟执行

                    let myPlayer = this.$video('myVideo' + videoitem.index, {
                        autoplay: false
                    });

                }, 1000);

            },
            getVideoDetail(currentFilm, index) {
                return new Promise((resolve, reject) => {
                    let queryuri = {};
                    queryuri.uri = currentFilm.uri;
                    var that = this;
                    FilmData.GetFilmVideoDetailByFilmURI(queryuri)
                        .then(function (result) {
                            that.videoitem = result;
                            that.videoitem.index = index;

                            resolve();
                        })
                        .catch((error) => {
                            reject(error);
                        });
                });
            },
        }
    }
</script>

<style>
</style>
