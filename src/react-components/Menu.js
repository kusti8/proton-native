import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { MenuBar, MenuBarItem } from '../';

class Menu extends Component {
  render() {
    const { children, ...otherProps } = this.props;
    return <MenuBar {...otherProps}>{children}</MenuBar>;
  }
}

Menu.Item = class Item extends Component {
  render() {
    const { children, ...otherProps } = this.props;
    return <MenuBarItem {...otherProps}>{children}</MenuBarItem>;
  }
};

export default Menu;
