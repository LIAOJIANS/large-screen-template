import { combineReducers, ReducersMapObject, AnyAction, Reducer } from 'redux'
import loadingState, { ILoadingState } from './loadingStateRedc'

export interface ICombinedState {
  loadingStore: ILoadingState
}

const reducers: ReducersMapObject<ICombinedState, AnyAction> = {
  loadingStore: loadingState
}

const reducer: Reducer<ICombinedState, AnyAction> = combineReducers(reducers)

export default reducer
