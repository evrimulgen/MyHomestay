import React, { Component } from 'react';
import {Platform,StyleSheet,Text,View,Dimensions,Image,Picker,TouchableOpacity
, FlatList} from 'react-native';
var W = Dimensions.get('window').width;
var H = Dimensions.get('window').height;
import { LoginButton, AccessToken, GraphRequestManager, GraphRequest } from 'react-native-fbsdk';
export default class Menu extends Component {
  constructor(props){
    super(props);
     this.state = {

        };
  }
  render() {
    return (
      <View style={styles.wrapper}>
          <View style={styles.header}>
            <Text style={{color:'white'}}>Logo HomestayVN</Text>
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
                                              string: 'email,name,first_name,middle_name,last_name,birthday,mobile_phone'
                                            }
                                          }
                                        },
                                        responseInfoCallback
                                      );
                                      console.log('++++++++++',infoRequest)
                                      // Start the graph request.
                                      new GraphRequestManager().addRequest(infoRequest).start();

                                    })
                                }
                              }
                            }
                      onLogoutFinished={() => alert("logout.")}/>
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
                    <TouchableOpacity onPress={this.props.navigation.navigate('_TienIch') } >
                    <View style={styles.txtMenu}>
                      <Text style={{fontSize:H*0.025,marginLeft: W*0.02,color:'white'}}>Tìm kiếm tiện ích</Text>
                    </View>
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
                              source={require('../images/map.png')}/>
                    </View>
                    <View style={styles.txtMenu}>
                      <Text style={{fontSize:H*0.025,marginLeft: W*0.02,color:'white'}}>Liên hệ</Text>
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