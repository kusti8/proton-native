import React, { Component } from 'react';
import { VirtualText, RootText } from '../';

const TextAncestor = React.createContext(false);

export default class Text extends Component {
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
