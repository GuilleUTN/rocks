import React, { Component } from 'react'
import { View, Text, FlatList, StyleSheet, Button, Alert } from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from "redux";
import { LoginButton } from 'react-native-fbsdk';
import * as mainActions from "../actions/main";

const styles = StyleSheet.create({
  container: {
   flex: 1,
   justifyContent: 'center',
  },
  buttonContainer: {
    margin: 20
  },
  alternativeLayoutButtonContainer: {
    margin: 20,
    flexDirection: 'row',
    justifyContent: 'space-between'
  }
})

class Main extends Component {
  constructor(props){
    super(props)
  }
  render() {
    let loggingText=this.props.logging?"Loggeando":""
    let user=this.props.logged?"Guillermo":""
    return (
      <View style={styles.container}>
         <Text>
          Bienvenido {user} a RockBall con log
         </Text>
         <View style={styles.buttonContainer}>
         <Button
           onPress={() => {
             this.props.mainActions.userLogin('guillermo');
           }}
           title="Iniciar sesion en la App"
         />
         <LoginButton
          publishPermissions={["email"]}
          onLoginFinished={
            (error, result) => {
              if (error) {
                Alert.alert("Login failed with error: " + error.message);
              } else if (result.isCancelled) {
                Alert.alert("Login was cancelled");
              } else {
                Alert.alert("Login was successful with permissions: " + result.grantedPermissions)
              }
            }
          }
          onLogoutFinished={() => alert("User logged out")}/>
         </View>
         <View style={styles.buttonContainer}>
           <Button
             onPress={() => {
               this.props.mainActions.userLogout();
             }}
             title="Logout"
           />
         </View>
         <Text>
           Esta es la version 0.0.1 {loggingText}
         </Text>
       </View>
    );
  }
}

function mapStateToProps(state){
  return{
    logging:state.main.logging,
    logged:state.main.logged,
    response:state.main.response
  }
}

//to map actions in object props
function mapDispatchToProps(dispatch){
  return{
    mainActions:bindActionCreators(mainActions,dispatch)
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(Main)
