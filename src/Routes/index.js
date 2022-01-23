import App from "../containers/App"
import Home from "../containers/Home"
import NotFound from "../containers/NotFound"
import Translation from "../containers/Translation"

/**
 * 根据服务端渲染来改造路由
 * 参考：https://v5.reactrouter.com/web/guides/server-rendering/data-loading
 */
export default [{
  path: "/",
  key: "App",
  component: App,
  loadData: App.loadData,
  routes: [
    {
      path: "/",
      key: "/",
      component: Home,
      exact: true,
      loadData: Home.loadData,
    },
    {
      path: "/translation",
      key: "/translation",
      component: Translation,
      loadData: Translation.loadData,
      exact: true
    },
    {
      key: "NotFound",
      component: NotFound
    }
  ]
}]

// export default (
//   <>
//     <Route path="/" exact component={Home} />
//     <Route path="/login" exact component={Login} />
//   </>
// )