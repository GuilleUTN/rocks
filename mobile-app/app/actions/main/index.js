import axios from "axios";

function userLogin(userCredentials,dispatch) {
  return function(dispatch) {
    console.log(userCredentials)
    dispatch({type: "USER_LOGIN"});
    axios.get(`http://192.168.1.38:80/api/login`).then(response=>{
      dispatch({type: "USER_LOGING_SUCCESS",payload:response});
    }).catch(err=>{
      dispatch({type: "USER_LOGING_FAIL",payload:err});
    })
  }
}
function userLogout(dispatch) {
  return function(dispatch) {
    dispatch({type: "USER_LOGOUT"});
    axios.get(`http://192.168.1.38:80/api/logout`).then(response=>{
      dispatch({type: "USER_LOGOUT_SUCCESS",payload:response});
    }).catch(err=>{
      dispatch({type: "USER_LOGOUT_FAIL",payload:err});
    })
  }
}
module.exports={
  userLogin,
  userLogout
}
