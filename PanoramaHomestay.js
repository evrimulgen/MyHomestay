import React, { Component } from 'react';
import {
  WebView, StyleSheet, Text, View, Dimensions, Image, Picker, TouchableOpacity
} from 'react-native';
var W = Dimensions.get('window').width;
var H = Dimensions.get('window').height;
export default class PanoramaHomestay extends Component<{}> {
  constructor(props){
    super(props);
  }
  render() {
    return (
      <View style={{width:W, height:H}}>
           <View style={{flex:1}}>
               <WebView
                  startInLoadingState
                   source={{uri: 'http://10.1.129.132/panorama_viewer-master/demo/demo.html'}}
                />
           </View>
      </View>
    );
  }
}
var styles = StyleSheet.create({
  wrapper: {flex:1},
})