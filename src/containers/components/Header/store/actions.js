import { CHANGE_LOGIN } from "./constants"

const changeLogin = (value) => ({
  type: CHANGE_LOGIN,
  value
})

export const getHeaderInfo = () => {
  return (dispatch, getState, axiosInstance) => {
    return axiosInstance.get("/mock/isLogin")
      .then(res => {
        dispatch(changeLogin(res.data.data.login))
      })
  }
}

export const login = () => {
  return (dispatch, getState, axiosInstance) => {
    return axiosInstance.get("/mock/login")
      .then(res => {
        dispatch(changeLogin(res.data.data.login))
      })
  }
}

export const logout = () => {
  return (dispatch, getState, axiosInstance) => {
    return axiosInstance.get("/mock/logout")
      .then(res => {
        dispatch(changeLogin(res.data.data.login))
      })
  }
}