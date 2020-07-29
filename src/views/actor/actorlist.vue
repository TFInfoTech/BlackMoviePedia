<template>
    <div style="height:100%">

    </div>
</template>

<script>
    import FilmData from "@/data/film";
    let vm = null;
    export default {
        components: {

        },
        name: "star",
        data() {
            return {
                a: {}
            };
        },
        created() {
            this.getActorListNew();
        },
        computed: {
        },
        mounted() {

        },
        watch: {

        },
        methods: {
           
            getActorListNew() {
                let query = {};
                query.type = '黑白';
                let that = this;
                let list = [];
                FilmData.GetFilmList(query).then(function (result) {
                    let filmlist = result;
                    for (let i = 0; i < filmlist.length; i++) {
                        list = list.concat(filmlist[i].actorList);
                    }
                    that.actorlist = that.unique(list, 'puri');
                    
                    for (let j = 0; j < that.actorlist.length; j++) {
                        that.getActorDetailByUri(that.actorlist[j].puri).then(
                            (data) => {
                                that.actorlist[j].actorDetail = data;

                                
                               
                            },
                            (err) => { }
                        );
                    }
                    
                    console.log('actorlist', that.actorlist)
                })
            },
            getActorDetailByUri(ActorUri) {
                return new Promise((resolve, reject) => {
                    let queryactoruri = {};
                    queryactoruri.uri = ActorUri;
                    FilmData.GetURIDetail(queryactoruri).then(function (result) {
                        let actorDetail = result;
                        //取简介
                        if (Array.isArray(actorDetail.briefBiography)) {
                            actorDetail.briefBiographyitem = actorDetail.briefBiography[0];
                        }
                        else {
                            actorDetail.briefBiographyitem = actorDetail.briefBiography;
                        }
                        //取姓名
                        let nameinfo = [];
                        let photoinfo = [];
                        if (Array.isArray(actorDetail.name)) {
                            for (let q = 0; q < actorDetail.name.length; q++) {
                                if (JSON.stringify(actorDetail.name[q]).indexOf("http") != -1) {
                                    let actornameuri = {};
                                    actornameuri.uri = actorDetail.name[q];
                                    FilmData.getActorNameByActorNameUri(actornameuri).then(
                                        (data) => {
                                            nameinfo.push(data);
                                            //取照片
                                            let photoquery = {};
                                            photoquery.freetext = data.namelabel
                                            FilmData.getActorPhotoByActorname(photoquery).then(
                                                (data) => {
                                                    console.log('photodata',data)
                                                    photoinfo.push(data);
                                                },
                                                (err) => { }
                                            );
                                        },
                                        (err) => { }
                                    );
                                }
                                else if (JSON.stringify(actorDetail.name[q]).indexOf("value") != -1) {
                                    let nameinfoitem = {};
                                    nameinfoitem.nametype = actorDetail.name[q]['@language'];
                                    nameinfoitem.namelabel = actorDetail.name[q]['@value'];
                                    nameinfo.push(nameinfoitem);
                                }
                            }
                        }
                        else {
                            //console.log('不是数组',t, actorinfolist[t].name);
                            //不是数组
                            let actornameuri = {};
                            actornameuri.uri = actorDetail.name;
                            FilmData.getActorNameByActorNameUri(actornameuri).then(
                                (data) => {
                                    actorDetail.nameinfo = data;
                                },
                                (err) => { }
                            );
                        }

                        actorDetail.nameinfo = nameinfo;
                        resolve(actorDetail);
                        //console.log('actorDetail', actorDetail)
                       // return actorDetail
                    });
                });
            },
            unique(arr, index) {
                const res = new Map();
                return arr.filter((arr) => !res.has(arr[index]) && res.set(arr[index], 1));
            },
        },
    }
</script>

<style>
</style>
