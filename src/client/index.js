import React from "react"
import ReactDOM from "react-dom"
import { BrowserRouter } from "react-router-dom"
import { Provider } from "react-redux"
import { renderRoutes } from "react-router-config"

import routes from "../Routes"
import { getClientStore } from "../store"

const store = getClientStore()
const App = () => {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <div>
          {renderRoutes(routes)}
        </div>
      </BrowserRouter>
    </Provider>
  )
}

/**
 * 使用hydrate原因：
 * 
 */
ReactDOM.hydrate(<App />, document.getElementById("root"))

