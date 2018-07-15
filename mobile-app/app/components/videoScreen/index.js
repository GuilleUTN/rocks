import React, { Component } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Button,
  Platform
} from 'react-native';
import VideoPlayer from './player';
import * as controlsActions from '../../actions/controls';
import * as videoActions from '../../actions/video';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

let styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column'
  },
  userControl: {
    flex: 4
  }
});

class VideoScreen extends Component {
  constructor(props) {
    super(props);
    this.mounted = true;
    this.controlsTimer = null;
    this.controlsTimeout = this.props.controlsTimeout || 5000;
  }
  componentDidMount() {
    this.props.controlsActions.show();
    this.resetControlsTimeout();
  }

  hideControls = () => {
    if (this.mounted && !this.props.controlsBLoked) {
      this.props.controlsActions.hide();
    }
  };
  blockControls = () => {
    if (this.mounted) {
      this.props.controlsActions.block();
    }
  };
  unBlockControls = () => {
    if (this.mounted) {
      this.props.controlsActions.unBlock();
      if (this.props.showControls) {
        this.resetControlsTimeout();
      }
    }
  };
  showControls = () => {
    if (this.mounted && !this.props.controlsBLoked) {
      this.props.controlsActions.show();
      this.resetControlsTimeout();
    }
  };
  /**
   * Reset the timer completely
   */
  resetControlsTimeout = () => {
    this.clearControlTimeout();
    this.setControlTimeout();
  };
  clearControlTimeout() {
    clearTimeout(this.controlsTimer);
  }
  setControlTimeout() {
    this.controlsTimer = setTimeout(() => {
      this.hideControls();
    }, this.controlsTimeout);
  }
  render() {
    const showHideControls = this.props.showControls ? (
      <Button title="ocultar controles" onPress={this.hideControls} />
    ) : (
      <Button title="mostrar controles" onPress={this.showControls} />
    );
    const blockControls = !this.props.controlsBLoked ? (
      <Button title="bloquear controles" onPress={this.blockControls} />
    ) : (
      <Button title="desbloquear controles" onPress={this.unBlockControls} />
    );
    const goToButtonInit = (
      <Button
        title="Ir al principio"
        onPress={() => {
          this.props.videoActions.goTo(this.props.videoRef, 0);
        }}
      />
    );
    const goToButtonMiddle = (
      <Button
        title="Ir al medio del video"
        onPress={() => {
          this.props.videoActions.goTo(
            this.props.videoRef,
            this.props.durationMillis / 2
          );
        }}
      />
    );
    return (
      <View style={styles.container}>
        <VideoPlayer resetControlsTimeout={this.resetControlsTimeout} />
        <View style={styles.userControl}>
          {showHideControls}
          {blockControls}
          {goToButtonInit}
          {goToButtonMiddle}
        </View>
      </View>
    );
  }
}
function mapStateToProps(state) {
  return {
    showControls: state.controls.show,
    controlsBLoked: state.controls.bloked,
    videoRef: state.video.ref,
    durationMillis: state.video.durationMillis
  };
}

function mapDispatchToProps(dispatch) {
  return {
    videoActions: bindActionCreators(videoActions, dispatch),
    controlsActions: bindActionCreators(controlsActions, dispatch)
  };
}
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(VideoScreen);
