import React, { Component } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Button,
  Platform
} from 'react-native';
import VideoPlayerMobile from './mobile/videoPlayerLayout';

let styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  },
  videoContainer: {
    flex: 3,
    backgroundColor: 'rgb(155, 221, 142)'
  },
  userControl: {
    flex: 4,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    width: '100%'
  }
});

class VideoScreen extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    if (Platform.OS === 'web') {
      player = <VideoPlayerMobile />;
    } else {
      player = <VideoPlayerMobile />;
    }
    return (
      <View style={styles.container}>
        {player}
        <View style={styles.userControl}>
          <Text>Control</Text>
        </View>
      </View>
    );
  }
}

export default VideoScreen;
