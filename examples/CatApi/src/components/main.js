import React, { Component } from 'react';
import {
  App,
  Window,
  Box,
  Form,
  TextInput,
  Picker,
  Button,
  Text,
} from 'proton-native';
import * as Actions from '../actions';
import { sizeConsts, typeConsts } from '../consts';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

class Main extends Component {
  render() {
    return (
      <App>
        <Window
          title="CatApi (Patent Pending)"
          size={{ h: 500, w: 500 }}
          menuBar={false}
          margined
        >
          <Box padded>
            <Form stretchy={false} padded>
              <TextInput label="ID" onChange={id => this.props.setId(id)} />
              <Picker
                label="Size"
                selected={sizeConsts.length - 1}
                onSelect={index => this.props.setSize(sizeConsts[index])}
              >
                {sizeConsts.map((s, i) => (
                  <Picker.Item key={i}>{s}</Picker.Item>
                ))}
              </Picker>
              <Picker
                label="Type"
                selected={0}
                onSelect={index => this.props.setType(typeConsts[index])}
              >
                {typeConsts.map((s, i) => (
                  <Picker.Item key={i}>{s}</Picker.Item>
                ))}
              </Picker>
            </Form>
            <Button
              onClick={() => {
                this.props.search();
              }}
              stretchy={false}
            >
              Submit
            </Button>
            <TextInput readOnly={true}>{this.props.url}</TextInput>
          </Box>
        </Window>
      </App>
    );
  }
}

function mapStateToProps(state, props) {
  return {
    url: state.url,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(Actions, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Main);
