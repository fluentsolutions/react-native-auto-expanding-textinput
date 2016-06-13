import React, { Component } from 'react';
import {
  View,
  StyleSheet,
  TextInput,
} from 'react-native';

import PureRenderMixin from 'react-addons-pure-render-mixin';

export default class AutoExpandingTextInput extends Component {

  constructor(props) {
    super(props);
    // initial state
    this.state = {
      height: this.props.minHeight,
      maxHeight: this.props.maxHeight || this.props.minHeight * 3
    };
    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
  }

  static propTypes = {
    onChangeHeight: React.PropTypes.func.isRequired,
    minHeight: React.PropTypes.number.isRequired,
    maxHeight: React.PropTypes.number
  };

  static defaultProps = {};

  componentWillReceiveProps(nextProps) {
    if (nextProps.value === '') {
      this.setState({
        height: this.props.minHeight
      });
    }
  }

  _onChange(event) {
    let curHeight = event.nativeEvent.contentSize.height;
    if (curHeight < this.props.minHeight || curHeight > this.state.maxHeight) return;

    if (this.state.height !== curHeight) {
      if (this.props.onChangeHeight) {
        this.props.onChangeHeight(this.state.height, curHeight);
      }
    }

    this.setState({
      height: curHeight
    });
  }

  render() {
    let tmpHeight = Math.min(this.state.maxHeight, this.state.height);
    return (
      <TextInput
        {...this.props}
        multiline={true}
        onChange={this._onChange.bind(this)}
        style={[styles.default, this.props.style, {height: tmpHeight}]}
      />
    );
  }
}

const styles = StyleSheet.create({
  default: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    justifyContent: 'center',
    textAlign: 'left'
  }
});
