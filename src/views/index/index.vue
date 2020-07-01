<template>
    <div style="height:100%" class="flexClass">
        <!--<van-tabs v-model="active" @change="onchange">
            <van-tab title="樱桃"></van-tab>
            <van-tab title="牧马人"></van-tab>
            <van-tab title="雷蛇"></van-tab>
        </van-tabs>

        <van-list style="margin-top: 10px;">
            <van-cell v-for="(item,index) in list"
                      :key="index"
                      :title="item.name"
                      :value="item.saleDate" />
        </van-list>-->
        <swiper ref="mySwiper" :options="swiperOptions">
            <swiper-slide v-for="(item,index) in FilePhotoList" :key="index" class="flexClass">
                <img :src="item.url" class="slide-image" />
            </swiper-slide>
            <div class="swiper-button-prev" slot="button-prev"></div>
            <div class="swiper-button-next" slot="button-next"></div>
            <!--<div class="swiper-pagination" slot="pagination"></div>-->
        </swiper>
    </div>
</template>

<script>
    import slider_item from "@/components/slider_item";
    import Footer from "@/components/Footer";
    import * as mservice from '@/api/movie'
    // import { Tabbar, TabbarItem } from "vant";
    // import { Tab, Tabs } from "vant";
    let vm = null;
    export default {
        components: {
            Slideritem: slider_item,

        },
        name: 'carrousel',
        data() {
            return {
                FilePhotoList: [],
                active: 0,
                list: [],
                swiperOptions: {
                    effect: 'cube',
                    grabCursor: true,
                    cubeEffect: {
                        shadow: true,
                        slideShadows: true,
                        shadowOffset: 20,
                        shadowScale: 0.94,
                    },
                    pagination: {
                        el: '.swiper-pagination'
                    },
                    navigation: {
                        nextEl: '.swiper-button-next',
                        prevEl: '.swiper-button-prev'
                    },
                    autoplay: {
                        delay: 5000,
                        stopOnLastSlide: false,
                        disableOnInteraction: true,
                    },
                    on: {
                        click: function () {
                            const realIndex = this.realIndex;
                            vm.handleClickSlide(realIndex);
                        }
                    },
                }
            };
        },
        created() {
            let index = this.active + 1;
            this.list = this[`list${index}`]; // this.list1
            vm = this;
        },
        components: {
            Footer
        },
        computed: {
            swiper() {
                return this.$refs.mySwiper.$swiper
            }
        },
        mounted() {
            console.log('Current Swiper instance object', this.swiper)
            this.swiper.slideTo(3, 1000, false)
            this.getMovies()
        },
        methods: {
            onchange(index) {
                this.list = this[`list${index + 1}`];
            },
            handleClickSlide(index) {
                console.log('当前点击索引：', index);
                console.log('当前点击电影uri', this.FilePhotoList[index])
            },
            getMovies() {
                var query = {}
                query.type = '黑白'
                mservice.fetchList(query).then(response => {
                    console.log("response", response)
                    let filmlist = response;
                    for (let i = 0; i < filmlist.length; i++) {
                        let queryphoto = {};
                        let urlitem = {};
                        queryphoto.freetext = filmlist[i].name;
                        urlitem.filmuri = filmlist[i].uri;
                        mservice.fetchPhotoByName(queryphoto).then(response => {
                            console.log("fetchPhotoByName", response);
                            let photos = response;
                            for (let i = 0; i < photos.length; i++) {
                                if (photos[i].imgPath != null) {                                 
                                    urlitem.url = photos[i].imgPath;                                   
                                    //this.FilePhotoList.length = 0;
                                    this.FilePhotoList.push(urlitem);
                                }
                            }
                        })
                    }

                })
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
        background: #fff;
        font-family: Helvetica Neue, Helvetica, Arial, sans-serif;
        font-size: 14px;
        color: #000;
        margin: 0;
        padding: 0;
    }
    body div{
        height:100%
    }

    .swiper-container {
        width: 300px;
        height: 500px;
    }

    .swiper-slide {
        background-position: center;
        background-size: cover;
        background-image: url(../../assets/img/MovieBackground.jpg);
        border-radius:20px;
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
        right:-10px;
    }
    .swiper-button-prev {
        left: -10px;
    }
    .swiper-button-prev, .swiper-button-next{
        color:grey;
    }
</style>
