import request from '../utils/http/request'

export function tableDataOne<T>(): Promise<T> {
  return request<T>({
    url: '/table_data_one',
    method: 'get'
  }) as Promise<T>
}

export function rankingDataOne<T>(): Promise<T> {
  return request<T>({
    url: '/ranking_data_one',
    method: 'get'
  }) as Promise<T>
}
