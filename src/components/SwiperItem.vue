<template>
    <swiper-slide>     
        <img :src="filmPhotoDetail.url"
             class="slide-image"
             :data-uri="filmPhotoDetail.filmuri"
             :data-name="filmPhotoDetail.filmName" />
        <!-- <img :src="emptyUrl" 
             class="slide-image"/>              -->
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
                filmPhotoDetail: {url: this.emptyUrl},
                emptyUrl: require("../assets/img/MovieBackground.jpg"),
            };
        },
        created() {
            this.getFilmDetailOfPhoto(this.filmitem);
            // console.log ('created slide item',this.filmitem);
        },
        mounted() {

        },
        watch: {
       
        },
        methods: {
            getFilmDetailOfPhoto(film) {
                return new Promise((resolve, reject) => {
                    let that = this;
                    // ȡ��Ƭ
                    let queryphoto = {};
                    queryphoto.freetext = film.name;
                    queryphoto.filmuri = film.uri;
                    FilmData.GetPhotoByName(queryphoto)
                        .then(function (result) {
                            if (JSON.stringify(result) === "{}") {
                                result.url = that.emptyUrl;
                            }
                            // console.log ('result',result);
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
