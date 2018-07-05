import React, { Component } from 'react'
import { StyleSheet, View, Dimensions, Slider } from 'react-native';
import { MaterialIcons, Octicons } from '@expo/vector-icons';

import { connect } from 'react-redux';
import { bindActionCreators } from "redux";

import * as videoActions from "../../../actions/video";
import TimeLine from "./timeLine";


const styles = StyleSheet.create({
  controlBar: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    width:Dimensions.get('window').width
  },
  slide: {
    flex: 10,
  },
  leftControls: {
    flex: 5,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  },
  rigthControls: {
    flex: 5,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
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
        <View style={styles.rigthControls}>

        <MaterialIcons
          name={this.props.muted ? "volume-up" : "volume-mute"}
          size={25}
          color="white"
          onPress={this.handleMuteOrUnmuted}
        />
        </View>

          <View style={styles.slide}>
          <TimeLine
          ></TimeLine>
          </View>
          <View style={styles.leftControls}>
          <MaterialIcons
            name={this.props.paused ? "pause" : "play-arrow"}
            size={20}
            color="white"
            onPress={this.handlePauseOrPlay}
          />
          </View>
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
