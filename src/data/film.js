import * as mservice from '@/api/movie';
export default { //公开
    async GetFilmDetailByFilmURI(queryuri) {
        let videoitem = {};
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
    async GetPhotoByName(queryphoto) {
        var urlitem = {};
        await mservice.fetchPhotoByName(queryphoto).then(response => {
            // console.log("fetchPhotoByName", queryphoto);
            // console.log("fetchPhotoByName", response);
            if (response.result == "0") {
                let photos = response.data;
                // console.log("photos",queryphoto.freetext,queryphoto.uri, response);
                for (let j = 0; j < photos.length; j++) {
                    if (photos[j].imgPath != null) {
                        urlitem.filmuri = queryphoto.filmuri;
                        urlitem.filmName = queryphoto.freetext;
                        urlitem.url = photos[j].imgPath;
                        urlitem.filmdate = photos[j].date;
                        break;
                    }
                }
            }
        });
        // console.log("urlitem", urlitem.filmName, urlitem.url);
        return urlitem;
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

            // console.log("queryphoto", film.name,film.uri);
            this.GetPhotoByName(queryphoto)
                .then(function (result) {
                    if (JSON.stringify(result) === "{}") {
                        result.url = require("../assets/img/MovieBackground.jpg");
                    }
                    // console.log("result", result.filmName, result.url);
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
    }
}