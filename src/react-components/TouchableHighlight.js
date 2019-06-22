import React, { Component } from 'react';
import { View } from '../';
import PropTypes from 'prop-types';
import Color from 'color';

export default class TouchableHighlight extends Component {
  // TODO: Add animation
  pressedDown = false;
  startedTime = 0;
  state = {
    extraChildStyle: null,
    extraUnderlayStyle: null,
  };
  static defaultProps = {
    activeOpacity: 0.85,
    underlayColor: 'black',
    style: {},
    onPress: () => {},
    onLongPress: () => {},
  };
  static propTypes = {
    activeOpacity: PropTypes.number,
    underlayColor: PropTypes.string,
    style: PropTypes.object,
    onPress: PropTypes.func,
    onLongPress: PropTypes.func,
  };
  onDown() {
    this.pressedDown = true;
    this.startedTime = new Date().getTime();
    const child = React.Children.only(this.props.children);
    this.setState({
      extraChildStyle: {
        backgroundColor: Color(child.props.style.backgroundColor)
          .alpha(this.props.activeOpacity)
          .string(),
      },
      extraUnderlayStyle: {
        backgroundColor: this.props.underlayColor,
      },
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
      this.setState({ extraChildStyle: null, extraUnderlayStyle: null });
    }
  }
  render() {
    const child = React.Children.only(this.props.children);
    return (
      <View
        {...this.props}
        style={{ ...this.props.style, ...this.state.extraUnderlayStyle }}
        onResponderGrant={() => this.onDown()}
        onResponderRelease={() => this.onUp()}
      >
        {React.cloneElement(child, {
          style: {
            ...child.props.style,
            ...this.state.extraChildStyle,
          },
        })}
      </View>
    );
  }
}
