import axios from "axios"

const instance = axios.create({
  baseURL: "/api",
  params: {
    // 可以传递公用的params
  }
})

export default instance;