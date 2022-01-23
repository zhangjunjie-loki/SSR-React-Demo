import React from "react"
import { renderRoutes } from "react-router-config"

import Header from "./components/Header"
import { actions } from "./components/Header/store"

const App = (props) => {
  return (
    <>
      <Header staticContext={props.staticContext} />
      {/* 渲染二级路由，renderRoutes将route内容带给App组件的props中 */}
      {renderRoutes(props.route.routes)}
    </>
  )
}

/**
 * 这个数据只需要服务端获取就行，客户端不需要获取
 * 原因：不管是客户端进行路由跳转还是直接url访问服务端进行渲染，App这个组件在每个路由下都是存在的。即首屏就加载了App组件且后面浏览器端跳转时该组件没有再次渲染
 */
App.loadData = store => {
  return store.dispatch(actions.getHeaderInfo())
}

export default App
