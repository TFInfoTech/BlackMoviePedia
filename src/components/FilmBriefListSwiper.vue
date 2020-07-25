<template>
    <div>
        <swiper ref="mySwiper" :options="swiperOptions">
            <SwiperItem v-for="(item,index) in filmList" :key="index" :filmitem="item"></SwiperItem>
            <div class="swiper-button-prev" slot="button-prev"></div>
            <div class="swiper-button-next" slot="button-next"></div>
        </swiper>
    </div>
</template>

<script>
    import SwiperItem from "./SwiperItem";
    export default {
        name: "FilmBriefListSwiper",
        props: ['filmList'],
        components: {
            SwiperItem
        },
        data() {
            return {
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
                },
               
            };
        },
        computed: {
            swiper() {
                return this.$refs.mySwiper.$swiper;
            }
        },
        created() {
        },
        mounted() {

        },
        methods: {
        }
    }
</script>

<style>
</style>
