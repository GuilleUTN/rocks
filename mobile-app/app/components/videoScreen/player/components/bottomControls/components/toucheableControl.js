import React, { Component } from 'react';
import { TouchableHighlight, StyleSheet } from 'react-native';
import * as controlsActions from '../../../../../../actions/controls';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

class TouchableControl extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <TouchableHighlight
        underlayColor="transparent"
        activeOpacity={0.3}
        onPress={() => {
          this.props.callback();
        }}
        style={this.props.styles}
      >
        {this.props.children}
      </TouchableHighlight>
    );
  }
}
function mapDispatchToProps(dispatch) {
  return {
    controlsActions: bindActionCreators(controlsActions, dispatch)
  };
}
export default connect(
  () => {
    return {};
  },
  mapDispatchToProps
)(TouchableControl);
