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

module.exports = {
  pause,
  play,
  mute,
  unmute,
  update
};
