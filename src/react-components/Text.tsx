import * as React from "react";
import { VirtualText, RootText } from "..";
import * as PropTypes from "prop-types";

const TextAncestor = React.createContext(false);

export default class Text extends React.Component {
  static defaultProps = {
    style: {}
  };
  static propTypes = {
    style: PropTypes.object
  };
  render() {
    return (
      <TextAncestor.Consumer>
        {hasTextAncestor =>
          hasTextAncestor ? (
            <VirtualText {...this.props} />
          ) : (
            <TextAncestor.Provider value={true}>
              <RootText {...this.props} />
            </TextAncestor.Provider>
          )
        }
      </TextAncestor.Consumer>
    );
  }
}
