import axios from "axios"

const createInstance = (req) => axios.create({
  baseURL: "http://localhost:3000",
  // 携带cookie的写法：如果有cookie传递时，服务端和客户端为了保持一致，需要在请求时将cookie保持住
  headers: {
    cookie: req.get("cookie") || ""
  }
})

export default createInstance