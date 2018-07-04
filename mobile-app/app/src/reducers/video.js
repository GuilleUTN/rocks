import {initialState} from "../store/initialState/video"
export default function reducer(state=initialState, action) {
    switch (action.type) {
      case "PAUSE_VIDEO": {
        return {...state, paused: true}
      }
      case "PLAY_VIDEO": {
        return {...state, paused: false}
      }
      case "MUTE_VIDEO": {
        return {...state, muted: true}
      }
      case "UNMUTE_VIDEO": {
        return {...state, muted: false}
      }
    }
    return state
}
