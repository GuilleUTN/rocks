import axios from 'axios';

function show() {
  return function(dispatch) {
    dispatch({ type: 'SHOW' });
  };
}
function hide() {
  return function(dispatch) {
    dispatch({ type: 'HIDE' });
  };
}
function unBlock() {
  return function(dispatch) {
    dispatch({ type: 'UNBLOCK' });
  };
}
function block() {
  return function(dispatch) {
    dispatch({ type: 'BLOCK' });
  };
}
module.exports = {
  show,
  hide,
  unBlock,
  block
};
