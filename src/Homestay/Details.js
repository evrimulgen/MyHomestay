import React, { Component } from 'react';
import {
  Platform,StyleSheet,Text,View,Dimensions,Image,Picker,TouchableOpacity,ScrollView
} from 'react-native';
var W = Dimensions.get('window').width;
var H = Dimensions.get('window').height;
import Swiper from 'react-native-swiper';
import YouTube from 'react-native-youtube';
var t;
export default class Details extends Component<{}> {
  constructor(props){
    super(props);
    t = this;
    this.state = {
            imgs : [],
            isReady: false,
            status: null,
            quality: null,
            error: null
    };
  }
  render() {
    return (
      <View style={{flex:1}}>
            <View style={styles.header}>
                     <TouchableOpacity
                      onPress= {()=>{this.props.navigation.goBack()}}
                      style={styles.HLeft}>
                      <Image
                        style = {styles.imgMenu}
                        source={require('../images/back.png')}/>
                    </TouchableOpacity>
                    <View style={styles.HContainer}>
                        <Text style={styles.txtRoom}>
                           {this.props.navigation.state.params.TenPhong}
                        </Text>
                    </View>
                    <View style={styles.HRight}>
                      <TouchableOpacity style={styles.HRightCenter}
                        onPress={()=>{
                          this.props.navigation.navigate('_PanoramaRoom')
                        }}
                      >
                        <Image
                            style = {styles.iconPanorama}
                            source={require('../images/3d-rotate.png')}/>
                        <View style={styles.panoramaView}>
                          <Text style={styles.txtPanorama}>Ảnh 360</Text>
                        </View>
                      </TouchableOpacity>
                    </View>
            </View>
            <ScrollView style={styles.container}>
                     <Swiper style={styles.images}
                            //loop = {true}
                            autoplay = {true}
                            showsPagination = {false}
                            
                            >
                            {this.state.imgs.map(function(o,i){            
                                return ( 
                                     <Image
                                        key = {i}
                                        style={styles.img}
                                        source={{uri: 'http://10.1.129.132/homestayapp/upload/details/'+ o.UrlHinh }}
                                    />
                                )
                        })}
                     </Swiper>
                     <View style={styles.info}>
                        <View style={styles.infoCenter}>
                            <View style={styles.name}>
                              <Text style={{color: 'black',fontSize: H*0.028}}>{this.props.navigation.state.params.TenHS}</Text>
                            </View>
                            <View style={styles.price}>
                              <Text style={{color: 'red',fontSize: H*0.025}}>{this.props.navigation.state.params.GiaPhong.toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,")} VND</Text>
                            </View>
                            <View style={styles.ad}>
                              <View style={styles.adLeft}>
                                 <Text style={{color: 'black',fontSize: H*0.024}}>{this.props.navigation.state.params.DiaChi}</Text>
                              </View>
                              <View style={styles.adRight}>
                              <TouchableOpacity onPress={()=>{this.props.navigation.navigate('_MapNavigate',{
                                latitude: this.props.navigation.state.params.latitude,
                                longitude: this.props.navigation.state.params.longitude
                              })}} >
                                 <Image
                                  style = {styles.imgMaps}
                                  source={require('../images/map.png')}/>
                              </TouchableOpacity>
                              </View>
                            </View>
                           <View style={{justifyContent:'center',alignContent:'center'}}>
                              <Text style={{color: 'gray',fontSize: H*0.02}}>Xem video phòng {this.props.navigation.state.params.TenPhong} >></Text>
                            </View>
                          <YouTube
                            videoId="Y29OrOVJUKs"   // The YouTube video ID
                            play={true}             // control playback of video with true/false
                            fullscreen={false}       // control whether the video should play in fullscreen or inline
                            loop={true}             // control whether the video should loop when ended
                            apiKey="AIzaSyBtYv3KXkQSxRxUCBqGVIAMnIfqKzmcUNc"
                            onReady={e => this.setState({ isReady: true })}
                            onChangeState={e => this.setState({ status: e.state })}
                            onChangeQuality={e => this.setState({ quality: e.quality })}
                            onError={e => this.setState({ error: e.error })}


                            style={{height: H*0.3,width:W*0.96,marginTop:H*0.02}}
                          />
                        </View>
                     </View>
            </ScrollView>
            <View style={styles.contact}>
              <View style={styles.contactCenter}>
                <View style={styles.contactLeft}>
                      <View style={styles.iconCall}>
                        <Image
                            style = {styles.imgCall}
                            source={require('../images/call-filled-white.png')}/>
                      </View>
                      <View style={styles.numberPhone}>
                        <Text style={{fontSize:H*0.025,color:'white'}}>{this.props.navigation.state.params.DienThoai}</Text>
                      </View>
                </View>
                <View style={styles.contactRight}>
                      <View style={styles.iconCall}>
                        <Image
                            style = {styles.imgCall}
                            source={require('../images/reservation.png')}/>
                      </View>
                      <View style={styles.numberPhone}>
                        <Text style={{fontSize:H*0.025,color:'white'}}>Đặt phòng</Text>
                      </View>
                </View>
              </View>
            </View>
      </View>
    );
  }
  componentDidMount(){
        fetch("http://10.1.129.132/homestayapp/homestaycthinh.php"
        ,{
          method : "POST",
          headers:{
            "Accept" : "application/json",
            "Content-Type" : "application/json"
          },
          body : JSON.stringify({
            "idTT" : parseInt(this.props.navigation.state.params.idTT)
          })
        }
      ).then((response)=>response.json())
      .then((responseJson)=>{
            t.setState({
                    imgs: responseJson
            })
      }).catch((error)=>{
        console.error(error);
      });
  }
}

var styles = StyleSheet.create({
  wrapper: {flex:1},
    header: {height: H*0.1,flexDirection: 'row'},
        HLeft:{width: W * 0.2, height: H*0.1,justifyContent:'center',alignItems:'center'},
             imgMenu: {width: W * 0.08, height: W * 0.08},
        HContainer:{width: W*0.6,borderBottomWidth:0.5,borderColor:'black',justifyContent:'center',alignItems:'center'},
            txtRoom:{color: 'black',fontSize: H *0.03},
        HRight:{width: W*0.2,justifyContent:'center'},
          HRightCenter:{height: H*0.06,borderLeftWidth:0.5,borderColor:'black',justifyContent:'center',alignItems:'center'},
            iconPanorama:{width: H*0.03, height: H*0.03},
            txtPanorama:{fontSize:H*0.015,color:'black'},
    container:{height: H*0.8},
        images:{height: H*0.3},
            img:{height: H * 0.3,width: W},
        //info:{height: H*0.5,alignItems:'center'},
          info:{height: H*0.56,alignItems:'center'},
          infoCenter:{width:W *0.96},
            name:{height: H*0.05,marginTop: H*0.02,justifyContent:'center'},
            price:{height: H*0.05,justifyContent:'center'},
            ad:{height: H*0.08,flexDirection:'row',},
              adLeft:{width: W*0.8,justifyContent:'center'},
              adRight:{width: W*0.16,borderLeftWidth:0.5,borderColor:'black',justifyContent:'center',alignItems:'center'},
                imgMaps:{width: W*0.08,height:W*0.08},
    contact:{height: H*0.1,backgroundColor:'black',justifyContent:'center'},  
      contactCenter:{height: H*0.08,flexDirection:'row'},
        contactLeft:{width: W*0.5,height:H*0.08,borderRightWidth:0.5,borderColor:'white',flexDirection:'row'},
          iconCall:{width: W*0.1,justifyContent:'center',alignItems:'center'},
            imgCall:{width:W*0.05,height:W*0.05},
          numberPhone:{width: W*0.4,justifyContent:'center',alignItems:'center'},
        contactRight:{width: W*0.5,height:H*0.08,flexDirection:'row'},
})