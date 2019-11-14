import React, { Component } from 'react';
import {
  App,
  Window,
  Text,
  TextInput,
  View,
  Picker,
  Button,
  Image,
} from '../../../../bin';
import * as Actions from '../actions';
import { sizeConsts, typeConsts } from '../consts';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

class Main extends Component {
  render() {
    return (
      <App>
        <Window>
          <View style={{ margin: 10, flex: 1 }}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'center',
                marginBottom: 10,
              }}
            >
              <Text style={{ fontSize: 45 }}>CatApi</Text>
            </View>
            <View style={{ flexDirection: 'row', marginBottom: 10 }}>
              <Text style={{ marginRight: 15, fontSize: 20 }}>ID</Text>
              <TextInput
                onChangeText={id => this.props.setId(id)}
                value={this.props.id}
                style={{ flex: 1 }}
              />
            </View>
            <View style={{ flexDirection: 'row', marginBottom: 10 }}>
              <Text style={{ marginRight: 15, fontSize: 20 }}>Size</Text>
              <Picker
                style={{ flex: 1 }}
                selectedValue={this.props.size}
                onValueChange={val => this.props.setSize(val)}
              >
                {sizeConsts.map((s, i) => (
                  <Picker.Item key={i} label={s} />
                ))}
              </Picker>
            </View>
            <View style={{ flexDirection: 'row', marginBottom: 10 }}>
              <Text style={{ marginRight: 15, fontSize: 20 }}>Type</Text>
              <Picker
                style={{ flex: 1 }}
                selectedValue={this.props.type}
                onValueChange={val => this.props.setType(val)}
              >
                {typeConsts.map((s, i) => (
                  <Picker.Item key={i} label={s} />
                ))}
              </Picker>
            </View>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'center',
                marginBottom: 10,
              }}
            >
              <Button onPress={() => this.props.search()} title="Submit" />
            </View>
            <View
              style={{
                flexDirection: 'row',
                marginBottom: 10,
              }}
            >
              <Text style={{ marginRight: 15, fontSize: 20 }}>URL</Text>
              <TextInput value={this.props.url} style={{ flex: 1 }} />
            </View>
            <View
              style={{
                marginBottom: 10,
                flex: 1,
              }}
            >
              <Image
                source={{
                  uri: this.props.url,
                }}
                style={{ flex: 1 }}
              />
            </View>
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
    size: state.size,
    type: state.type,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(Actions, dispatch);
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Main);
