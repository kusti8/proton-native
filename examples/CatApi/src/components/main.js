import React, { Component } from 'react';
import { App, Window, Text, TextInput, View } from '../../../../bin';
import * as Actions from '../actions';
import { sizeConsts, typeConsts } from '../consts';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

class Main extends Component {
  render() {
    return (
      <App>
        <Window>
          <View style={{ flexDirection: 'row' }}>
            <Text style={{ marginRight: 10 }}>ID</Text>
            <TextInput
              onValueChange={id => this.props.setId(id)}
              value={this.props.id}
            />
          </View>
          {/* <Box padded>
            <Form stretchy={false} padded>
              <TextInput
                stretchy={false}
                label="ID"
                onChange={id => this.props.setId(id)}
              />
              <Picker
                stretchy={false}
                label="Size"
                selected={sizeConsts.length - 1}
                onSelect={index => this.props.setSize(sizeConsts[index])}
              >
                {sizeConsts.map((s, i) => (
                  <Picker.Item key={i}>{s}</Picker.Item>
                ))}
              </Picker>
              <Picker
                stretchy={false}
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
            <TextInput stretchy={true} readOnly={true}>
              {this.props.url}
            </TextInput>
          </Box> */}
        </Window>
      </App>
    );
  }
}

function mapStateToProps(state, props) {
  return {
    url: state.url,
    id: state.id,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(Actions, dispatch);
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Main);
