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
} from 'proton-native';
import * as Actions from '../actions';
import { sizeConsts, typeConsts } from '../consts';
import { connect } from 'react-redux/lib/alternate-renderers';
import { bindActionCreators } from 'redux';

class Main extends Component {
  render() {
    return (
      <App>
        <Window style={{ width: 600, height: 600 }}>
          <View style={{ margin: 10, flex: 1 }}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'center',
                marginBottom: 10,
              }}
            >
              <Text style={{ fontSize: 55 }}>CatApi</Text>
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

export default connect(mapStateToProps, mapDispatchToProps)(Main);
