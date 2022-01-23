import { CHANGE_LIST } from "./constants"

const changeList = (list) => ({
  type: CHANGE_LIST,
  list
})

/**
 * 浏览器运行时：http://localhost:3000/api/mock/homeList
 * 服务端运行时：访问了node服务端根目录下的/api/mock/homeList，所以会出错。
 * 解决方法：在不同端请求不同的接口
 */
export const getHomeList = () => {
  // 这么写很low
  // let url = ""
  // // 只有浏览器端才有window变量
  // if(isServer){
  //   url = "http://localhost:3000/mock/homeList"
  // }else{
  //   url = "/api/mock/homeList"
  // }
  // const request = isServer ? serverAxios : clientAxios
  /**
   * 通过redux-thunk中间件的withExtraArgs把serverAxios/clientAxios传递过来了，简化了isServer的判断
   */
  return (dispatch, getState, axiosInstance) => {
    return axiosInstance.get("/mock/homeList")
    .then(res => {
      const list = res.data
      dispatch(changeList(list))
    })
  }
}