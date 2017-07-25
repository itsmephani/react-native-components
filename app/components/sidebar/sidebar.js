import React, { Component } from 'react';
import {
  Animated,
  Easing,
  Dimensions,
  StyleSheet,
  Text,
  View
} from 'react-native';

const {height, width} = Dimensions.get('window');
const SIDEBAR_WIDTH = width/1.5;

export default class SideBar extends Component {

  state = {
    fadeAnim: new Animated.Value(-1 * SIDEBAR_WIDTH)
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.isOpen) {
      this.isOpen = true;
      this.animateSideBar_(0);
    } else {
      this.isOpen = false;
      this.animateSideBar_(-1 * SIDEBAR_WIDTH);
    }
  }

  isOpen() {
    return this.isOpen;
  }

  render() {
    const translationStyle = {transform: [{translateX: this.state.fadeAnim}]};

    return (
        <Animated.View
            style={StyleSheet.flatten([styles.container, translationStyle])}
            >
          <Text>SideBar</Text>
        </Animated.View>
    );
  }

  animateSideBar_(value) {
    Animated.timing(
      this.state.fadeAnim,
      {
        duration: 400,
        toValue: value
      }
    ).start(() => {
      this.state.fadeAnim.setValue(value);
    });
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fafafa',
    height: height,
    position: 'absolute',
    top: 0,
    transform: [{translateX: -1 * SIDEBAR_WIDTH}],
    width: SIDEBAR_WIDTH,
    zIndex: 2
  },
});
