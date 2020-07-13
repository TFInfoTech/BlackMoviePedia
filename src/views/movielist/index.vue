<template>
    <el-container>
        <el-header>黑白电影简析</el-header>
        <el-main>
            <swiper class="swiper" :options="swiperOption">
                <swiper-slide v-for="(item,index) in FilePhotoList" :key="index" class="flexClass">
                    <!-- <img :src="item.url" class="slide-image" :data-uri="item.filmuri" :data-name="item.filmName" />-->
                    <el-card :body-style="{ padding: '0px' }">
                        <img :src="item.url" class="image" :data-uri="item.filmuri" :data-name="item.filmName">
                        <div style="padding: 14px;">
                            <span>{{item.filmName}}</span>
                            <div class="bottom clearfix">
                                <time class="time">{{ item.filmdate }}</time>
                            </div>
                        </div>
                    </el-card>
                </swiper-slide>
            </swiper>
        </el-main>
        <el-card :body-style="{ padding: '0px' }">
            <video id="myVideo"
                   class="video-js">
                <source src="http://img.library.sh.cn/dy/video/mv2ctivyawltih5l/movie.m3u8" type="application/x-mpegURL">
            </video>
            <div style="padding: 14px;">
                123
            </div>
        </el-card>
        <div class="test_two_box" v-for="(item,index) in VideoList">
            <!--<el-card :body-style="{ padding: '0px' }">
            <video :id="'myVideo'+index"
                   class="video-js">
                <source :src="item.videouri" type="application/x-mpegURL">
            </video>
            <div style="padding: 14px;">
                {{item.filmname}}
            </div>
        </el-card>-->

        </div>
        <Footer></Footer>
    </el-container>
</template>

<script>
    import slider_item from "@/components/slider_item";
    import * as mservice from '@/api/movie';
    import Footer from "@/components/Footer";
    export default {
        name: 'swiper-example-centered-auto',
        title: 'Centered slides + Auto slides per view',
        components: {
            Slideritem: slider_item,
            Footer
        },
        data() {
            return {
                currentDate: new Date(),
                FilePhotoList: [],
                VideoList: [],
                swiperOption: {
                    slidesPerView: 2,
                    spaceBetween: 20,
                    centeredSlides: true,
                    pagination: {
                        el: '.swiper-pagination',
                        clickable: true
                    }
                }
            }
        },
        mounted() {
            this.getMovies();
            this.initVideo();
        },
        methods: {
            getMovies() {
                var query = {};
                let list = [];
                let listvideo = [];
                query.type = '黑白'
                mservice.fetchList(query).then(response => {
                    console.log("response", response)
                    let filmlist = response;
                    for (let i = 0; i < filmlist.length; i++) {
                        let queryphoto = {};
                        queryphoto.freetext = filmlist[i].name;
                        queryphoto.filmuri = filmlist[i].uri;
                        let queryuri = {};
                        queryuri.uri = filmlist[i].uri;
                        mservice.fetchPhotoByName(queryphoto).then(response => {
                            console.log("fetchPhotoByName", response);
                            let photos = response;
                            for (let j = 0; j < photos.length; j++) {
                                if (photos[j].imgPath != null) {
                                    let urlitem = {};
                                    urlitem.filmuri = queryphoto.filmuri;
                                    urlitem.filmName = queryphoto.freetext;
                                    urlitem.url = photos[j].imgPath;
                                    urlitem.filmdate = photos[j].date;
                                    list.push(urlitem);
                                    break;
                                }
                            }
                            this.FilePhotoList.splice(0, this.FilePhotoList.length);
                            this.FilePhotoList = this.FilePhotoList.concat(list);
                            console.log('this.FilePhotoList', this.FilePhotoList)
                        })


                        console.log("queryuri", queryuri);                     
                        mservice.fetchFilmDetailByFilmURI(queryuri).then(response => {
                            console.log('fetchFilmDetailByFilmURI', response);
                            if (response[0].video) {
                                let videoitem = {};
                                videoitem.videouri = response[0].video[0].videoPath;
                                videoitem.filmname = response[0].title;
                                listvideo.push(videoitem);

                            }
                            this.VideoList.splice(0, this.VideoList.length);
                            this.VideoList = this.VideoList.concat(listvideo);
                            console.log('this.VideoList', this.VideoList)
                        })
                    }

                })


            },
            initVideo() {
                //初始化视频方法
                //for (let i = 0; i < this.VideoList.length; i++) {
                let myPlayer =this.$video("myVideo", {
                        //确定播放器是否具有用户可以与之交互的控件。没有控件，启动视频播放的唯一方法是使用autoplay属性或通过Player API。
                        controls: true,
                        //自动播放属性,muted:静音播放
                        autoplay: "muted",
                        //建议浏览器是否应在<video>加载元素后立即开始下载视频数据。
                        preload: "auto",
                        //设置视频播放器的显示宽度（以像素为单位）
                        width: "400px",
                        //设置视频播放器的显示高度（以像素为单位）
                        height: "200px"
                    });
                }
            //}

        }
    }
</script>

<style scoped>
    .swiper-container {
        width: 400px;
        height: 250px;
    }

    .swiper-slide {
        background-image: none;
    }

    .swiper-slide {
        width: 60%;
    }

        .swiper-slide:nth-child(2n) {
            width: 40%;
        }

        .swiper-slide:nth-child(3n) {
            width: 20%;
        }

    .time {
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

    .image {
        width: 100%;
        height: 75%;
        display: block;
    }

    .clearfix:before,
    .clearfix:after {
        display: table;
        content: "";
    }

    .clearfix:after {
        clear: both
    }
</style>