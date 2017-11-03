import React, { Component } from 'react';
import {Platform,StyleSheet,Text,View,Image,Dimensions,TouchableOpacity} from 'react-native';
import MapView from 'react-native-maps';
var t;
var W = Dimensions.get('window').width;
var H = Dimensions.get('window').height;
export default class MapsPage extends Component {
  constructor(props){
    super(props);
    t = this;
    this.state = {
           region:{
                latitude: 11.9506263,
                longitude: 108.4491903,
                latitudeDelta: 0.1,
                longitudeDelta: 0.1,
           },
           markers : [],
           filter : <View style={{height: H * 0.08, width: W *0.9,backgroundColor:'rgba(0, 0, 0, 0.01)'}}>
                        
                    </View>
      };
  }

  componentWillUnmount() {
    navigator.geolocation.clearWatch(this.watchID);
         }
    componentWillMount(){
        // GET LOCATION USER
        // navigator.geolocation.getCurrentPosition((position) => {
        //     this.setState({
        //          region:{
        //                 latitude: position.coords.latitude,
        //                 longitude: position.coords.longitude,
        //                 latitudeDelta: 0.01,
        //                 longitudeDelta: 0.01,
        //         }
        //     })
        // },
        //     (error) => alert(error.message),
        //     {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000}
        // )
    }
    _selectedMarker(id,dc,u){
        console.log('------' + id+ dc);
        this.setState({
          filter: 
             <View style={styles.fCenter}>
                      {/* //-------------Left------------ */}
                      <Image
                        style={styles.fCLeft}
                        source={{uri: 'http://10.1.129.132/homestayapp/upload/'+ u }}
                      />
                      {/* //-------------Center------------ */}
                      <View style={styles.fCCenter}>
                          <View style={styles.addressView}>
                            <Text style={styles.txtAddress}>{dc}</Text>
                          </View>
                          <View style={styles.nonameView}>   
                            <Image
                              style = {styles.imgNoname1}
                              source={require('../images/cooking-pot.png')}/>
                            <Image
                              style = {styles.imgNoname}
                              source={require('../images/swimming-pool.png')}/>
                            <Image
                              style = {styles.imgNoname}
                              source={require('../images/motorcycle.png')}/>
                          </View>
                      </View>
                      {/* //-------------Right------------ */}
                      <View style={styles.fCRight}>
                        <View style={styles.heart}>
                           <Image
                                style = {styles.imgHeart}
                                source={require('../images/heart.png')}/>
                        </View>
                      </View>

                    </View>
        })
      }
      _goToListRoom(e,f,x,z,g,h){
        t.props.navigation.navigate('_ListRoom',{idHS: e,TenHS:f, DienThoai:x, DiaChi:z,latitude: g, longitude:h })
        console.log("11111++++")
      }
  render() {
    return (
        <View style={styles.wrapper}>

             <MapView
                style={styles.wrapperMaps}
                initialRegion = {this.state.region}
                mapType = "standard"
              >

              {this.state.markers.map(function(o,i){            
                console.log(o.TenHS);
                 return (
                  <MapView.Marker
                    key = {i}
                    coordinate={{
                          latitude: parseFloat(o.latitude),
                          longitude: parseFloat(o.longitude),        
                    }}
                    title={o.TenHS}
                    description={o.MoTa}
                    image={require('../images/home.png')}
                    onPress ={()=>{t._selectedMarker(o.idHS,o.DiaChi,o.UrlHinh)}}
                    >
                    <MapView.Callout style={styles.calloutView}
                        onPress={()=>{
                          t._goToListRoom(o.idHS,o.TenHS,o.DienThoai,o.DiaChi,o.latitude,o.longitude)
                      }}
                    >
                    
                      <View style={styles.calloutViewCenter}>
                        <Text>{o.TenHS}</Text>
                      </View>

                     </MapView.Callout>
                </MapView.Marker> 
                 )
                })}
            </MapView> 

            <View style={styles.wrapperAbs}>
                  <View style={styles.header}>
                     <TouchableOpacity style={styles.HLeft}
                      onPress={()=>{
                        this.props.navigation.goBack()
                      }}
                     >
                      <Image
                        style = {styles.imgMenu}
                        source={require('../images/back.png')}/>
                    </TouchableOpacity>
                     <View style={styles.HContainer}>
                        
                    </View>
                    <View style={styles.HRight}>
                        <TouchableOpacity style={styles.HRightCenter}
                          onPress={()=>{
                            this.props.navigation.navigate('_ListHomeStay',{id:t.props.navigation.state.params.id})
                          }}
                        >
                          <Image
                              style = {styles.iconPanorama}
                              source={require('../images/list.png')}/>
                          <View style={styles.panoramaView}>
                            <Text style={styles.txtPanorama}>ListView</Text>
                          </View>
                        </TouchableOpacity>
                    </View>
                  </View>
                  <View  style={styles.container}></View>
                  <View style={styles.footer}>
                    {this.state.filter}
                  </View>
            </View>
        </View>
    );
  }
  componentDidMount(){
        fetch("http://10.1.129.132/homestayapp/homestay.php"
        ,{
          method : "POST",
          headers:{
            "Accept" : "application/json",
            "Content-Type" : "application/json"
          },
          body : JSON.stringify({
            "idTP" : parseInt(this.props.navigation.state.params.id)
           // "idTP" : 1,
          })
        }
      ).then((response)=>response.json())
      .then((responseJson)=>{

          this.setState({
            markers: responseJson
          })
      
      }).catch((error)=>{
        console.error(error);
      });
  }
}
var styles = StyleSheet.create({
  wrapper: {flex:1},
  wrapperMaps: {flex:1},
    calloutView: { flex:1,backgroundColor:'rgba(0, 0, 0, 0)',position:'relative',borderWidth:0.5,borderColor:'black' },
     // calloutViewCenter:{width: W*0.3,height:H*0.1,borderRadius:5,backgroundColor:'red'},
  wrapperAbs: {width:W,height:H,position: 'absolute'},
    header: {height: H*0.1,flexDirection:'row'},
      HLeft: {width: W * 0.2, height: H*0.1,justifyContent:'center',alignItems:'center'},
        imgMenu: {width: W * 0.08, height: W * 0.08},
      HContainer:{width: W*0.6,justifyContent:'center',alignItems:'center'},
      HRight: {width: W* 0.2, height: H*0.1,justifyContent:'center'},
        HRightCenter:{height: H*0.06,borderLeftWidth:0.5,borderColor:'black',justifyContent:'center',alignItems:'center'},
            iconPanorama:{width: H*0.03, height: H*0.03},
            txtPanorama:{fontSize:H*0.015,color:'black'},
    container:{height: H* 0.7},
    footer:{height: H * 0.2, alignItems:'center'},
      fCenter:{height: H * 0.08, width: W *0.9,flexDirection: 'row',backgroundColor:'white'},
        fCLeft:{width:W *0.15, height: H * 0.08},
        fCCenter:{width:W *0.6, height: H * 0.08},
          addressView:{height: H*0.04,justifyContent:'center'},
            txtAddress:{fontSize: H *0.018,color:'black',marginLeft: W*0.01},
          nonameView:{height: H*0.04,alignItems:'center',flexDirection:'row'},
            imgNoname:{width: H*0.025, height: H* 0.025, marginLeft: W*0.03},
            imgNoname1:{width: H*0.025, height: H* 0.025, marginLeft: W*0.01},
        fCRight:{width: W *0.15, height: H * 0.08,justifyContent:'center'},
          heart:{height: H *0.06,borderLeftWidth:0.5,borderColor:'black',justifyContent:'center',alignItems:'center'},
            imgHeart:{width:H *0.04, height: H *0.04},
})