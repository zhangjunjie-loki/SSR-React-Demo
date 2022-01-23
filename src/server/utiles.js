import React from "react"
import { renderToString } from "react-dom/server"
import { StaticRouter } from "react-router-dom"
import { Provider } from "react-redux"
import { renderRoutes } from "react-router-config"
import { Helmet } from "react-helmet"

export const renderHtml = (req, store, routes, context) => {
  const content = renderToString(
    <Provider store={store}>
      <StaticRouter location={req.path} context={context}>
        <div>
          {renderRoutes(routes)}
        </div>
      </StaticRouter>
    </Provider>
  )
  const helmet = Helmet.renderStatic();
  const cssStr = context.css.length ? context.css.join("\n") : ""

  return `
    <!doctype html>
    <html>
      <head>
        ${helmet.title.toString()}
        ${helmet.meta.toString()}
        ${helmet.link.toString()}
      </head>
      <style>${cssStr}</style>
      <body>
        <div id="root">${content}</div>
        <script>
          window.context = {
            state: ${JSON.stringify(store.getState())}
          }
        </script>
        <script src="/index.js"></script>
      </body>
    </html>
  `
}