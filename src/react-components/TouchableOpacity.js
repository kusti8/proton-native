import React, { Component } from 'react';
import { View } from '../';
import PropTypes from 'prop-types';
import Color from 'color';

export default class TouchableOpacity extends Component {
  // TODO: Add animation
  pressedDown = false;
  startedTime = 0;
  state = {
    backgroundColor: this._getChildStyleOpacityWithDefault(),
  };
  static defaultProps = {
    activeOpacity: 0.2,
    style: {},
    onPress: () => {},
    onLongPress: () => {},
  };
  static propTypes = {
    activeOpacity: PropTypes.number,
    style: PropTypes.object,
    onPress: PropTypes.func,
    onLongPress: PropTypes.func,
  };
  _getChildStyleOpacityWithDefault() {
    return this.props.style.backgroundColor;
  }
  onDown() {
    this.pressedDown = true;
    this.startedTime = new Date().getTime();
    this.setState({
      backgroundColor: Color(this.props.style.backgroundColor)
        .alpha(this.props.activeOpacity)
        .string(),
    });
  }
  onUp() {
    if (this.pressedDown) {
      const diff = new Date().getTime() - this.startedTime;
      if (diff > 500) {
        this.props.onLongPress
          ? this.props.onLongPress()
          : this.props.onPress();
      } else {
        this.props.onPress();
      }
      this.pressedDown = false;
      this.setState({ backgroundColor: this.props.style.backgroundColor });
    }
  }
  render() {
    return (
      <View
        {...this.props}
        style={{ ...this.props.style, ...this.state }}
        onResponderGrant={() => this.onDown()}
        onResponderRelease={() => this.onUp()}
      >
        {this.props.children}
      </View>
    );
  }
}
