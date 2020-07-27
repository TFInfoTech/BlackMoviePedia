<template>
    <div>
        <div v-if="type==1">
            <FilmBriefListSwiper :filmList="filmList"></FilmBriefListSwiper>
        </div>
         <div v-if="type==2">
            <FilmBriefSmall v-for="(item,index) in filmList" :key="index" :currentFilm="item" :index="index"></FilmBriefSmall>
        </div> 
    </div>
</template>

<script>
    import FilmBriefListSwiper from "./FilmBriefListSwiper";
    import FilmBriefSmall from "./FilmBriefSmall";
    export default {
        name: "FilmBriefList",
        components: {
            FilmBriefListSwiper, FilmBriefSmall
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
