import { initialState } from '../store/initialState/controls';
export default function reducer(state = initialState, action) {
  switch (action.type) {
    case 'SHOW': {
      return { ...state, show: true };
    }
    case 'RESET_TIMEOUT': {
      return { ...state };
    }
    case 'SET_TIMEOUT': {
      return { ...state, timer: action.payload };
    }
    case 'HIDE': {
      return { ...state, show: false };
    }
    case 'BLOCK': {
      return { ...state, bloked: true };
    }
    case 'UNBLOCK': {
      return { ...state, bloked: false };
    }
  }
  return state;
}
