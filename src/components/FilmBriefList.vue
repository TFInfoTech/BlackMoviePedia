<template>
    <div>
        <div>
            <FilmBriefListSwiper :filmList="filmList"></FilmBriefListSwiper>
        </div>
        <!-- <div v-if="type==2">
            <FilmBriefSmall v-for="(item,index) in filmList" :key="index" :currentFilm="item" :index="index"></FilmBriefSmall>
        </div> -->
    </div>
</template>

<script>
    import FilmBriefListSwiper from "./FilmBriefListSwiper";
    export default {
        name: "FilmBriefList",
        components: {
            FilmBriefListSwiper
        },
        props: ['filmList', 'type'],
        data() {
            return {

            };
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
