import * as React from "react";
import { View } from "..";
import * as PropTypes from "prop-types";
import * as Color from "color";

interface Props {
  activeOpacity: number;
  underlayColor: string;
  style: React.CSSProperties;
  onPress: () => void;
  onLongPress: () => void;
}

interface State {
  extraChildStyle: object | null;
  extraUnderlayStyle: object | null;
}

export default class TouchableHighlight extends React.Component<Props, State> {
  // TODO: Add animation
  pressedDown = false;
  startedTime = 0;
  state = {
    extraChildStyle: null,
    extraUnderlayStyle: null
  };
  static defaultProps = {
    activeOpacity: 0.85,
    underlayColor: "black",
    style: {},
    onPress: () => {},
    onLongPress: () => {}
  };
  static propTypes = {
    activeOpacity: PropTypes.number,
    underlayColor: PropTypes.string,
    style: PropTypes.object,
    onPress: PropTypes.func,
    onLongPress: PropTypes.func
  };
  onDown() {
    this.pressedDown = true;
    this.startedTime = new Date().getTime();
    const child = React.Children.only(this.props.children);
    this.setState({
      extraChildStyle: {
        backgroundColor: Color((child as any).props.style.backgroundColor)
          .alpha(this.props.activeOpacity)
          .string()
      },
      extraUnderlayStyle: {
        backgroundColor: this.props.underlayColor
      }
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
        style={{
          ...this.props.style,
          ...(this.state.extraUnderlayStyle || {})
        }}
        onResponderGrant={() => this.onDown()}
        onResponderRelease={() => this.onUp()}
      >
        {React.cloneElement(child as any, {
          style: {
            ...(child as any).props.style,
            ...(this.state.extraChildStyle || {})
          }
        })}
      </View>
    );
  }
}
