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
        let urlitem = {};
        await mservice.fetchPhotoByName(queryphoto).then(response => {
            // console.log("fetchPhotoByName", queryphoto);
            // console.log("fetchPhotoByName", response);
            if (response.result == "0") {
                let photos = response.data;
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
                        console.log('videoitem', videoitem)
                    }
                }
            }
        })
        return videoitem
    }
}