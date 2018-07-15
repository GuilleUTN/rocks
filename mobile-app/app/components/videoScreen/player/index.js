import React, { Component } from 'react';
import {
  TouchableWithoutFeedback,
  TouchableHighlight,
  StyleSheet,
  View,
  Dimensions,
  Text
} from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as videoActions from '../../../actions/video';

import { Video } from 'expo';
import BottomControls from './components/bottomControls';

const styles = StyleSheet.create({
  container: {
    flex: 3,
    backgroundColor: '#000'
  },
  videoView: {
    flex: 1
  },
  video: {
    width: Dimensions.get('window').width,
    height: 300
  }
});

class VideoPlayer extends Component {
  constructor(props) {
    super(props);
  }
  statusUpdate = status => {
    this.props.videoActions.update(status);
  };
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.videoView}>
          <Video
            ref={ref => {
              this.props.videoActions.setRef(ref);
            }}
            source={require('../../../video/video.mp4')}
            shouldPlay={!this.props.paused}
            resizeMode="contain"
            style={styles.video}
            isMuted={this.props.muted}
            onPlaybackStatusUpdate={this.statusUpdate}
          />
        </View>
        <BottomControls
          resetControlsTimeout={this.props.resetControlsTimeout}
        />
      </View>
    );
  }
}
function mapStateToProps(state) {
  return {
    paused: state.video.paused,
    muted: state.video.muted
  };
}

function mapDispatchToProps(dispatch) {
  return {
    videoActions: bindActionCreators(videoActions, dispatch)
  };
}
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(VideoPlayer);
