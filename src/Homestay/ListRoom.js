import React, { Component } from 'react';
import {Platform,StyleSheet,Text,View,Dimensions,Image,Picker,TouchableOpacity
, FlatList} from 'react-native';
import Item_List from './Item_List'
var W = Dimensions.get('window').width;
var H = Dimensions.get('window').height;
export default class ListRoom extends Component {
  constructor(props){
    super(props);
     this.state = {
        name:'Đà Lạt Mộng Mơ ',
        refresh:false,
        data: []
        };
  }
  refresh(){
    this.setState({refresh:true});
  }
  render() {
    return (
      <View style={styles.container}>

        <View style={styles.header} >
            <View style={styles.header_Left} >
               <TouchableOpacity
                onPress= {()=>{this.props.navigation.goBack()}}
                style={styles.HLeft}>
                <Image
                  style = {styles.imgMenu}
                  source={require('../images/back.png')}/>
              </TouchableOpacity>
            </View>

            <View style={styles.header_center} >
                <Text style={{color:'black'}} >{this.state.name}</Text>
            </View>

            <View style={styles.header_Right} >
            </View>
        </View>
        
        <View style={styles.center}>
          <FlatList
           data={this.state.data}
           renderItem={({item}) => <Item_List
            goToDetails ={()=>{
              this.props.navigation.navigate('_Details',{idTT: item.idTT,TenPhong: item.TenPhong,
              TenHS: this.props.navigation.state.params.TenHS,
              DienThoai: this.props.navigation.state.params.DienThoai,
              DiaChi: this.props.navigation.state.params.DiaChi,
              GiaPhong: item.GiaPhong,
              latitude: this.props.navigation.state.params.latitude,
              longitude: this.props.navigation.state.params.longitude,
              typeRoom: item.LoaiPhong,
              })
            }}
            urlRoom = {'http://10.1.129.132/homestayapp/upload/details/'+ item.UrlHinh}
            nameRoom = {item.TenPhong}
            money = {item.GiaPhong}
            typeRoom = {item.LoaiPhong}
            item = {item}/>}
           numColumns={1}
           keyExtractor={item => item.idTT}
           //onRefresh={()=>this.refresh()}
           refreshing={this.state.refresh}
          />
        </View>

      </View>
    );
  }
  componentDidMount(){
        fetch("  http://10.1.129.132/homestayapp/homestaydsphong.php"
        ,{
          method : "POST",
          headers:{
            "Accept" : "application/json",
            "Content-Type" : "application/json"
          },
          body : JSON.stringify({
            "idHS" : parseInt(this.props.navigation.state.params.idHS)
           // "idTP" : 1,
          })
        }
      ).then((response)=>response.json())
      .then((responseJson)=>{

          this.setState({
            data: responseJson
          })
      
      }).catch((error)=>{
        console.error(error);
      });
  }
}
var styles = StyleSheet.create({
  container: {flex:1,backgroundColor:'white'},
  header:{
    height:H*0.1,
    flexDirection:'row',
  },
  center:{
    flex:1,
    height:H*0.9,
  //  justifyContent:'center',
  //  alignItems:'center'
  },
  header_Left:{
    width:W*0.2,
  },
  HLeft:{width: W * 0.2, height: H*0.1,justifyContent:'center',alignItems:'center'},
  imgMenu: {width: W * 0.08, height: W * 0.08},
  header_center:{
    width:W*0.6,
    borderBottomWidth:0.5,
    borderColor:'black',
    justifyContent:'center',
    alignItems:'center'
  },
  Text_Header:{
    color:'black',
    textAlign:'center',
    fontFamily: 'italic',
  }
,
header_Right:{
  width:W*0.3
}
})