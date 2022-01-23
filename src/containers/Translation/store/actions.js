import { CHANGE_LIST } from "./constants"

const changeList = list => ({
  type: CHANGE_LIST,
  list
})

export const getTranslationList = () => {
  return (dispatch, getState, axiosInstance) => {
    return axiosInstance.get("/mock/translation")
      .then(res => {
        if(res.data.success){
          dispatch(changeList(res.data.data))
        }else{
          dispatch(changeList([]))
        }
      })
  }
}