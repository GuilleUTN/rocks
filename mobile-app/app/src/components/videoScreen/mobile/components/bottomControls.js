import React, { Component } from 'react';
import {
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
  Text
} from 'react-native';
const styles = {
  controls: StyleSheet.create({
    row: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      height: null,
      width: null
    },
    column: {
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'space-between',
      height: null,
      width: null
    },
    vignette: {
      resizeMode: 'stretch'
    },
    control: {
      padding: 16
    },
    text: {
      backgroundColor: 'transparent',
      color: '#FFF',
      fontSize: 14,
      textAlign: 'center'
    },
    pullRight: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center'
    },
    top: {
      flex: 1,
      alignItems: 'stretch',
      justifyContent: 'flex-start'
    },
    bottom: {
      alignItems: 'stretch',
      flex: 2,
      justifyContent: 'flex-end'
    },
    topControlGroup: {
      alignSelf: 'stretch',
      alignItems: 'center',
      justifyContent: 'space-between',
      flexDirection: 'row',
      width: null,
      margin: 12,
      marginBottom: 18
    },
    bottomControlGroup: {
      alignSelf: 'stretch',
      alignItems: 'center',
      justifyContent: 'space-between',
      marginLeft: 12,
      marginRight: 12,
      marginBottom: 0
    },
    volume: {
      flexDirection: 'row'
    },
    fullscreen: {
      flexDirection: 'row'
    },
    playPause: {
      position: 'relative',
      width: 80,
      zIndex: 0
    },
    title: {
      alignItems: 'center',
      flex: 0.6,
      flexDirection: 'column',
      padding: 0
    },
    titleText: {
      textAlign: 'center'
    },
    timer: {
      width: 80
    },
    timerText: {
      backgroundColor: 'transparent',
      color: '#e42626',
      fontSize: 11,
      textAlign: 'right'
    }
  })
};
class BottomControls extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showTimeRemaining: true
    };
    this.methods = {
      toggleTimer: this._toggleTimer.bind(this)
    };
    const initialValue = this.props.showOnStart ? 1 : 0;
    this.animations = {
      bottomControl: {
        marginBottom: new Animated.Value(0),
        opacity: new Animated.Value(initialValue)
      },
      topControl: {
        marginTop: new Animated.Value(0),
        opacity: new Animated.Value(initialValue)
      },
      video: {
        opacity: new Animated.Value(1)
      },
      loader: {
        rotate: new Animated.Value(0),
        MAX_VALUE: 360
      }
    };
  }
  _toggleTimer() {
    let state = this.state;
    state.showTimeRemaining = !state.showTimeRemaining;
    this.setState(state);
  }
  renderNullControl() {
    return <View style={[styles.control]} />;
  }

  renderControl(children, callback, style = {}) {
    return (
      <TouchableHighlight
        underlayColor="transparent"
        activeOpacity={0.3}
        onPress={() => {
          this.resetControlTimeout();
          callback();
        }}
        style={[styles.controls.control, style]}
      >
        {children}
      </TouchableHighlight>
    );
  }

  renderTimer() {
    return this.renderControl(
      <Text style={styles.controls.timerText}>{this.props.time}</Text>,
      this.methods.toggleTimer,
      styles.controls.timer
    );
  }

  render() {
    const timerControl = this.props.disableTimer
      ? this.renderNullControl()
      : this.renderTimer();
    return (
      <View>
        <Text>Esto es un texto.</Text>
      </View>
    );
  }
}
export default BottomControls;

/*
<Animated.View
  style={[
    styles.controls.bottom,
    {
      opacity: this.animations.bottomControl.opacity,
      marginBottom: this.animations.bottomControl.marginBottom
    }
  ]}
>
  <ImageBackground
    source={Expo.Asset.fromModule(
      require('./assets/img/bottom-vignette.png')
    )}
    style={[styles.controls.column]}
    imageStyle={[styles.controls.vignette]}
  >
    <View
      style={[styles.controls.row, styles.controls.bottomControlGroup]}
    >
      {timerControl}
    </View>
  </ImageBackground>
</Animated.View>
*/
