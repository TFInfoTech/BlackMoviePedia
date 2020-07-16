import * as mservice from '@/api/movie';
export default { //公开
    async GetFilmDetailByFilmURI(queryuri) {
        let videoitem = {};
        await mservice.fetchFilmDetailByFilmURI(queryuri).then(response => {
            console.log('1111111', response)
            if (response.result == "0") {
                let videoinfo = response.data;
                if (videoinfo[0].video) {
                    videoitem.videouri = videoinfo[0].video[0].videoPath;
                    videoitem.filmname = videoinfo[0].title;
                    videoitem.contributor = '';
                    videoitem.date = videoinfo[0].date;
                    for (let k = 0; k < videoinfo[0].contributor.length; k++) {
                        videoitem.contributor += videoinfo[0].contributor[k] + '  ';
                    }
                }
            }

        })
        return videoitem;
    },
    async GetPhotoByName(queryphoto) {
        let urlitem = {};
        await mservice.fetchPhotoByName(queryphoto).then(response => {
            //console.log("queryphoto", queryphoto);
            console.log("fetchPhotoByName", response);
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
    unique(arr,index) {
        const res = new Map();
        return arr.filter((arr) => !res.has(arr[index]) && res.set(arr[index], 1));
    },
}