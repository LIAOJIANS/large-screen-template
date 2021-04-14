import request from '../utils/http/request'

export function login<T>(username: string, password: string): Promise<T> {
  return request<T>({
    url: '/login',
    method: 'post',
    data: {
      username,
      password
    }
  }) as Promise<T>
}

export function getUserInfo<T>(): Promise<T> {
  return request<T>({
    url: '/user/info',
    method: 'get'
  }) as Promise<T>
}
