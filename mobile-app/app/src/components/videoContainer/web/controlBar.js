import React, { Component } from 'react'
import { StyleSheet, View, Dimensions, Button, Text } from 'react-native';

import { connect } from 'react-redux';
import { bindActionCreators } from "redux";

import * as videoActions from "../../../actions/video";

const styles = StyleSheet.create({
  controlBar: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    width:Dimensions.get('window').width
  }
});

class ControlBar extends Component {
  constructor(props){
    super(props)
  }
 handlePauseOrPlay = () =>{
   if(this.props.paused){
     this.props.videoActions.play()
   }else{
     this.props.videoActions.pause()
   }
 }
 handleMuteOrUnmuted = () =>{
   if(this.props.muted){
     this.props.videoActions.unmute()
   }else{
     this.props.videoActions.mute()
   }
 }
  render() {
      return (
        <View style={styles.controlBar}>
          <Button
            title={this.props.muted ? "SONIDO" : "SILENCIO"}
            onPress={this.handleMuteOrUnmuted}
          />
        <Button
            title={this.props.paused ? "PLAY" : "STOP"}
            onPress={this.handlePauseOrPlay}
          />
        </View>
      );
    }
}

function mapStateToProps(state){
  return{
    paused:state.video.paused,
    muted:state.video.muted,
  }
}

//to map actions in object props
function mapDispatchToProps(dispatch){
  return{
    videoActions:bindActionCreators(videoActions,dispatch)
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(ControlBar)
