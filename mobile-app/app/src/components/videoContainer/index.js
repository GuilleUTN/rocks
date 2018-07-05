import React, { Component } from 'react'
import { View, Text, FlatList, StyleSheet, Button, Platform } from 'react-native';

import VideoPlayerWeb from './web/videoPlayer'
import ControlBarWeb from './web/controlBar';

import VideoPlayerMobile from './mobile/videoPlayer'
import ControlBarMobile from './mobile/controlBar';

const video = require('../../video/video.mp4')

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  videoView: {
    flex: 10,
    backgroundColor: 'rgb(79, 195, 60)'
  },
  userControl: {
    flex: 14,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  }
});

class VideoContainer extends Component {
  constructor(props){
    super(props)
  }
  render() {
      if (Platform.OS==='web') {
            player = <VideoPlayerWeb uri={video}/>;
            controlBar = <ControlBarWeb/>;
      } else {
            player = <VideoPlayerMobile uri={video}/>;
            controlBar = <ControlBarMobile/>;
      }
      return (
          <View style={styles.container}>
            <View style={styles.videoView}>
              {player}
            </View>
              {controlBar}
            <View style={styles.userControl}>
              <Text>Controles</Text>
              </View>
          </View>
      );
    }
}


export default VideoContainer
