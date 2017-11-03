import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
} from 'react-native';
import Home from './Home/Home';
import {SlideMenu} from './Router'
export default class Root extends Component<{}> {
  render() {
    return (
        <SlideMenu />
    );
  }
}