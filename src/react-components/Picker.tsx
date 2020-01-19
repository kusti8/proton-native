import * as React from "react";
import * as PropTypes from "prop-types";
import { PickerInternal } from "..";

class Picker extends React.Component {
  render() {
    const { children, ...props } = this.props;
    //@ts-ignore
    return <PickerInternal {...props}>{children}</PickerInternal>;
  }
}

class PickerItem extends React.Component {
  static defaultProps = {};
  static propTypes = {
    label: PropTypes.string.isRequired,
    value: PropTypes.string
  };
  render() {
    return null;
  }
}

//@ts-ignore
Picker.Item = PickerItem;
export default Picker;
