import React, { Component } from 'react';
import {
  Platform, StyleSheet, Text, View, Dimensions, Image, Picker, TouchableOpacity
} from 'react-native';
var W = Dimensions.get('window').width;
var H = Dimensions.get('window').height;
import Swiper from 'react-native-swiper';

export default class Home extends Component<{}> {
  constructor(props){
    super(props);
     this.state = {
          city : '1'
        };
  }
  componentWillMount(){
     // var n=num.toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,")
     // console.log("+++++++++++" + n)
  }
  render() {
    return (
      <View style={{flex:1}}>
        <Swiper style={styles.wrapper}
          loop = {true}
          autoplay = {true}
          showsPagination = {false}
          >
          <View style={styles.slide}>
            <Image
            style = {{width: W, height:H}}
            source={require('../images/slide1.jpg')}
          />
          </View>
           <View style={styles.slide}>
            <Image
            style = {{width: W, height:H}}
            source={require('../images/slide1.jpg')}
          />
          </View>
          <View style={styles.slide}>
            <Image
            style = {{width: W, height:H}}
            source={require('../images/slide1.jpg')}
          />
          </View>
        </Swiper>
        <View style={styles.abs}>
            <View style={styles.header}>
              <TouchableOpacity style={styles.HLeft}
                onPress={()=>{
                  this.props.navigation.navigate('DrawerOpen');
                }}
              >
                <Image
                  style = {styles.imgMenu}
                  source={require('../images/menu.png')}/>
              </TouchableOpacity>
              <View style={styles.HRight}></View>
            </View>
            <View style={styles.main}>
              <View style={styles.searchContainer}>
                <View style={styles.searchContainerCenter}>
                    <View style={styles.sLeft}>
                      <Image
                        style = {styles.imgMap}
                        source={require('../images/map.png')}/>
                    </View>
                    <View style={styles.sCenter}>
                      <Picker
                        placeholder = 'abc'
                        selectedValue={this.state.city}
                        onValueChange={(itemValue, itemIndex) => this.setState({city: itemValue})}
                        mode = 'dialog'
                        >
                        <Picker.Item label="Đà Lạt" value= "1"/>
                        <Picker.Item label="Vũng Tàu" value= "2" />
                      </Picker>
                    </View>
                    <TouchableOpacity style={styles.sRight}
                      onPress={()=>{this.props.navigation.navigate('_MapsPage',{id: this.state.city})}}
                    >
                      <Image
                        style = {styles.imghomeSearch}
                        source={require('../images/homeSearch.png')}/>
                    </TouchableOpacity>
                </View>
              </View>
            </View>
        </View>
      </View>
    );
  }
}
var styles = StyleSheet.create({
  wrapper: {flex:1},
  slide: {flex: 1,justifyContent: 'center',alignItems: 'center',backgroundColor: '#9DD6EB',},
  text: {color: '#fff',fontSize: 30,fontWeight: 'bold',},
  abs: {position: 'absolute',width:W, height:H},
    header: {height: H*0.1,flexDirection:'row'},
      HLeft: {width: W * 0.2, height: H*0.1,justifyContent:'center',alignItems:'center'},
        imgMenu: {width: W * 0.08, height: W * 0.08},
      HRight: {width: W* 0.9, height: H*0.1},
    main: {height: H*0.9,alignItems:'center',marginTop: H*0.2},
      searchContainer:{width: W*0.9, height: H*0.07,backgroundColor:'white',justifyContent:'center'},
        searchContainerCenter:{width: W*0.9, height: H*0.055,flexDirection:'row'},
          sLeft:{width: W*0.1,height: H*0.055,justifyContent:'center',alignItems:'center'},
            imgMap:{width: W * 0.05, height: W *0.05},
          sCenter:{width: W*0.65,height: H*0.055,borderRightWidth:0.5, borderColor:'black',justifyContent:'center'},
          sRight:{width: W*0.15,height: H*0.055,justifyContent:'center',alignItems:'center'},
            imghomeSearch:{width: W * 0.06, height: W *0.06}
})