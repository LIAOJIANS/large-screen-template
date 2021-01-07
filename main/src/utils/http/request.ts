import axios, { AxiosInstance, AxiosResponse, AxiosRequestConfig } from 'axios'

import { message } from 'antd'

import { IRequest, IResult, CreateAxiosOptions, IRequestCallback } from './model'

class Axios<IRequest, IResult> {
  private axiosInstance: AxiosInstance

  constructor(axiosConfig: CreateAxiosOptions) {
    this.axiosInstance = axios
    this.createAxios<CreateAxiosOptions>(axiosConfig)
  }

  private createAxios<T>(config: T) {
    this.axiosInstance = axios.create(config)
    this.initAxios()
  }

  private initAxios() {
    this.interceptorsRequest()
    this.interceptorsResponse()
  }

  private interceptorsRequest() {
    this.axiosInstance.interceptors.request.use(
      (config: AxiosRequestConfig) => {
        config.headers['Content-Type'] = 'application/json;charset=UTF-8'
        return config
      },
      (error: Error) => {
        message.error(error.message || '未知错误！')
        return Promise.reject(error)
      }
    )
  }

  private interceptorsResponse() {
    this.axiosInstance.interceptors.response.use(
      (response: AxiosResponse<any>) => {
        const res = response.data || response
        const errMsg: string = res.msg || '请求失败！'
        if ((res.code && res.code !== 200) || (res.status && res.status !== 200)) {
          message.error(errMsg || '未知错误！')
          // eslint-disable-next-line prefer-promise-reject-errors
          return Promise.reject('error')
        } else {
          return Promise.resolve(res.data)
        }
      },
      (error: Error) => {
        message.error(error.message || '未知错误！')
        return Promise.reject(error)
      }
    )
  }

  request<T>(options: IRequest): Promise<T> {
    return new Promise((resolve, reject) => {
      this.axiosInstance.request<any, AxiosResponse<IResult>>(options)
        .then((res: AxiosResponse<IResult>) => {
          resolve((res as unknown) as Promise<T>)
        }).catch((e: Error) => {
          reject(e)
        })
    })
  }
}

function request<T>(options: IRequest, cb?: IRequestCallback<any>) {
  if (cb) {
    cb(Axios)
  } else {
    return new Axios<IRequest, IResult>(
      {
        baseURL: '/dev-api',
        timeout: 100000
      }
    ).request<T>(options)
  }
}

export default request
