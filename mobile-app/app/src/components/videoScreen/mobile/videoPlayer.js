import React, { Component } from 'react';
import {
  TouchableWithoutFeedback,
  TouchableHighlight,
  ImageBackground,
  PanResponder,
  StyleSheet,
  Touchable,
  Animated,
  Platform,
  Easing,
  Image,
  View,
  Text,
  Dimensions
} from 'react-native';
import { Video } from 'expo';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as videoActions from '../../../actions/video';

import BottomControls from './components/bottomControls';
/**
 * This object houses our styles. There's player
 * specific styles and control specific ones.
 * And then there's volume/seeker styles.
 */
const styles = {
  player: StyleSheet.create({
    container: {
      backgroundColor: '#000',
      flex: 1,
      alignSelf: 'stretch',
      justifyContent: 'space-between'
    },
    video: {
      overflow: 'hidden',
      position: 'relative',
      top: 0,
      right: 0,
      bottom: 0,
      left: 0,
      width: Dimensions.get('window').width,
      height: 300
    }
  })
};

class VideoPlayerMobile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      video: {
        currentTime: 100
      }
    };
    this.styles = {
      videoStyle: this.props.videoStyle || {},
      containerStyle: this.props.style || {}
    };
    this.events = {
      onScreenTouch: this._onScreenTouch.bind(this)
    };
    this.actions = {
      toggleReproduction: this._toggleReproduction.bind(this)
    };
  }
  _onScreenTouch() {
    this.actions.toggleReproduction();
  }
  _toggleReproduction = () => {
    if (this.props.video.paused) {
      this.props.videoActions.play();
    } else {
      this.props.videoActions.pause();
    }
  };
  render() {
    return (
      <TouchableWithoutFeedback
        onPress={this.events.onScreenTouch}
        style={[styles.player.container, this.styles.containerStyle]}
      >
        <View style={[styles.player.container, this.styles.containerStyle]}>
          <Video
            source={this.props.uri}
            shouldPlay={!this.props.video.paused}
            resizeMode="contain"
            style={styles.player.video}
            isMuted={this.props.video.muted}
            onPlaybackStatusUpdate={this.printState}
          />
          <BottomControls time={10} disableTimer={false} />
        </View>
      </TouchableWithoutFeedback>
    );
  }
}

function mapStateToProps(state) {
  return {
    video: state.video
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
)(VideoPlayerMobile);

/*  */
