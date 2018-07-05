import React, { Component } from 'react'
import { StyleSheet, View, Text, Dimensions} from 'react-native';

import { connect } from 'react-redux';
import { bindActionCreators } from "redux";

import * as videoActions from "../../../actions/video";

const styles = StyleSheet.create({
  baseLine: {
    position:"relative",
    top:0,
    height: 6,
    alignSelf: 'stretch',
    backgroundColor: "rgb(96, 157, 221)",
  },
  baseLineUp: {
    position:"relative",
    top:-4,
    height: 2,
    alignSelf: 'stretch',
    backgroundColor: "rgb(11, 114, 199)",
  }
});


class TimeLine extends Component {
  constructor(props){
    super(props)
  }
  render() {
      return (
        <View>
          <View style={styles.baseLine}>
          </View>
          <View style={styles.baseLineUp}>
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

export default connect(mapStateToProps,mapDispatchToProps)(TimeLine)
