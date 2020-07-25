<template>
    <div>
        <FilmBriefSmall v-for="(item,index) in filmList" :key="index" :currentFilm="item" :index="index"></FilmBriefSmall>
    </div>
</template>

<script>
    import FilmBriefSmall from "./FilmBriefSmall";
    import FilmData from "@/data/film";
    export default {
        name: "FilmBriefList",
        components: {
            FilmBriefSmall
        },
        data() {
            return {
                filmList: [],
            };
        },
        created() {
            this.getFilms();
        },
        mounted() {

        },
        methods: {
            getFilms() {
                return new Promise((resolve, reject) => {
                    let query = {};
                    query.type = "黑白";
                    query.pageth = 1;
                    query.pageSize = 50;
                    var that = this;
                    FilmData.GetFilmList(query)
                        .then(function (result) {
                            that.filmList = result;
                            console.log('that.filmList', that.filmList)
                            resolve();
                        })
                        .catch((error) => {
                            reject(error);
                        });
                });
            },
        }
    }
</script>

<style>
</style>
