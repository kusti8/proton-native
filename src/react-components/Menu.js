import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { MenuBar, MenuBarItem } from '../';

class Menu extends Component {
  render() {
    const { children, ...otherProps } = this.props;
    return React.createElement(MenuBar, otherProps, children);
  }
}

Menu.Item = class Item extends Component {
  render() {
    const { children, ...otherProps } = this.props;
    return React.createElement(MenuBarItem, otherProps, children);
  }
};

export default Menu;
