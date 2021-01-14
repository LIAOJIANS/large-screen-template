import request from '../utils/http/request'

export function addressRank<T>(): Promise<T> {
  return request({
    url: '/page_address_rank',
    method: 'get'
  }) as Promise<T>
}
