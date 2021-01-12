import { AnyAction } from 'redux'
import {
  LOADING_STATE
} from '../activeTypes'

export interface IOptions {
  msg: any,
  isShowLoading: boolean
}

export interface ILoadingState {
  loadingState: IOptions
}

const initialState: ILoadingState = {
  loadingState: {
    msg: '',
    isShowLoading: false
  }
}

export default (state: ILoadingState = initialState, action: AnyAction) => {
  switch (action.type) {
    case LOADING_STATE:
      console.log(action.payload)

      return { loadingState: { ...state.loadingState, ...action.payload }}
    default:
      return state
  }
}
