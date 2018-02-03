import React, { Component } from 'react';

import { Window, Text, App } from './components/index'
import ReactDesktop from './render/index'

export default class A extends Component {
    render() {
        return (
            <App>
                <Window title="Hi" height={640} width={480} menuBar={true}>
                </Window>
                <Window title="Hi" height={640} width={480} menuBar={true}>
                </Window>
            </App>
        )
    }
}

ReactDesktop.render (<A/>)