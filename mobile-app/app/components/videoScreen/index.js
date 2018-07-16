import React, { Component } from 'react';
import { View, StyleSheet, Button } from 'react-native';
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
    this.state = {
      mounted: false,
      controls: {
        timer: null,
        timeout: this.props.controlsTimeout || 5000
      }
    };
  }
  componentDidMount() {
    this.props.controlsActions.show();
    this.resetControlsTimeout();
    this.setState(previousState => {
      return { mounted: true };
    });
  }

  hideControls = () => {
    if (this.state.mounted && !this.props.controls.bloked) {
      this.props.controlsActions.hide();
    }
  };
  blockControls = () => {
    if (this.state.mounted) {
      this.props.controlsActions.block();
    }
  };
  unBlockControls = () => {
    if (this.state.mounted) {
      this.props.controlsActions.unBlock();
      if (this.props.controls.show) {
        this.resetControlsTimeout();
      }
    }
  };
  showControls = () => {
    if (this.state.mounted && !this.props.controls.bloked) {
      this.props.controlsActions.show();
      this.resetControlsTimeout();
    }
  };
  resetControlsTimeout = () => {
    this.clearControlTimeout();
    this.setControlTimeout();
  };
  clearControlTimeout() {
    this.setState(previousState => {
      clearTimeout(previousState.controls.timer);
      return {
        controls: {
          timer: null,
          timeout: previousState.controls.timeout
        }
      };
    });
  }
  setControlTimeout() {
    this.setState(previousState => {
      let controlsTimer = setTimeout(() => {
        this.hideControls();
      }, this.state.controls.timeout);
      return {
        controls: {
          timer: controlsTimer,
          timeout: previousState.controls.timeout
        }
      };
    });
  }
  render() {
    const showHideControls = this.props.controls.show ? (
      <Button title="ocultar controles" onPress={this.hideControls} />
    ) : (
      <Button title="mostrar controles" onPress={this.showControls} />
    );
    const blockControls = !this.props.controls.bloked ? (
      <Button title="bloquear controles" onPress={this.blockControls} />
    ) : (
      <Button title="desbloquear controles" onPress={this.unBlockControls} />
    );
    return (
      <View style={styles.container}>
        <VideoPlayer resetControlsTimeout={this.resetControlsTimeout} />
        <View style={styles.userControl}>
          {showHideControls}
          {blockControls}
        </View>
      </View>
    );
  }
}
function mapStateToProps(state) {
  const controls = {
    show: state.controls.show,
    bloked: state.controls.bloked
  };
  return {
    controls
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
