import express from "express"
import { matchRoutes } from "react-router-config"
import proxy from "express-http-proxy"

import { renderHtml } from "./utiles"
import { getStore } from "../store"
import routes from "../Routes"
import mockData from "./mockData"

const app = express()
app.use(express.static("public")) // 静态资源中间件

// mockData模拟服务器代码
app.get(/^\/mock/, mockData)

// node代理服务器
app.use("/api", proxy("http://127.0.0.1:3000", {
  proxyReqPathResolver: (req) => {
    return req.url
  }
}));

app.get("*", (req, res) => {
  const store = getStore(req)
  /**
   * 异步数据服务端获取方法：在这里拿到异步数据，并填充到store
   * 根据当前用户请求地址和路由，来进行判断，需要什么数据
   * 注意：获取数据是异步方法，所以要通过Promise获取数据
   */
  const matchedRoutes = matchRoutes(routes, req.path)
  // 让所有组件的loadData方法执行一边，放在store中。
  const promises = []
  matchedRoutes.forEach(item => {
    if(item.route.loadData){
      const promise = new Promise((resolve, reject) => {
        item.route.loadData(store).then(resolve).catch(resolve)
      })
      promises.push(promise)
    }
  })
  Promise.all(promises).then(() => {
    const context = {css:[]}
    const html = renderHtml(req, store, routes, context)
    /**
     * 重定向功能，在客户端使用<Redirect />后只在客户端生效，服务端不会调用该标签。但会自动在context中注入action帮助识别重定向操作
     * 我们要利用这个action写下服务端重定向的逻辑。
     */
    if(context?.action === "REPLACE"){
      res.redirect(301, context.url)
    }else if(context.NOT_FOUND){
      res.status(404)
      res.send(html)
    }else{
      res.send(html)
    }
  })
})

app.listen(3000, () => console.log('ok in 3000'))