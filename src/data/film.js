import * as mservice from '@/api/movie';
export default { //公开
    async GetFilmDetailByFilmURI(queryuri) {
        let videoitem = {};
        // console.log('queryuri', queryuri)
        await mservice.fetchFilmDetailByFilmURI(queryuri).then(response => {
            // console.log('fetchFilmDetailByFilmURI', response)
            if (response.result == "0") {
                if (response.data[0]) {
                    videoitem = response.data[0];

                    // if (videoinfo[0].video) {
                    //     videoitem.videouri = videoinfo[0].video[0].videoPath;
                    //     videoitem.filmname = videoinfo[0].title;
                    //     videoitem.contributor = '';
                    //     videoitem.date = videoinfo[0].date;
                    videoitem.contributorStr = ''
                    for (let k = 0; k < videoitem.contributor.length; k++) {
                        videoitem.contributorStr += videoitem.contributor[k] + '  ';
                    }
                    // console.log('videoitem', videoitem)
                    // }

                }
            }

        })
        return videoitem
    },
    GetPhotoByName(queryphoto) {
        var urlitem = [];
        return new Promise((resolve, reject) => {

            mservice.fetchPhotoByName(queryphoto).then(response => {
                // console.log("fetchPhotoByName", queryphoto);
                // console.log("fetchPhotoByName", response);
                if (response.result == "0") {
                    urlitem = response.data;
                    // console.log("photos",queryphoto.freetext,queryphoto.uri, response);
                    // for (let j = 0; j < photos.length; j++) {
                    //     if (photos[j].imgPath != null) {
                    //         urlitem.filmuri = queryphoto.filmuri;
                    //         urlitem.filmName = queryphoto.freetext;
                    //         urlitem.url = photos[j].imgPath;
                    //         urlitem.filmdate = photos[j].date;
                    //         break;
                    //     }
                    // }
                }
                resolve(urlitem);
            })
                .catch((error) => {
                    reject(error);
                });
        });
        // console.log("urlitem", urlitem.filmName, urlitem.url);
    },
    async GetFilmList(query) {
        let filmlist = [];
        await mservice.fetchList(query).then(response => {
            if (response.result == "0")
                filmlist = response.data;
        })
        return filmlist;
    },
    async GetURIDetail(query) {
        let res;
        await mservice.fetchURIDetailByURI(query).then(response => {
            res = response.result.data;
            // console.log ('res',res)
        })
        return res;
    },
    async GetFilmVideoDetailByFilmURI(queryuri) {
        let videoitem = {};
        await mservice.fetchFilmDetailByFilmURI(queryuri).then(response => {
            if (response.result == "0") {
                if (response.data[0]) {
                    let videoinfo = response.data[0];
                    videoitem.filmname = videoinfo.title;
                    videoitem.contributor = '';
                    videoitem.date = videoinfo.date;
                    videoitem.contributorStr = ''
                    for (let k = 0; k < videoinfo.contributor.length; k++) {
                        videoitem.contributorStr += videoinfo.contributor[k] + '  ';
                    }
                    if (videoinfo.hasOwnProperty("video")) {
                        videoitem.videouri = videoinfo.video[0].videoPath;
                    }
                    else {
                        videoitem.videouri = ''
                    }
                }
            }
        })
        return videoitem
    },
    GetFilmDetailOfPhoto(film) {
        return new Promise((resolve, reject) => {
            let that = this;
            // 取照片
            let queryphoto = {};
            queryphoto.freetext = film.name;
            queryphoto.filmuri = film.uri;

            // console.log("queryphoto", queryphoto);
            this.GetPhotoByName(queryphoto)
                .then(function (result) {
                    if (JSON.stringify(result) === "{}") {
                        result.url = require("../assets/img/MovieBackground.jpg");
                    }
                    // console.log("result", result);
                    // that.currentFilm = Object.assign(that.currentFilm, result);
                    resolve(result);
                })
                .catch((error) => {
                    reject(error);
                });
        });
    },
    GetFilmDetailOfUri(film) {
        return new Promise((resolve, reject) => {
            let that = this;

            // 取其他详细信息
            let queryuri = {};
            queryuri.uri = film.uri;
            // console.log("queryuri", queryuri);
            this.GetFilmDetailByFilmURI(queryuri)
                .then(function (detailResult) {
                    // if (detailResult) {
                    //     // console.log("detailResult", detailResult);
                    //     that.currentFilm = Object.assign(that.currentFilm, detailResult);
                    // }
                    resolve(detailResult);
                    // console.log("that.currentFilm", that.currentFilm);
                })
                .catch((error) => {
                    reject(error);
                });
        });
    },
    getActorNameByActorNameUri(query) {
        return new Promise((resolve, reject) => {
            this.GetURIDetail(query)
                .then(function (res) {
                    let nameinfoitem = {};
                    nameinfoitem.nametype = res.nameType;
                    nameinfoitem.namelabel = res.label;
                    resolve(nameinfoitem);
                })
                .catch((error) => {
                    reject(error);
                });
        });
    },
    getActorPhotoByActorname(query) {
        return new Promise((resolve, reject) => {
            this.GetPhotoByName(query)
                .then(function (res) {
                    resolve(res);
                })
                .catch((error) => {
                    reject(error);
                });
        });
    },
    getActorDetailByUri(ActorUri) {
        return new Promise((resolve, reject) => {
            let queryactoruri = {};
            queryactoruri.uri = ActorUri;
            let that = this;
            this.GetURIDetail(queryactoruri).then(function (result) {

                let actorDetail = result;
                //取简介
                if (actorDetail.briefBiography) {
                    if (Array.isArray(actorDetail.briefBiography)) {
                        actorDetail.briefBiographyitem = actorDetail.briefBiography[0];
                    }
                    else {
                        // console.log ('actorDetail.briefBiography',actorDetail.briefBiography)
                        actorDetail.briefBiographyitem = actorDetail.briefBiography;
                    }

                } else {
                    actorDetail.briefBiographyitem = ''
                }

                //取姓名
                let nameinfo = [];
                let photoinfo = [];
                if (Array.isArray(actorDetail.name)) {
                    for (let q = 0; q < actorDetail.name.length; q++) {
                        if (JSON.stringify(actorDetail.name[q]).indexOf("http") != -1) {
                            let actornameuri = {};
                            actornameuri.uri = actorDetail.name[q];
                            that.getActorNameByActorNameUri(actornameuri).then(
                                (data) => {
                                    nameinfo.push(data);
                                    //取照片
                                    let photoquery = {};
                                    photoquery.freetext = data.namelabel
                                    that.getActorPhotoByActorname(photoquery).then(
                                        (data) => {
                                            if (data.length > 0) {
                                                photoinfo.push(data);
                                            }
                                        },
                                        (err) => {
                                            console.log('uri取照片失败', photoquery, 'err:', err)
                                        }
                                    );
                                },
                                (err) => { console.log('根据uri取名字失败', actornameuri, 'err:', err) }
                            );
                        }
                        else if (JSON.stringify(actorDetail.name[q]).indexOf("value") != -1) {
                            let nameinfoitem = {};
                            nameinfoitem.nametype = actorDetail.name[q]['@language'];
                            nameinfoitem.namelabel = actorDetail.name[q]['@value'];
                            nameinfo.push(nameinfoitem);

                            let photoquery = {};
                            photoquery.freetext = nameinfoitem.namelabel;
                            that.getActorPhotoByActorname(photoquery).then(
                                (data) => {
                                    if (data.length > 0)
                                        photoinfo.push(data);
                                },
                                (err) => {
                                    console.log('根据@value取照片失败', photoquery, 'err:', err)
                                }
                            );
                        }
                    }
                }
                else {
                    //console.log('不是数组',t, actorinfolist[t].name);
                    //不是数组
                    let actornameuri = {};
                    actornameuri.uri = actorDetail.name;
                    that.getActorNameByActorNameUri(actornameuri).then(
                        (data) => {
                            actorDetail.nameinfo = data;
                            let photoquery = {};
                            photoquery.freetext = data.namelabel;
                            that.getActorPhotoByActorname(photoquery).then(
                                (data) => {
                                    if (data.length > 0)
                                        photoinfo.push(data);
                                },
                                (err) => {
                                    console.log('根据(不是数组)取照片失败', photoquery, 'err:', err)
                                }
                            );
                        },
                        (err) => { console.log('根据(不是数组)uri取名字失败', actornameuri, 'err:', err) }
                    );
                }

                actorDetail.nameinfo = nameinfo;
                actorDetail.photoinfo = photoinfo;
                resolve(actorDetail);
                //console.log('actorDetail', actorDetail)
                // return actorDetail
            });
        });
    },
}