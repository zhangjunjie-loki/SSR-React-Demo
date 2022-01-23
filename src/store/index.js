import { createStore, applyMiddleware, combineReducers } from "redux"
import thunk from "redux-thunk"

import { reducer as homeReducer } from "../containers/Home/store"
import { reducer as headerReducer } from "../containers/components/Header/store"
import { reducer as translationReducer } from "../containers/Translation/store"
import clientAxios from "../client/request"
import serverAxios from "../server/request"

const reducer = combineReducers({
  home: homeReducer,
  header: headerReducer,
  translation: translationReducer
})

// 注意这里导出一个方法，每次调用的时候生成新的store
export const getStore = (req) => {
  // 改变服务端store要使用serverAxios
  return createStore(reducer, applyMiddleware(thunk.withExtraArgument(serverAxios(req))))
}

export const getClientStore = () => {
  // 改变客户端store要使用clientAxios
  const defaultState = window.context.state
  return createStore(reducer, defaultState, applyMiddleware(thunk.withExtraArgument(clientAxios)))
}