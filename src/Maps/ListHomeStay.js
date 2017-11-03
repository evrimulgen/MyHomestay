import React, { Component } from 'react';
import {Platform,StyleSheet,Text,View,Dimensions,Image,Picker,TouchableOpacity
, FlatList} from 'react-native';
import Item_List_Homestay from './Item_List_Homestay'
var W = Dimensions.get('window').width;
var H = Dimensions.get('window').height;
export default class ListHomeStay extends Component {
  constructor(props){
    super(props);
     this.state = {
        name:'Đà Lạt',
        refresh:false,
        homestays : []
        };

  }
  refresh(){
   // this.setState({refresh:true});
  }
  render() {
    return (
      <View style={styles.container}>

        <View style={styles.header} >
            <TouchableOpacity style={styles.header_Left}
                onPress={()=>{
                        this.props.navigation.goBack()
                      }}
             >
                <Image
                        style = {styles.imgMenu}
                        source={require('../images/back.png')}/>
            </TouchableOpacity>

            <View style={styles.header_center} >
                <Text style={{color:'black',fontSize:H *0.03}} >{this.state.name}</Text>
            </View>

            <View style={styles.header_Right} >
                  
            </View>
        </View>

        <View style={styles.center}>
          <FlatList
           data={this.state.homestays}
           renderItem={({item}) => <Item_List_Homestay
            goToListRoom = {()=>{
                this.props.navigation.navigate('_ListRoom',{idHS: item.idHS,TenHS: item.TenHS, DienThoai:item.DienThoai, DiaChi: item.DiaChi, 
                  latitude: item.latitude,
                  longitude: item.longitude
                })
            }}
            TenHS = {item.TenHS}
            DiaChi = {item.DiaChi}
            urlHinh = {'http://10.1.129.132/homestayapp/upload/'+ item.UrlHinh}
           />}
           keyExtractor={item => item.idHS}
           numColumns={1}
           onRefresh={()=>this.refresh()}
           refreshing={this.state.refresh}
          />
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
            homestays: responseJson
          })
          console.log("++++++++++++++")
          console.log(responseJson)
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
    justifyContent:'center',
    alignItems:'center'
  },
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
