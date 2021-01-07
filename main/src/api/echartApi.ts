import request from '../utils/http/request'

export function echartLine<T>(): Promise<T> {
  return request<T>({
    url: '/page_line',
    method: 'get'
  }) as Promise<T>
}

export function echartScatter<T>(): Promise<T> {
  return request<T>({
    url: '/page_scatter',
    method: 'get'
  }) as Promise<T>
}
