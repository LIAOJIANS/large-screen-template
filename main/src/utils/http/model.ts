import { AxiosRequestConfig, AxiosInstance } from 'axios'

export interface IResult {
  code: number,
  message?: String,
  data?: any,
  [key: string]: any
}

export interface IRequest {
  url: string,
  method: 'post' | 'get' | 'put',
  params?: any,
  data?: any,
  [key: string]: any
}

export interface CreateAxiosOptions extends AxiosRequestConfig {
  prefixUrl?: string;
  [key: string]: any
}

// export interface IToken {
//   token: string
// }

export type IRequestCallback<T> = (Axios: T) => Promise<AxiosInstance>
