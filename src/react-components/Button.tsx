import * as React from "react";
import { TouchableOpacity, Text } from "..";
import * as PropTypes from "prop-types";

interface Props {
  title: string;
  onPress: () => void;
  color: string;
}

export default class Button extends React.Component<Props, {}> {
  static defaultProps = {
    title: "",
    onPress: () => {},
    color: "#2196F3"
  };
  static propTypes = {
    title: PropTypes.string.isRequired,
    onPress: PropTypes.func.isRequired,
    color: PropTypes.string
  };
  render() {
    return (
      <TouchableOpacity
        onPress={this.props.onPress}
        style={{ ...styles.button, backgroundColor: this.props.color }}
      >
        <Text style={styles.text}>{this.props.title.toUpperCase()}</Text>
      </TouchableOpacity>
    );
  }
}

const styles = {
  button: {
    borderRadius: 2,
    justifyContent: "center",
    alignItems: "center",
    padding: 8
  },
  text: {
    color: "white",
    fontWeight: "500",
    fontSize: 18
  },
  buttonDisabled: {
    elevation: 0,
    backgroundColor: "#dfdfdf"
  },
  textDisabled: {
    color: "#a1a1a1"
  }
};
