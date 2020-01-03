import * as React from "react";
import * as PropTypes from "prop-types";

interface Props {
  onPress: () => void;
  onLongPress: () => void;
}

export default class TouchableWithoutFeedback extends React.Component<
  Props,
  {}
> {
  pressedDown = false;
  startedTime = 0;
  static defaultProps = {
    onPress: () => {},
    onLongPress: () => {}
  };
  static propTypes = {
    onPress: PropTypes.func,
    onLongPress: PropTypes.func
  };
  onDown() {
    this.pressedDown = true;
    this.startedTime = new Date().getTime();
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
    }
  }
  render() {
    const child = React.Children.only(this.props.children);
    let children = (child as any).props.children;
    return React.cloneElement(child as any, {
      onResponderGrant: () => this.onDown(),
      onResponderRelease: () => this.onUp(),
      children
    });
  }
}
