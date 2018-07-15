import React, { Component } from 'react';
import { Image, StyleSheet } from 'react-native';
import TouchableControl from './toucheableControl.js';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as videoActions from '../../../../../../actions/video';

const styles = {
  controls: StyleSheet.create({
    playPause: {
      flex: 2,
      zIndex: 0,
      paddingLeft: 16,
      paddingRight: 8,
      paddingTop: 16
    }
  })
};

class PlayPauseButton extends Component {
  constructor(props) {
    super(props);
  }
  togglePlayPause = () => {
    this.props.resetControlsTimeout();
    if (this.props.paused) {
      this.props.videoActions.play();
    } else {
      this.props.videoActions.pause();
    }
  };
  render() {
    const source =
      this.props.paused === true
        ? require('./assets/img/play.png')
        : require('./assets/img/pause.png');
    return (
      <TouchableControl
        children={<Image source={source} />}
        callback={this.togglePlayPause}
        styles={styles.controls.playPause}
      />
    );
  }
}

function mapStateToProps(state) {
  return {
    paused: state.video.paused,
    timer: state.controls.timer,
    timeout: state.controls.timeout
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
)(PlayPauseButton);
