import React, { Component } from 'react'
import { Text, StyleSheet, View, Dimensions } from 'react-native';
import { Video } from 'expo';
import { connect } from 'react-redux';

class VideoPlayerMobile extends Component {
  constructor(props){
    super(props)
  }
  render() {
      const { width } = Dimensions.get('window');
      return (
                    <Video
                      source={this.props.uri}
                      shouldPlay={this.props.video.paused}
                      resizeMode="contain"
                      style={{ width, height: 300 }}
                      isMuted={this.props.video.muted}
                      //onPlaybackStatusUpdate={this.handleStatusUpdate}
                    />
      );
    }
}

function mapStateToProps(state){
  return{
    video:state.video,
  }
}

export default connect(mapStateToProps,()=>{return{}})(VideoPlayerMobile)
