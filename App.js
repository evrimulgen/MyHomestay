/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */
// https://github.com/archriss/react-native-snap-carousel
// https://github.com/airbnb/react-native-maps
// https://github.com/leecade/react-native-swiper
// https://github.com/inProgress-team/react-native-youtube
import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import Root from './src/Root';


export default class App extends Component<{}> {
  render() {
    return (
       <Root />
    );
  }
}

