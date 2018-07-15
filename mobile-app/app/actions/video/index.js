import axios from 'axios';

function pause() {
  return function(dispatch) {
    dispatch({ type: 'PAUSE_VIDEO' });
  };
}
function play() {
  return function(dispatch) {
    dispatch({ type: 'PLAY_VIDEO' });
  };
}
function mute() {
  return function(dispatch) {
    dispatch({ type: 'MUTE_VIDEO' });
  };
}
function unmute() {
  return function(dispatch) {
    dispatch({ type: 'UNMUTE_VIDEO' });
  };
}
function update(status) {
  return function(dispatch) {
    dispatch({ type: 'UPDATE_VIDEO', payload: status });
  };
}
function goTo(ref, time) {
  return function(dispatch) {
    ref.setPositionAsync(time).then(status => {
      dispatch({ type: 'UPDATE_VIDEO', payload: status });
    });
  };
}
function setRef(ref) {
  return function(dispatch) {
    dispatch({ type: 'SET_REF', payload: ref });
  };
}
module.exports = {
  pause,
  play,
  mute,
  unmute,
  update,
  goTo,
  setRef
};
