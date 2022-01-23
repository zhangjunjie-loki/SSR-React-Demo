import { CHANGE_LIST } from "./constants"

const defaultState = {
  name: "testHome name",
  homeList: []
}

export default (state = defaultState, action) => {
  switch(action.type) {
    case CHANGE_LIST:
      return {
        ...state,
        homeList: action.list
      }
    default:
      return state;
  }
}
