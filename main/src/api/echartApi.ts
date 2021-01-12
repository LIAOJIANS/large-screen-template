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

export function echartMap<T>(): Promise<T> {
  return request<T>({
    url: 'page_map',
    method: 'get'
  }) as Promise<T>
}

export function echartGraph<T>(): Promise<T> {
  return request<T>({
    url: 'page_graph',
    method: 'get'
  }) as Promise<T>
}
