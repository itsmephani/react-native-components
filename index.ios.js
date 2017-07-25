import React, { Component } from 'react';
import {
  AppRegistry,
  Dimensions,
  StyleSheet,
  PanResponder,
  Text,
  View
} from 'react-native';

import Header from './app/components/header/header';
import SideBar from './app/components/sidebar/sidebar';

let pageX;
let isSideBarOpen = true;

export default class reactNativeComponents extends Component {
  constructor() {
    super();
    this.state = {
      isSideBarOpen: isSideBarOpen,
      drawerStyles: {}
    };
  }

  componentWillMount = () => {
    this.panResponder = PanResponder.create({
      onStartShouldSetPanResponder: (evt, gestureState) => true,
      onStartShouldSetPanResponderCapture: (evt, gestureState) => true,
      onMoveShouldSetPanResponder: (evt, gestureState) => true,
      onMoveShouldSetPanResponderCapture: (evt, gestureState) => true,
      onPanResponderGrant: (evt, gestureState) => {},
      onPanResponderMove: (evt, gestureState) => {
        let currentPageX = evt.nativeEvent.pageX;
         if (currentPageX > pageX) {
            isSideBarOpen = true;
         } else {
           isSideBarOpen = false;
         }

         if (this.state.isSideBarOpen != isSideBarOpen) {
          this.setState(state => {
            state.isSideBarOpen = isSideBarOpen;
            return state;
          });
         }
        pageX = currentPageX;
      },
      onPanResponderTerminationRequest: (evt, gestureState) => true,
      onPanResponderRelease: (evt, gestureState) => {},
      onPanResponderTerminate: (evt, gestureState) => {},
      onShouldBlockNativeResponder: (evt, gestureState) => {
        return true;
      },
    });
  }


  render() {
    return ( 
      <View style={styles.container}
            {...this.panResponder.panHandlers}>
        <SideBar isOpen={this.state.isSideBarOpen}>
        </SideBar>
        <Header></Header>
        <Text>Main</Text>
      </View>
    );
  }
}

const {height, width} = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#f2f4f7',
    flexDirection: 'column',
    height: height,
    position: 'relative',
    width: width,
  }
});

AppRegistry.registerComponent('reactNativeComponents', () => reactNativeComponents);
