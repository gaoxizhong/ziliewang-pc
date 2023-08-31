import request from '@/axios/index.js'

export function login(data) {
  return request({
    url: '/api/login',
    method: 'post',
    data
  })
}

export function getMenu() {
  return request({
    url: '/admin/site/site_get_menu',
    method: 'post'
  })
}
