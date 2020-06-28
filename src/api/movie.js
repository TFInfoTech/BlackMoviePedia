import request from '@/utils/request'

export function fetchList(query) {
  return request({
    url: '/movie/getHomeFilmBillList',
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
