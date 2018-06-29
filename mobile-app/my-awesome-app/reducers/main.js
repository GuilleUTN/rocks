import {initialState} from "../store/initialState/main"
export default function reducer(state=initialState, action) {
    switch (action.type) {
      case "USER_LOGIN": {
        return {...state, logging: true}
      }
      case "USER_LOGING_SUCCESS": {
        return {...state, logging: false, logged: true, response:action.payload}
      }
      case "USER_LOGING_FAIL": {
        return {...state, logging: false, logged: false, error:action.payload}
      }
      case "USER_LOGOUT": {
        return {...state, logouting: true}
      }
      case "USER_LOGOUT_SUCCESS": {
        return {...state, logouting: false, logged: false, response:action.payload}
      }
      case "USER_LOGOUT_FAIL": {
        return {...state, logouting: false, error:action.payload}
      }
    }
    return state
}
