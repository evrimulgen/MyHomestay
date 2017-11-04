import React, { Component } from 'react';
import {Platform,StyleSheet,Text,View,Dimensions,Image,Picker,TouchableOpacity
, FlatList,Alert} from 'react-native';
var W = Dimensions.get('window').width;
var H = Dimensions.get('window').height;
// call number
import Communications from 'react-native-communications';
import { LoginButton, AccessToken, GraphRequestManager, GraphRequest } from 'react-native-fbsdk';
export default class Menu extends Component {
  constructor(props){
    super(props);
     this.state = {
            nameTitle: 'TravelStay',
            cover:''
        };
  }
  makeCall(){
    Alert.alert(
      'Thông Báo ',
      'Bạn có muốn thực hiện cuộc gọi?',
      [
        {text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
        {text: 'OK', onPress: () =>  Communications.phonecall('0962525359', true)},
      ],
      { cancelable: false }
    )
   
  }
  render() {
    return (
      <View style={styles.wrapper}>
          <View style={styles.header}>
            {/* <Image source={{uri:this.state.cover} }/> */}
            <Text style={{color:'white',fontSize:H*0.03}}>{this.state.nameTitle}</Text>
          </View>
          <View style={styles.container}>

            <View style={styles.itemsMenu}>
                  <View style={styles.itemsCenter}>
                    <View style={styles.iconMenu}>
                       <Image
                              style = {styles.icon}
                              source={require('../images/login.png')}/>
                    </View>
                    <View style={styles.txtMenu}>
                      {/* -------------------LOGIN FB-------------------------- */}
                      <LoginButton
                            style={styles.btnFB}
                            publishPermissions={["publish_actions"]}
                            onLoginFinished={
                              (error, result) => {
                                if (error) {
                                  {/* alert("login has error: " + result.error); */}
                                } else if (result.isCancelled) {
                                  {/* alert("login is cancelled."); */}
                                } else {
                                  AccessToken.getCurrentAccessToken().then(
                                    (data) => {
                                      let accessToken = data.accessToken;
                                      {/* alert(accessToken.toString()); */}
                                        console.log(accessToken.toString())
                                      const responseInfoCallback = (error, result) => {
                                        if (error) {
                                          console.log(error)
                                        
                                        } else {
                                          console.log(result)
                                          
                                        }
                                      }

                                      const infoRequest = new GraphRequest(
                                        '/me',
                                        {
                                          accessToken: accessToken,
                                          parameters: {
                                            fields: {
                                              string: 'email,name,first_name,middle_name,last_name,cover'
                                            }
                                          }
                                        },
                                        responseInfoCallback
                                      );
                                   //   this.setState({cover:infoRequest.cover.source})
                                      console.log('++++++++++',infoRequest.cover.source)
                                      // Start the graph request.
                                      new GraphRequestManager().addRequest(infoRequest).start();

                                    })
                                }
                              }
                            }
                      onLogoutFinished={() => console.log("logout.")}/>
                    </View>
                  </View>
            </View>
            <View style={styles.itemsMenu2}>
                <View style={styles.itemsCenter}>
                    <View style={styles.iconMenu}>
                       <Image
                              style = {styles.icon}
                              source={require('../images/search.png')}/>
                    </View>
                    <TouchableOpacity
                        onPress={()=>{this.props.navigation.navigate('_TienIch') }} 
                        style={styles.txtMenu}>
                      <Text style={{fontSize:H*0.025,marginLeft: W*0.02,color:'white'}}>Tìm kiếm tiện ích</Text>
                    </TouchableOpacity>
                </View>
            </View>
            <View style={styles.itemsMenu}>
              <View style={styles.itemsCenter}>
                  <View style={styles.iconMenu}>
                       <Image
                              style = {styles.icon}
                              source={require('../images/home-Menu.png')}/>
                  </View>
                  <View style={styles.txtMenu}>
                      <Text style={{fontSize:H*0.025,marginLeft: W*0.02,color:'black'}}>My Homestay</Text>
                  </View>
              </View>
            </View>
            <View style={styles.itemsMenu2}>
                <View style={styles.itemsCenter}>
                    <View style={styles.iconMenu}>
                       <Image
                              style = {styles.icon}
                              source={require('../images/call-filled-black.png')}/>
                    </View>
                    <View style={styles.txtMenu}>
                      <TouchableOpacity onPress={() => this.makeCall()}>
                          <Text style={{fontSize:H*0.025,marginLeft: W*0.02,color:'white'}}>Liên hệ</Text>
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
    wrapper: {flex:1,backgroundColor:'white'},
      header:{height:H*0.1,backgroundColor:'black',justifyContent:'center',alignItems:'center'},
      container:{height: H*0.9},
        borderStyle:{height: H*0.05},
        itemsMenu:{height: H*0.06,backgroundColor:'#bdc3c7',justifyContent:'center'},
        itemsMenu2:{height: H*0.06,backgroundColor:'#7f8c8d',justifyContent:'center'},
          itemsCenter:{height: H*0.05,flexDirection:'row'},
            iconMenu:{width: W*0.1,borderRightWidth:0.5,borderColor:'black',justifyContent:'center',alignItems:'center'},
              icon:{width: W*0.05, height: W*0.05},
            txtMenu:{width:W*0.9,justifyContent:'center'},
              btnFB: {width: W*0.4, height:H*0.05, backgroundColor:'black', marginLeft: W*0.07}

})