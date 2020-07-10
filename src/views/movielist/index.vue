<template>
    <div style="height:100%">
        <swiper class="swiper" :options="swiperOption">
            <swiper-slide v-for="(item,index) in FilePhotoList" :key="index" class="flexClass">
                <img :src="item.url" class="slide-image" :data-uri="item.filmuri" :data-name="item.filmName" />
            </swiper-slide>
        </swiper>
        <Footer></Footer>
    </div>
</template>

<script>
    import slider_item from "@/components/slider_item";
    import * as mservice from '@/api/movie';
    import Footer from "@/components/Footer";
    export default {
        name: 'swiper-example-centered-auto',
        title: 'Centered slides + Auto slides per view',
        components: {
            Slideritem: slider_item,
            Footer
        },
        data() {
            return {
                FilePhotoList: [],
                swiperOption: {
                    slidesPerView: 2,
                    spaceBetween: 30,
                    centeredSlides: true,
                    pagination: {
                        el: '.swiper-pagination',
                        clickable: true
                    }
                }
            }
        },
        mounted() {
            this.getMovies()
        },
        methods: {
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
    }
</script>

<style scoped>
    .swiper-container {
        width: 300px;
        height: 200px;
    }
    .swiper-slide {
        background-image: none;
    }
    .swiper-slide {
        width: 60%;
    }

        .swiper-slide:nth-child(2n) {
            width: 40%;
        }

        .swiper-slide:nth-child(3n) {
            width: 20%;
        }
</style>