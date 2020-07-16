<template>
    <div style="height:100%">
        <div class="main-title">中国黑白电影</div>

        <swiper ref="mySwiper" :options="swiperOptions">
            <swiper-slide v-for="(item,index) in FilePhotoList" :key="index">
                <img :src="item.url"
                     class="slide-image"
                     :data-uri="item.filmuri"
                     :data-name="item.filmName" />
            </swiper-slide>
            <div class="swiper-button-prev" slot="button-prev"></div>
            <div class="swiper-button-next" slot="button-next"></div>
        </swiper>

        <Footer></Footer>
    </div>
</template>

<script>
    import slider_item from "@/components/slider_item";
    import Footer from "@/components/Footer";
    // import { Tabbar, TabbarItem } from "vant";
    // import { Tab, Tabs } from "vant";
    let vm = null;
    export default {
        components: {
            Slideritem: slider_item,
            Footer
        },
        name: "carrousel",
        data() {
            return {
                FilePhotoList: [],
                active: 0,
                list: [],
                swiperOptions: {
                    effect: "cube",
                    grabCursor: true,
                    cubeEffect: {
                        shadow: true,
                        slideShadows: true,
                        shadowOffset: 20,
                        shadowScale: 0.94
                    },
                    pagination: {
                        el: ".swiper-pagination"
                    },
                    navigation: {
                        nextEl: ".swiper-button-next",
                        prevEl: ".swiper-button-prev"
                    },
                    autoplay: {
                        delay: 5000,
                        stopOnLastSlide: false,
                        disableOnInteraction: true
                    },
                }
            };
        },
        created() {
            let index = this.active + 1;
            this.list = this[`list${index}`]; // this.list1
            vm = this;
        },
        computed: {
            swiper() {
                return this.$refs.mySwiper.$swiper;
            }
        },
        mounted() {
            console.log('Current Swiper instance object', this.swiper)
            this.getMoviesasync()
        },
        methods: {
            onchange(index) {
                this.list = this[`list${index + 1}`];
            },
            handleClickSlide(index) {
                console.log('当前点击索引：', index);
                console.log('当前点击电影uri', this.FilePhotoList[index])
            },
            getMoviesasync() {
                let query = {};
                query.type = '黑白';
                let that = this;
                this.$common.GetFilmList(query).then(function (result) {
                    let filmlist = result;
                    console.log('filmlist', filmlist);
                    let photolist = [];
                    for (let i = 0; i < filmlist.length; i++) {
                        let queryphoto = {};
                        queryphoto.freetext = filmlist[i].name;
                        queryphoto.filmuri = filmlist[i].uri;
                        let queryuri = {};
                        queryuri.uri = filmlist[i].uri;

                        that.$common.GetPhotoByName(queryphoto).then(function (result) {
                            if (JSON.stringify(result) != '{}') {
                                photolist.push(result)
                            }
                        });
                    }
                    that.FilePhotoList = photolist;
                });
            },
            
        }
    };
</script>

<style>
    html, body {
        /*position: relative;*/
        width: 100%;
        height: 100%;
        margin: 0;
        padding: 0;
    }

    body {
        background-image: url(../../assets/img/title_bg.jpg);
        font-family: "Helvetica Neue",Helvetica,"PingFang SC","Hiragino Sans GB","Microsoft YaHei","微软雅黑",Arial,sans-serif;
        font-size: 14px;
        color: #000;
        margin: 0;
        padding: 0;
    }

    /*body div {
            height: 100%
        }*/

    .swiper-container {
        width: 85%;
        height: 80%;
    }

    .main-title {
        width: 100%;
        height: 80px;
        font-size: 30px;
        line-height: 3;
        font-weight: 800;
        text-align: center;
        letter-spacing: 6px;
    }

    .swiper-slide {
        background-position: center;
        background-size: cover;
        background-image: url(../../assets/img/MovieBackground.jpg);
        border-radius: 5px;
        text-align: center;
    }

    .slide-image {
        width: 90%;
        height: 100%;
        object-fit: contain;
    }

    .flexClass {
        display: flex;
        align-items: center; /*定义body的元素垂直居中*/
        justify-content: center; /*定义body的里的元素水平居中*/
    }

    .swiper-button-next {
        right: -20px;
    }

    .swiper-button-prev {
        left: -20px;
    }

    .swiper-button-prev,
    .swiper-button-next {
        color: grey;
    }
</style>
