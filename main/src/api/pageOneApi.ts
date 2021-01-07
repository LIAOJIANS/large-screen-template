import request from '../utils/http/request'

export function searchData<T>(): Promise<T> {
  return request<T>({
    url: '/search_data',
    method: 'get'
  }) as Promise<T>
}
