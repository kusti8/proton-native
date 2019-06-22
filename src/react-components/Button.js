import React, { Component } from 'react';
import { TouchableOpacity, Text, View } from '../';
import PropTypes from 'prop-types';

export default class Button extends Component {
  static defaultProps = {
    title: '',
    onPress: () => {},
    color: '#2196F3',
  };
  static propTypes = {
    title: PropTypes.string.isRequired,
    onPress: PropTypes.func.isRequired,
    color: PropTypes.string,
  };
  render() {
    return (
      <TouchableOpacity
        onPress={this.props.onPress}
        disabled={this.props.disabled}
      >
        <View style={{ ...styles.button, backgroundColor: this.props.color }}>
          <Text style={styles.text} disabled={this.props.disabled}>
            {this.props.title}
          </Text>
        </View>
      </TouchableOpacity>
    );
  }
}

const styles = {
  button: {
    elevation: 4,
    // Material design blue from https://material.google.com/style/color.html#color-color-palette
    backgroundColor: '#2196F3',
    borderRadius: 2,
  },
  text: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 8,
    color: 'white',
    fontWeight: '500',
    backgroundColor: 'red',
  },
  buttonDisabled: {
    elevation: 0,
    backgroundColor: '#dfdfdf',
  },
  textDisabled: {
    color: '#a1a1a1',
  },
};
