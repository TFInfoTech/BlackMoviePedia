<template>
    <swiper-slide>     
        <img src="filmPhotoDetail.url"
             class="slide-image"
             :data-uri="filmPhotoDetail.filmuri"
             :data-name="filmPhotoDetail.filmName" />
    </swiper-slide>
</template>

<script>
    import FilmData from "@/data/film";
    export default {
        name: "SwiperItem",
        props: ['filmitem'],
        components: {

        },
        data() {
            return {
                filmPhotoDetail: {},
                emptyUrl: require("../assets/img/MovieBackground.jpg"),
            };
        },
        created() {
            this.getFilmDetailOfPhoto(this.filmitem);
        },
        mounted() {

        },
        methods: {
            getFilmDetailOfPhoto(film) {
                return new Promise((resolve, reject) => {
                    let that = this;
                    // È¡ÕÕÆ¬
                    let queryphoto = {};
                    queryphoto.freetext = film.name;
                    queryphoto.filmuri = film.uri;
                    FilmData.GetPhotoByName(queryphoto)
                        .then(function (result) {
                            if (JSON.stringify(result) === "{}") {
                                result.url = that.emptyUrl;
                            }
                            that.filmPhotoDetail = result;
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
