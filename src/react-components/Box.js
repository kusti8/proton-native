import React, {Component} from 'react'
import {VerticalBox, HorizontalBox} from '../'

class Box extends Component {
    render() {
        const {vertical, children, ...otherProps} = this.props
        if (vertical !== false) {
            return (<VerticalBox {...otherProps}>{children}</VerticalBox>)
        } else {
            return (<HorizontalBox {...otherProps}>{children}</HorizontalBox>)
        }
    }
}

export default Box