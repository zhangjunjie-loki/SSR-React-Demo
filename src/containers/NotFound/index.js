import React, { useEffect } from "react"

const NotFound = (props) => {
  /**
   * 只有服务端渲染时，才会传入context，然后在这里变成staticContext。客户端props中没有这个变量
   */
  const { staticContext } = props
  staticContext && (staticContext.NOT_FOUND = true)
  return (
    <div>404, sorry, page not found</div>
  )
}

export default NotFound
