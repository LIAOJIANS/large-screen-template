import axios, { AxiosInstance, AxiosResponse, AxiosRequestConfig } from 'axios'

import Message, { enumMessageType } from '../../components/messages/messages'

import { IRequest, IResult, CreateAxiosOptions, IRequestCallback } from './model'
import Cookie from 'js-cookie'

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
        Cookie.get('USER_TOKEN') && (
          config.headers['token'] = Cookie.get('USER_TOKEN')
        )
        return config
      },
      (error: Error) => {
        // eslint-disable-next-line no-new
        new Message({
          title: error.message || '未知错误！',
          type: enumMessageType.ERROR
        })
        return Promise.reject(error)
      }
    )
  }

  private interceptorsResponse() {
    this.axiosInstance.interceptors.response.use(
      (response: AxiosResponse<any>) => {
        const res = response.data || response
        const errMsg: string = res.message || '请求失败！'
        if (!res.code || res.code !== 200) {
          // eslint-disable-next-line no-new
          new Message({
            title: errMsg || '未知错误！',
            type: enumMessageType.ERROR
          })
          // eslint-disable-next-line prefer-promise-reject-errors
          return Promise.reject('error')
        } else {
          return Promise.resolve(res.data)
        }
      },
      (error: Error) => {
        // eslint-disable-next-line no-new
        new Message({
          title: error.message || '未知错误！',
          type: enumMessageType.ERROR
        })
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
