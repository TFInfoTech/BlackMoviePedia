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
                        <span style="line-height:80px;font-family:PingFangSC; font-weight:700; font-size:30px; color:rgb(16, 16, 16); font-style:normal; letter-spacing:0px;"
                              data-boldtype="0">{{filmDetail.name}}</span>
                    </div>
                </el-col>
            </el-row>
        </el-header>
        <el-main>
            <el-row :gutter="10">
                <el-col :xs="6" :sm="6" :md="6" :lg="6" :xl="6">
                    <div class="grid-content detail-title">
                        <span class="--mb--rich-text"
                              style="margin-left:5px;font-family:PingFangSC; font-weight:600; font-size:16px; color:rgba(123, 123, 123, 1); font-style:normal; letter-spacing:0px; line-height:23px; text-decoration:none;"
                              data-boldtype="0">上映日期:</span>
                    </div>
                </el-col>
                <el-col :xs="18" :sm="18" :md="18" :lg="18" :xl="18">
                    <div class="grid-content">
                        <span style="font-family:PingFangSC; font-weight:500; font-size:16px; color:rgba(123, 123, 123, 1); font-style:normal; letter-spacing:0px; line-height:23px; text-decoration:none;"
                              data-boldtype="0">{{filmDetail.date }}</span>
                    </div>
                </el-col>
            </el-row>
            <el-row :gutter="10">
                <el-col :xs="6" :sm="6" :md="6" :lg="6" :xl="6">
                    <div class="grid-content detail-title">
                        <span class="--mb--rich-text"
                              style="margin-left:5px;font-family:PingFangSC; font-weight:600; font-size:16px; color:rgba(123, 123, 123, 1); font-style:normal; letter-spacing:0px; line-height:23px; text-decoration:none;"
                              data-boldtype="0">剧组:</span>
                    </div>
                </el-col>
                <el-col :xs="18" :sm="18" :md="18" :lg="18" :xl="18">
                    <div class="grid-content">
                        <span style="font-family:PingFangSC; font-weight:500; font-size:16px; color:rgba(123, 123, 123, 1); font-style:normal; letter-spacing:0px; line-height:23px; text-decoration:none;"
                              data-boldtype="0">{{filmDetail.contributorStr }}</span>
                    </div>
                </el-col>
            </el-row>
            <el-row :gutter="10">
                <el-col :xs="6" :sm="6" :md="6" :lg="6" :xl="6">
                    <div class="grid-content detail-title">
                        <span class="--mb--rich-text"
                              style="margin-left:5px;font-family:PingFangSC; font-weight:600; font-size:16px; color:rgba(123, 123, 123, 1); font-style:normal; letter-spacing:0px; line-height:23px; text-decoration:none;"
                              data-boldtype="0">剧照</span>
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
                        <span class="--mb--rich-text"
                              style="margin-left:5px;font-family:PingFangSC; font-weight:600; font-size:16px; color:rgba(123, 123, 123, 1); font-style:normal; letter-spacing:0px; line-height:23px; text-decoration:none;"
                              data-boldtype="0">影像资料</span>
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
                actorInfo: {},
                
            };
        },
       
        mounted() { },
        created() {
            let actorObj = {
                uri: this.$route.params.puri,
            };
            this.GetFilmInfo(actorObj);
        },
        methods: {
            back() {
                history.back();
            },
            GetFilmInfo(actorObj) {
                let that = this;
                FilmData.getActorDetailByUri(actorObj.puri).then(
                    (data) => {
                        that.actorInfo = data;
                    },
                    (err) => {
                        console.log('获取演员详细信息失败，失败原因：', err)
                    }
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