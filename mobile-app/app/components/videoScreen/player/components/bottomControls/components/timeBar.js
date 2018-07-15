import React, { Component } from 'react';
import { PanResponder, View, Text, StyleSheet } from 'react-native';
import TouchableControl from './toucheableControl.js';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as videoActions from '../../../../../../actions/video';
import * as controlsActions from '../../../../../../actions/controls';
import _ from 'lodash';

const styles = {
  seekbar: StyleSheet.create({
    container: {
      flex: 45,
      marginLeft: 8,
      marginRight: 20,
      marginTop: 9
    },
    track: {
      backgroundColor: '#333',
      height: 1,
      position: 'relative',
      top: 14
    },
    fill: {
      backgroundColor: '#FFF',
      height: 1,
      width: '100%'
    },
    handle: {
      position: 'absolute',
      marginLeft: -7,
      height: 28,
      width: 28
    },
    circle: {
      borderRadius: 12,
      position: 'relative',
      top: 8,
      left: 8,
      height: 12,
      width: 12
    }
  })
};
class TimeBar extends Component {
  constructor(props) {
    super(props);
    this.seekerWidth = 0;
    this.seekerFillWidth = 0;
    this.seekerOffset = 0;
    this.seekerPosition = 0;
    this.seeking = false;
    this.seekPanResponder = PanResponder;
    this.styles = { seekColor: { line: '#FFF', circle: '#FFF' } };
  }
  calculateSeekerPosition() {
    const percent = this.props.positionMillis / this.props.durationMillis;
    const position = this.seekerWidth * percent;
    return position;
  }
  setSeekerPosition(position = 0) {
    position = this.constrainToSeekerMinMax(position);
    this.seekerFillWidth = position;
    this.seekerPosition = position;
    if (!this.seeking) {
      this.seekerOffset = position;
    }
  }
  componentWillMount() {
    this.initSeekPanResponder();
  }
  constrainToSeekerMinMax(val = 0) {
    if (val <= 0) {
      return 0;
    } else if (val >= this.seekerWidth) {
      return this.seekerWidth;
    }
    return val;
  }
  calculateTimeFromSeekerPosition() {
    const percent = this.seekerPosition / this.seekerWidth;
    return this.props.durationMillis * percent;
  }
  initSeekPanResponder() {
    this.seekPanResponder = PanResponder.create({
      // Ask to be the responder.
      onStartShouldSetPanResponder: (evt, gestureState) => {
        return true;
      },
      onMoveShouldSetPanResponder: (evt, gestureState) => {
        return true;
      },

      /**
       * When we start the pan tell the machine that we're
       * seeking. This stops it from updating the seekbar
       * position in the onProgress listener.
       */
      onPanResponderGrant: (evt, gestureState) => {
        this.props.resetControlsTimeout();
        this.seeking = true;
        this.styles.seekColor.circle = '#F6B';
      },

      /**
       * When panning, update the seekbar position, duh.
       */
      onPanResponderMove: (evt, gestureState) => {
        const position = this.seekerOffset + gestureState.dx;
        this.setSeekerPosition(position);
      },

      /**
       * On release we update the time and seek to it in the video.
       * If you seek to the end of the video we fire the
       * onEnd callback
       */
      onPanResponderRelease: (evt, gestureState) => {
        const time = this.calculateTimeFromSeekerPosition();
        if (time >= this.props.durationMillis && !this.props.loading) {
          this.seekTo(this.props.durationMillis);
          this.props.videoActions.pause();
        } else {
          this.props.videoActions.goTo(this.props.videoRef, time);
          this.seeking = false;
        }
      }
    });
  }
  render() {
    const position = this.calculateSeekerPosition();
    this.setSeekerPosition(position);
    return (
      <View style={styles.seekbar.container}>
        <View
          style={styles.seekbar.track}
          onLayout={event => {
            this.seekerWidth = event.nativeEvent.layout.width;
          }}
        >
          <View
            style={[
              styles.seekbar.fill,
              {
                width: this.seekerFillWidth,
                backgroundColor:
                  this.props.seekColor || this.styles.seekColor.line
              }
            ]}
          />
        </View>
        <View
          style={[styles.seekbar.handle, { left: this.seekerPosition }]}
          {...this.seekPanResponder.panHandlers}
        >
          <View
            style={[
              styles.seekbar.circle,
              {
                backgroundColor:
                  this.props.seekColor || this.styles.seekColor.circle
              }
            ]}
          />
        </View>
      </View>
    );
  }
}

function mapStateToProps(state) {
  return {
    positionMillis: state.video.positionMillis,
    durationMillis: state.video.durationMillis,
    loading: state.video.isLoading,
    videoRef: state.video.ref
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
)(TimeBar);
