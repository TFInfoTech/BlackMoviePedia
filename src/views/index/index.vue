<template>
    <div>
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
            <swiper-slide><img src="../../assets/img/nature-1.jpg" class="slide-image" /></swiper-slide>
            <swiper-slide><img src="../../assets/img/nature-2.jpg" class="slide-image" /></swiper-slide>
            <swiper-slide><img src="../../assets/img/nature-3.jpg" class="slide-image" /></swiper-slide>
            <swiper-slide><img src="../../assets/img/nature-4.jpg" class="slide-image" /></swiper-slide>
            <swiper-slide><img src="../../assets/img/nature-5.jpg" class="slide-image" /></swiper-slide>
            <div class="swiper-pagination" slot="pagination"></div>
        </swiper>
        <Footer page="index"></Footer>
    </div>
</template>

<script>
    import Footer from "@/components/Footer";
    import * as mservice from '@/api/movie'
    // import { Tabbar, TabbarItem } from "vant";
    // import { Tab, Tabs } from "vant";

    export default {
        // components: {
        //   [Tab.name]: Tab,
        //   [Tabs.name]: Tabs
        // },
        name: 'carrousel',
        data() {
            return {
                active: 0,
                list: [],
                // 樱桃
                list1: [
                    { name: "樱桃机械键盘1", price: 400, saleDate: 1566893214215 },
                    { name: "樱桃机械键盘2", price: 500, saleDate: 1566892214215 },
                    { name: "樱桃机械键盘3", price: 800, saleDate: 1566893215215 }
                ],
                // 牧马人
                list2: [
                    { name: "牧马人机械键盘1", price: 200, saleDate: 1566893214215 },
                    { name: "牧马人机械键盘2", price: 500, saleDate: 1566893114215 }
                ],
                // 雷蛇
                list3: [
                    { name: "雷蛇机械键盘1", price: 200, saleDate: 1566893214215 },
                    { name: "雷蛇机械键盘2", price: 500, saleDate: 1566193214215 },
                    { name: "雷蛇机械键盘3", price: 400, saleDate: 1566393212215 },
                    { name: "雷蛇机械键盘4", price: 800, saleDate: 1566892214215 }
                ],
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
                    // Some Swiper option/callback...
                }
            };
        },
        created() {
            let index = this.active + 1;
            this.list = this[`list${index}`]; // this.list1
            // this.getGoods();
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

            getGoods() {
                let url = "/goods"; // /api/goods
                this.$axios
                    .get(url)
                    .then(res => {
                        console.log("res", res);
                    })
                    .catch(err => {
                        console.log("err", err);
                    });
            },
            getMovies() {
                var query = {}
                mservice.fetchList(query).then(response => {
                    console.log("response", response)
                })
            }
        }
    };
</script>

<style>

    html, body {
        position: relative;
        height: 100%;
    }

    body {
        background: #fff;
        font-family: Helvetica Neue, Helvetica, Arial, sans-serif;
        font-size: 14px;
        color: #000;
        margin: 0;
        padding: 0;
    }

    .swiper-container {
        width: 300px;
        height: 650px;
        position: absolute;
        left: 50%;
        top: 20%;
        margin-left: -150px;
        margin-top: -150px;
    }

    .swiper-slide {
        background-position: center;
        background-size: cover;
    }
    .slide-image {
        width: 300px;
        height: 650px
    }

</style>
