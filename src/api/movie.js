import request from '@/utils/request'

export function fetchList(query) {
    return request({
        url: '/shnh/dydata/webapi/movie/getMovie',
        method: 'get',
        params: query
    })
}
export function fetchPhotoByName(query) {
    return request({
        url: '/shnh/dydata/webapi/photo/getPhotoList',
        method: 'get',
        params: query
    })
    // console.log ('getPhotoList',query.freetext,r)
    // return r
}

export function fetchFilmDetailByFilmURI(query) {
    return request({
        url: '/shnh/dydata/webapi/movie/movieDetail',
        method: 'get',
        params: query
    })
}
export function fetchURIDetailByURI(query) {
    return request({
        url: '/data/jsonld',
        method: 'get',
        params: query
    })
}
export function fetchObject(id) {
    return request({
        url: '/vue-element-admin/article/detail',
        method: 'get',
        params: { id }
    })
}

export function fetchPv(pv) {
    return request({
        url: '/vue-element-admin/article/pv',
        method: 'get',
        params: { pv }
    })
}

export function createObject(data) {
    return request({
        url: '/api/app/meetingRoom',
        method: 'post',
        data
    })
}

export function updateObject(data) {
    return request({
        url: '/api/app/meetingRoom/' + data.id,
        method: 'put',
        data
    })
}

export function deleteObject(data) {
    return request({
        url: '/api/app/meetingRoom/' + data.id,
        method: 'delete'
    })
}
