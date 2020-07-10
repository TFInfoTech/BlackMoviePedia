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
                <img :src="item.url" class="slide-image" :data-uri="item.filmuri" :data-name="item.filmName" />
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
                        click: function (e) {
                            const realIndex = this.realIndex;
                            vm.handleClickSlide(e);
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
                var query = {};
                let list = [];
                query.type = '黑白'
                mservice.fetchList(query).then(response => {
                    console.log("response", response)
                    let filmlist = response;
                    for (let i = 0; i < filmlist.length; i++) {
                        let queryphoto = {};
                        queryphoto.freetext = filmlist[i].name;
                        queryphoto.filmuri = filmlist[i].uri;
                        mservice.fetchPhotoByName(queryphoto).then(response => {
                            console.log("fetchPhotoByName", response);
                            let photos = response;
                            for (let j = 0; j < photos.length; j++) {
                                if (photos[j].imgPath != null) {
                                    let urlitem = {};
                                    urlitem.filmuri = queryphoto.filmuri;
                                    urlitem.filmName = queryphoto.freetext;
                                    urlitem.url = photos[j].imgPath;
                                    list.push(urlitem);
                                    break;
                                }
                            }
                            this.FilePhotoList.splice(0, this.FilePhotoList.length);
                            this.FilePhotoList = this.FilePhotoList.concat(list);
                            console.log('this.FilePhotoList', this.FilePhotoList)
                        })
                    }

                })
            },
        }
    };
</script>

<style>

</style>
