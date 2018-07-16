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
    this.state = {
      timeOffset: 0,
      panResponder: null,
      seeking: false,
      seekerWidth: 0,
      seekerColor: {
        line: '#FFF',
        circle: '#FFF'
      }
    };
    this.styles = styles;
  }
  position = () => {
    const time = this.props.positionMillis + this.state.timeOffset;
    return (time * this.state.seekerWidth) / this.props.durationMillis;
  };
  time = dx => {
    return (dx * this.props.durationMillis) / this.state.seekerWidth;
  };
  componentWillMount() {
    this.initSeekPanResponder();
  }
  initSeekPanResponder() {
    const panResponder = PanResponder.create({
      // Ask to be the responder.
      onStartShouldSetPanResponder: (evt, gestureState) => {
        this.props.resetControlsTimeout();
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
        this.setState(prevState => {
          return {
            seeking: true,
            seekerColor: {
              line: '#33a21c',
              circle: '#33a21c'
            }
          };
        });
      },

      /**
       * When panning, update the seekbar position, duh.
       */
      onPanResponderMove: (evt, gestureState) => {
        let time = this.time(gestureState.dx);
        if (time + this.props.positionMillis < this.props.durationMillis) {
          this.setState(prevState => {
            return { timeOffset: time };
          });
        }
      },

      /**
       * On release we update the time and seek to it in the video.
       * If you seek to the end of the video we fire the
       * onEnd callback
       */
      onPanResponderRelease: (evt, gestureState) => {
        const time = this.props.positionMillis + this.time(gestureState.dx);
        if (time < this.props.durationMillis) {
          this.props.goTo(time, () => {
            this.setState(prevState => {
              return { timeOffset: 0 };
            });
          });
          this.setState(prevState => {
            return {
              seeking: false,
              seekerColor: {
                line: '#FFF',
                circle: '#FFF'
              }
            };
          });
        } else {
          this.props.goTo(this.props.durationMillis, () => {
            this.setState(prevState => {
              return { timeOffset: 0 };
            });
            this.props.videoActions.pause();
          });
        }
      }
    });
    this.setState(prevState => {
      return { panResponder };
    });
  }
  render() {
    const position = this.position();
    return (
      <View style={styles.seekbar.container}>
        <View
          style={styles.seekbar.track}
          onLayout={event => {
            let width = event.nativeEvent.layout.width;
            this.setState(prevState => {
              return { seekerWidth: width };
            });
          }}
        >
          <View
            style={[
              styles.seekbar.fill,
              {
                width: position,
                backgroundColor:
                  this.props.seekColor || this.state.seekerColor.line
              }
            ]}
          />
        </View>
        <View
          style={[styles.seekbar.handle, { left: position }]}
          {...this.state.panResponder.panHandlers}
        >
          <View
            style={[
              styles.seekbar.circle,
              {
                backgroundColor:
                  this.props.seekColor || this.state.seekerColor.circle
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
    loading: state.video.isLoading
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
