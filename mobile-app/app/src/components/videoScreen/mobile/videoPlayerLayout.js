import React, { Component } from 'react';
import {
  TouchableWithoutFeedback,
  TouchableHighlight,
  StyleSheet,
  View,
  Dimensions
} from 'react-native';

/**
 * This object houses our styles. There's player
 * specific styles and control specific ones.
 * And then there's volume/seeker styles.
 */
let st = StyleSheet.create({
  container: {
    flex: 4,
    flexDirection: 'column',
    alignItems: 'center'
  },
  video: {
    flex: 1,
    backgroundColor: 'rgb(64, 80, 129)'
  },
  bottomControls: {
    flex: 1,
    backgroundColor: 'rgb(64, 80, 4)'
  }
});

class VideoPlayerLayout extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    console.log(st);
    return (
      <View style={st.container}>
        <View style={st.video} />
        <View style={st.bottomControls} />
      </View>
    );
  }
}

export default VideoPlayerLayout;
