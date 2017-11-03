import React, { Component } from 'react';
import {
  Platform,StyleSheet,Text,View,Dimensions,Image,Picker,TouchableOpacity,ScrollView
} from 'react-native';
var W = Dimensions.get('window').width;
var H = Dimensions.get('window').height;
export default class Welcome extends Component<{}> {
  constructor(props){
    super(props);
    this.state = {
         
    };
  }
  render() {
    return (
    <Image
        style = {{width: W, height: H}}
        source={require('../images/SlideHome.jpg')}/>
    );     
  }
componentDidMount(){
    setTimeout(()=>{ this.props.navigation.navigate('_Home')},3000)
}

}

var styles = StyleSheet.create({
  
})