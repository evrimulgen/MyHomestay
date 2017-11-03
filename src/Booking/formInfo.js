import React, { Component } from 'react';
import {Platform,StyleSheet,Text,View,Dimensions,ScrollView,TextInput,Image,Picker,TouchableOpacity,Alert
, FlatList} from 'react-native';
var W = Dimensions.get('window').width;
var H = Dimensions.get('window').height;
export default class formInfo extends Component {
  constructor(props){
    super(props);
     this.state = {
        titleHeader:'Điền thông tin của bạn',
        info:{
          name:'',
          email:'',
          phonenumber:'',
          cmnd:'',
          datecome:'',
          dateleave:'',
          slnguoi:'',
          homestay:{
            roomName:this.props.navigation.state.params.TenPhong,
            typeRoom:this.props.navigation.state.params.TypeRoom  ,
            money:this.props.navigation.state.params.GiaPhong
          }
        },
        json_Info:'',
        object:''
        };
  }
_Confirm(){
  Alert.alert(
    'Xác Nhận ',
    'Xác nhận đặt phòng?',
    [
      {text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
      {text: 'OK', onPress: () => {this.props.navigation.navigate('_QR',{item: this.state.json_Info,})}},
    ],
    { cancelable: false }
  )
}  
_Json(){
  
const obj = JSON.stringify(this.state.info);
this.setState({
  json_Info: obj,
})

}
_Obj(){
  var obj = JSON.parse(this.state.json_Info);
  this.setState({
    object: obj,
  })
  
  }
  render() {
    return (
      <View style={styles.container}>

        <View style={styles.header} >
            <View style={styles.header_Left} >
              <TouchableOpacity onPress={()=>{this.props.navigation.goBack()}} >
                <Image
                    source={require('../images/back.png')}
                 />
              </TouchableOpacity>
            </View>

            <View style={styles.header_center} >
               <Text style={styles.Text_Header} >{this.state.titleHeader}</Text>
            </View>

            <View style={styles.header_Right} >
            </View>
        </View>
        
        <View style={styles.center}>
                <ScrollView>
                    <View style={styles.textinput} >
                        <TextInput
                         placeholder='Họ & Tên' 
                         onChangeText={(text) => this.setState({info:{...this.state.info,name:text}})}
                         value={this.state.info.name}
                         />
                    </View>
                    <View style={styles.textinput} >
                    <TextInput
                         placeholder='Địa chỉ email' 
                         onChangeText={(text) => this.setState({info:{...this.state.info,email:text}})}
                         value={this.state.info.email}
                         />
                    </View>
                    <View style={styles.textinput} >
                    <TextInput
                         placeholder='Số điện thoại' 
                         onChangeText={(text) => this.setState({info:{...this.state.info,phonenumber:text}})}
                         value={this.state.info.phonenumber}
                         />
                    </View>
                    <View style={styles.textinput} >
                    <TextInput
                         placeholder='CMND or hộ chiếu' 
                         onChangeText={(text) => this.setState({info:{...this.state.info,cmnd:text}})}
                         value={this.state.info.cmnd}
                         />
                    </View> 
                    <View style={styles.textinput2} >
                        <View style={{flex:1}}>
                            <TextInput
                            placeholder='Ngày nhận phòng' 
                            onChangeText={(text) => this.setState({info:{...this.state.info,datecome:text}})}
                            value={this.state.info.datecome}
                            />
                         </View>
                         <View style={{flex:1}}>
                         <TextInput
                         placeholder='Ngày trả phòng' 
                         onChangeText={(text) => this.setState({info:{...this.state.info,dateleave:text}})}
                         value={this.state.info.dateleave}
                         />
                      </View>
                    </View> 
                    <View style={styles.textinput} >
                    <TextInput
                         placeholder='Số lượng người' 
                         onChangeText={(text) => this.setState({info:{...this.state.info,slnguoi:text}})}
                         value={this.state.info.slnguoi}
                         />
                    </View>
                    <View style={styles.reviewHomestay} >
                      <View style= {{flexDirection:'row', justifyContent:'space-around'}}>
                          <View style={{flex:1 ,marginLeft:W*0.03, marginTop:W*0.03}} >
                              <Text>Phòng:</Text>
                          </View>
                          <View style={{flex:1,alignItems:'flex-end', marginTop:W*0.03,marginRight:W*0.02}}>
                              <Text>{this.props.navigation.state.params.TenPhong}</Text>
                          </View>
                      </View>                    
                      <View style= {{flexDirection:'row', justifyContent:'space-around'}}>
                          <View style={{flex:1 ,marginLeft:W*0.03, marginTop:W*0.03}} >
                              <Text>Loại phòng:</Text>
                          </View>
                          <View style={{flex:1,alignItems:'flex-end', marginTop:W*0.03,marginRight:W*0.02}}>
                              <Text>{this.props.navigation.state.params.TypeRoom}</Text>
                          </View>
                      </View>
                      <View style= {{flexDirection:'row', justifyContent:'space-around'}}>
                          <View style={{flex:1 ,marginLeft:W*0.03, marginTop:W*0.03}} >
                              <Text>Ngày nhân phòng:</Text>
                          </View>
                          <View style={{flex:1,alignItems:'flex-end', marginTop:W*0.03,marginRight:W*0.02}}>
                              <Text>{this.state.info.datecome}</Text>
                          </View>
                      </View>
                      <View style= {{flexDirection:'row', justifyContent:'space-around'}}>
                          <View style={{flex:1 ,marginLeft:W*0.03, marginTop:W*0.03}} >
                              <Text>Ngày trả phòng:</Text>
                          </View>
                          <View style={{flex:1,alignItems:'flex-end', marginTop:W*0.03,marginRight:W*0.02}}>
                              <Text>{this.state.info.dateleave}</Text>
                          </View>
                      </View>
                      <View style= {{flexDirection:'row', justifyContent:'space-around'}}>
                          <View style={{flex:1 ,marginLeft:W*0.03, marginTop:W*0.03}} >
                              <Text>Giá tiền:</Text>
                          </View>
                          <View style={{flex:1,alignItems:'flex-end', marginTop:W*0.03,marginRight:W*0.02}}>
                              <Text>{this.props.navigation.state.params.GiaPhong}</Text>
                          </View>
                      </View>
                    </View>  
                    <View style={styles.btnBooking}>       
                      <TouchableOpacity onPress={()=>{this._Json(), this._Confirm()}}>                 
                          <Text style={styles.textBooking} >Đặt phòng</Text>        
                       </TouchableOpacity>
                    </View>    
                </ScrollView>
                
                     {/* button convert string to Json */}
                    {/* <TouchableOpacity onPress={()=>{this._Obj() ,alert('Convert')}}>
                    <View style={styles.btnBooking}> 
                        
                          <Text style={styles.textBooking} >Convert</Text>        
                    </View>
                    </TouchableOpacity> */}
        </View>

      </View>
    );
}
}
var styles = StyleSheet.create({
  container: {
    flex:1,
    backgroundColor:'white'
  },
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
    fontFamily: 'Cochin',
    fontWeight: 'bold',
  }
,
header_Right:{
  width:W*0.3
},
 textinput:{
 //width:W*0.9,
 justifyContent:'space-around',
 paddingLeft:W*0.08,
 paddingRight:W*0.08,
 paddingTop:W*0.08
},
textinput2:{
flexDirection:'row',
justifyContent:'center',
paddingLeft:W*0.03,
paddingRight:W*0.03,
paddingTop:W*0.08

},
btnBooking:{
  marginRight:W*0.3,
  marginLeft:W*0.3,
  marginTop:W*0.2,
  backgroundColor:'black',
  justifyContent:'center',
  alignItems:'center',
  padding:10,
  borderRadius:10,
  marginBottom:W*0.2
},
textBooking:{
  color:'white'
},
reviewHomestay:{
 height:H/3,
 marginTop:W*0.1,
 borderWidth:1,
 borderColor:'black',
 margin:W*0.01,
 borderRadius:5,
},
reviewLeft:{
  flex:1,
   borderRightWidth:1,
   borderColor:'rgba(0,0,0,0.2)',
   marginBottom:W*0.03,
   marginTop:W*0.03
  }
,
reviewRight:{
  flex:1,
  marginBottom:W*0.03,
  marginTop:W*0.03
}
})