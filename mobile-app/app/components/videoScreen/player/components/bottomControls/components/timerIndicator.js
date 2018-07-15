import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import TouchableControl from './toucheableControl.js';
import _ from 'lodash';

const styles = {
  controls: StyleSheet.create({
    timer: {
      flex: 5,
      justifyContent: 'center'
    },
    timerText: {
      backgroundColor: 'transparent',
      color: '#FFF',
      fontSize: 11,
      textAlign: 'right'
    },
    control: {
      paddingLeft: 10,
      paddingTop: 15
    }
  })
};
class TimerIndicator extends Component {
  constructor(props) {
    super(props);
  }
  calculateTime = () => {
    let timeLabel = '';
    if (this.props.type == 'current') {
      timeLabel = this.formatTime(this.props.times.positionMillis);
    } else {
      timeLabel = `- ${this.formatTime(
        this.props.times.durationMillis - this.props.times.positionMillis
      )}`;
    }
    return timeLabel;
  };
  formatTime = (time = 0) => {
    time = Math.min(Math.max(time, 0), this.props.times.durationMillis) / 1000;
    const formattedMinutes = _.padStart(Math.floor(time / 60).toFixed(0), 2, 0);
    const formattedSeconds = _.padStart(Math.floor(time % 60).toFixed(0), 2, 0);
    return `${formattedMinutes}:${formattedSeconds}`;
  };
  render() {
    const timer = (
      <View styles={styles.controls.timer}>
        <Text style={styles.controls.timerText}>{this.calculateTime()} </Text>
      </View>
    );
    return (
      <TouchableControl
        children={timer}
        styles={[styles.controls.control, this.props.styles]}
      />
    );
  }
}

export default TimerIndicator;
