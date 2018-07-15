import { combineReducers } from 'redux';
import video from './video';
import controls from './controls';

export default combineReducers({
  video,
  controls
});
