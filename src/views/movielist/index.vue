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
        <!--<el-card :body-style="{ padding: '0px' }">
            <video id="myVideo"
                   class="video-js">
                <source src="http://img.library.sh.cn/dy/video/mv2ctivyawltih5l/movie.m3u8" type="application/x-mpegURL">
            </video>
            <div style="padding: 14px;">
                123
            </div>
        </el-card>-->
        <div class="test_two_box" v-for="(item,index) in VideoList">
            <el-card :body-style="{ padding: '0px' }">
                <el-row :gutter="20">
                    <el-col :span="24">
                        <video :id="'myVideo'+index"
                               class="video-js">
                            <source :src="item.videouri" type="application/x-mpegURL">
                        </video>
                    </el-col>
                </el-row>
                <el-row :gutter="20" style="padding:14px">
                    <el-col :span="16">{{item.filmname}}</el-col>
                    <el-col :span="8">{{item.date}}</el-col>
                </el-row>
                <div style="font-size:x-small;float:right">{{item.contributor}}</div>

            </el-card>
            <br />
        </div>
        <div>
            <video-player class="video-player vjs-custom-skin"
                          ref="videoPlayer"
                          :playsinline="true"
                          :options="playerOptions"></video-player>
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
                },
                playerOptions: {
                    playbackRates: [0.7, 1.0, 1.5, 2.0], //播放速度
                    autoplay: false, //如果true,浏览器准备好时开始回放。
                    muted: false, // 默认情况下将会消除任何音频。
                    loop: false, // 导致视频一结束就重新开始。
                    preload: 'auto', // 建议浏览器在<video>加载元素后是否应该开始下载视频数据。auto浏览器选择最佳行为,立即开始加载视频（如果浏览器支持）
                    language: 'zh-CN',
                    aspectRatio: '16:9', // 将播放器置于流畅模式，并在计算播放器的动态大小时使用该值。值应该代表一个比例 - 用冒号分隔的两个数字（例如"16:9"或"4:3"）
                    fluid: true, // 当true时，Video.js player将拥有流体大小。换句话说，它将按比例缩放以适应其容器。
                    sources: [{
                        type: "application/x-mpegURL",//这里的种类支持很多种：基本视频格式、直播、流媒体等，具体可以参看git网址项目
                        src: "http://img.library.sh.cn/dy/video/564l844dni8363qf/movie.m3u8" //url地址
                    }
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
                    notSupportedMessage: '此视频暂无法播放，请稍后再试', //允许覆盖Video.js无法播放媒体源时显示的默认信息。
                    controlBar: {
                        timeDivider: true,
                        durationDisplay: true,
                        remainingTimeDisplay: false,
                        fullscreenToggle: true  //全屏按钮
                    }
                }
            }
        },
        mounted() {
            //this.getMovies();
            //this.GETA();
            this.getMoviesasync();
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
                        mservice.fetchFilmDetailByFilmURI(queryuri).then(response => {
                            console.log('fetchFilmDetailByFilmURI', response);
                            if (response[0].video) {
                                let videoitem = {};
                                videoitem.videouri = response[0].video[0].videoPath;
                                videoitem.filmname = response[0].title;
                                videoitem.contributor = '';
                                videoitem.date = response[0].date;
                                for (let k = 0; k < response[0].contributor.length; k++) {
                                    videoitem.contributor += response[0].contributor[k] + '  ';
                                }
                                listvideo.push(videoitem);
                            }
                            this.VideoList.splice(0, this.VideoList.length);
                            this.VideoList = this.VideoList.concat(listvideo);
                            console.log('this.VideoList', this.VideoList)
                            this.initVideo(this.VideoList, this);
                        })

                    }

                })


            },
            getMoviesasync() {
                let query = {};
                query.type = '黑白';
                let that = this;
                this.GetFilmList(query).then(function (result) {
                    let filmlist = result;
                    console.log('filmlist', filmlist);
                    let photolist = [];
                    let listvideo = [];
                    for (let i = 0; i < filmlist.length; i++) {
                        let queryphoto = {};
                        queryphoto.freetext = filmlist[i].name;
                        queryphoto.filmuri = filmlist[i].uri;
                        let queryuri = {};
                        queryuri.uri = filmlist[i].uri;

                        that.GetPhotoByName(queryphoto).then(function (result) {
                            if (JSON.stringify(result) != '{}') {
                                photolist.push(result)
                            }
                        });

                        that.GetFilmDetailByFilmURI(queryuri).then(function (result) {
                            if (JSON.stringify(result) != '{}') {
                                listvideo.push(result)
                            }
                        });
                    }
                    that.FilePhotoList = photolist;
                    that.VideoList = listvideo;
                    console.log('photolist', that.FilePhotoList);
                    console.log('VideoList', that.VideoList);
                    that.initVideo(that.VideoList, that);
                });
            },
            initVideo(videolist, that) {
                //初始化视频方法
                console.log('kaishi', videolist)
                for (let i = 0; i < videolist.length; i++) {
                    //videolist.map((item, i) => {
                    console.log('i', i)
                    let myPlayer = that.$video('myVideo' + i, {
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
                // )
            },
            async GetFilmDetailByFilmURI(queryuri) {
                let videoitem = {};
                await mservice.fetchFilmDetailByFilmURI(queryuri).then(response => {
                    console.log('bbb', response)
                    if (response[0].video) {
                        videoitem.videouri = response[0].video[0].videoPath;
                        videoitem.filmname = response[0].title;
                        videoitem.contributor = '';
                        videoitem.date = response[0].date;
                        for (let k = 0; k < response[0].contributor.length; k++) {
                            videoitem.contributor += response[0].contributor[k] + '  ';
                        }
                    }

                })
                return videoitem;
            },
            async GetPhotoByName(queryphoto) {
                let urlitem = {};
                await mservice.fetchPhotoByName(queryphoto).then(response => {
                    console.log("fetchPhotoByName", response);
                    let photos = response;
                    for (let j = 0; j < photos.length; j++) {
                        if (photos[j].imgPath != null) {
                            urlitem.filmuri = queryphoto.filmuri;
                            urlitem.filmName = queryphoto.freetext;
                            urlitem.url = photos[j].imgPath;
                            urlitem.filmdate = photos[j].date;
                            break;
                        }
                    }
                });
                return urlitem;
            },
            async GetFilmList(query) {
                let filmlist = [];
                await mservice.fetchList(query).then(response => {
                    console.log("response", response)
                    filmlist = response;
                })
                return filmlist;
            },
            GETA() {
                let queryuri = {};
                queryuri.uri = 'http://data.library.sh.cn/dy/resource/movie/futcughzte0332ie';

                let queryphoto = {};
                queryphoto.freetext = '风云儿女';
                let query = {};
                query.type = '黑白'

                console.log('GetFilmDetailByFilmURI', this.GetFilmDetailByFilmURI(queryuri));
                console.log('GetPhotoByName', this.GetPhotoByName(queryphoto));

                console.log('filmlist', this.GetFilmList(query));
            }
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