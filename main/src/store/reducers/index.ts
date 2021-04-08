import { combineReducers, ReducersMapObject, AnyAction, Reducer } from 'redux'
import { InterUser } from '../model/IUser'
import loadingState, { ILoadingState } from './loadingStateRedc'
import user from './user'

export interface ICombinedState {
  loadingStore: ILoadingState,
  user: InterUser
}

const reducers: ReducersMapObject<ICombinedState, AnyAction> = {
  loadingStore: loadingState,
  user: user
}

const reducer: Reducer<ICombinedState, AnyAction> = combineReducers(reducers)

export default reducer
