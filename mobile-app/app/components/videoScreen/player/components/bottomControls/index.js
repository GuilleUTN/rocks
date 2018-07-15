import React, { Component } from 'react';
import { Text, View, StyleSheet, Animated } from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PlayPauseButton from './components/playPauseButton.js';
import TimerIndicator from './components/timerIndicator.js';
import TimeBar from './components/timeBar.js';

const styles = StyleSheet.create({
  row: {
    flex: 1,
    flexDirection: 'row'
  },
  bottomControlsGroup: {
    height: 50,
    position: 'relative'
  }
});

class BottomControls extends Component {
  constructor(props) {
    super(props);
    this.animations = {
      marginBottom: new Animated.Value(0),
      opacity: new Animated.Value(0)
    };
  }
  render() {
    if (this.props.show) {
      this.showControlAnimation();
    } else {
      this.hideControlAnimation();
    }
    return (
      <Animated.View
        style={[
          styles.bottomControlsGroup,
          {
            opacity: this.animations.opacity,
            marginBottom: this.animations.marginBottom
          }
        ]}
      >
        <View style={styles.row}>
          <PlayPauseButton
            resetControlsTimeout={this.props.resetControlsTimeout}
          />
          <TimerIndicator
            times={{
              durationMillis: this.props.video.durationMillis,
              positionMillis: this.props.video.positionMillis
            }}
            type={'current'}
          />
          <TimeBar
            loading={false}
            resetControlsTimeout={this.props.resetControlsTimeout}
          />
          <TimerIndicator
            times={{
              durationMillis: this.props.video.durationMillis,
              positionMillis: this.props.video.positionMillis
            }}
            type={'remaining'}
            styles={{ paddingLeft: 5, paddingRight: 10 }}
          />
        </View>
      </Animated.View>
    );
  }
  hideControlAnimation() {
    Animated.parallel([
      Animated.timing(this.animations.opacity, {
        toValue: 0,
        duration: 1000
      }),
      Animated.timing(this.animations.marginBottom, {
        toValue: -50,
        duration: 1000
      })
    ]).start();
  }
  showControlAnimation() {
    Animated.parallel([
      Animated.timing(this.animations.opacity, {
        toValue: 1,
        duration: 1000
      }),
      Animated.timing(this.animations.marginBottom, {
        toValue: 0,
        duration: 1000
      })
    ]).start();
  }
}

function mapStateToProps(state) {
  const video = {
    durationMillis: state.video.durationMillis,
    positionMillis: state.video.positionMillis
  };
  return {
    show: state.controls.show,
    video
  };
}

function mapDispatchToProps(dispatch) {
  return {};
}
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(BottomControls);
