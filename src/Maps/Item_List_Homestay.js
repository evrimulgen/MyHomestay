import React, { Component } from 'react';
import { View,StyleSheet ,Image,Text,Dimensions,TouchableOpacity} from 'react-native';
var W = Dimensions.get('window').width;
var H = Dimensions.get('window').height;
export default class Item_List_Homestay extends Component {
    constructor(props){
        super(props);
        this.state={
            name:'Hoa Hồng',
            money:'250.000',
            swim:true
        }
    }
_Swim(){
        if(this.state.swim == true){
            return(
                <Image
                style={{width:W*0.05,height:W*0.05,}}
                 source={require('../images/swimming-pool.png')}
                />
            )
        }
        else
        return(
            <Text></Text>
        )
}
_Cooking(){
    if(this.state.swim == true){
        return(
            <Image
            style={{width:W*0.05,height:W*0.05,marginRight:W*0.02}}
             source={require('../images/cooking-pot.png')}
            />
        )
    }
    else
    return(
        <Text></Text>
    )
}
_Driving(){
    if(this.state.swim == true){
        return(
            <Image
            style={{width:W*0.05,height:W*0.05,marginRight:W*0.02,marginTop:H*0.015}}
             source={require('../images/motorcycle.png')}
            />
        )
    }
    else
    return(
        <Text></Text>
    )
}
_Rate(x){
    if(x == 0){
        return(
            <Image
                source={require('../images/Rate.jpg')}
            />
        )
    }
    if(x == 0.5){
        return(
            <Image
                source={require('../images/Rate.jpg')}
            />
        )
    }
    if(x == 1){
        return(
            <Image
                source={require('../images/Rate.jpg')}
            />
        )
    }
    if(x == 1.5){
        return(
            <Image
                 source={require('../images/Rate.jpg')}
            />
        )
    }
    if(x == 2){
        return(
            <Image
                source={require('../images/Rate.jpg')}
            />
        )
    }
    if(x == 2.5){
        return(
            <Image
                source={require('../images/Rate.jpg')}
            />
        )
    }
    if(x == 3){
        return(
            <Image
                source={require('../images/Rate.jpg')}
            />
        )
    }
    if(x == 3.5){
        return(
            <Image
                source={require('../images/Rate.jpg')}
            />
        )
    }
    if(x == 4){
        return(
            <Image
                source={require('../images/Rate.jpg')}
            />
        )
    }
    if(x == 4.5){
        return(
            <Image
                source={require('../images/Rate.jpg')}
            />
        )
    }
    if(x == 5){
        return(
            <Image
                source={require('../images/Rate.jpg')}
            />
        )
    }
}

    render() {
        return (
            <View style={styles.container} >
                <TouchableOpacity onPress={()=>{
                    this.props.goToListRoom()
                     }}
                >
                        <Image
                        source={{uri: this.props.urlHinh }}
                         style={styles.images}
                        />
                </TouchableOpacity>
                <View style={styles.detail} >
                    <View style={styles.detail_name} >
                        <View>
                              <Text style={styles.text_name} >{this.props.TenHS}</Text>
                        </View>
                        <View style={{flex:1,alignItems:'flex-end'}}>              
                        </View>
                    </View>

                    <View style={styles.detail_Rate}>
                       {this._Rate()}
                    </View>

                    <View style={styles.detail_location}>
                        
                        <Text style={styles.text_location}>{this.props.DiaChi}</Text>
                    </View>

                    <View style={styles.detail_type} >

                        <View style={styles.detail_type_}>
                              {this._Driving()}
                              {this._Cooking()}
                              {this._Swim()}
                        </View>
                    <View style={styles.detail_type_option} >
                        <TouchableOpacity onPress={()=>{alert('đổi thành đỏ ')}} >
                             <Image
                                source={require('../images/heart.png')}
                            />
                        </TouchableOpacity>
                    </View>

                    </View>
                </View>
            </View>
        );
    }
}
const styles = new StyleSheet.create({
    container:{
        height:H*0.2,
        justifyContent:'center',
        alignItems:'center',
        flexDirection:'row',
       backgroundColor:'white',
        borderBottomWidth:0.5,
        borderColor:'black',
    },
    images:{
        width: W*0.3,
        height:H*0.18,
        justifyContent:'center',
        alignItems:'center',
        borderRadius:2,
        margin:2
    },
    detail:{
        flex:1,
        width:W*0.51,
        height:H*0.19,
      //  borderRadius:5,
      //  borderWidth:0.1,
        borderColor:'black',
        margin:W*0.005,
        paddingLeft:W*0.02,
        paddingRight:W*0.02,
    },
    detail_name:{
        flex:1,
        flexDirection:'row'
    },
    detail_location:{
        flex:1,
        flexDirection:'row',
        alignItems:'flex-start',
        marginBottom: 20
      //  justifyContent:'flex-start'
    },
    detail_Rate:{
        flex:1
    },
    detail_type:{
        flex:2,
        flexDirection:'row',
        justifyContent:'flex-end',
        alignItems:'center',
    },
    detail_type_:{
        flex:1,
        flexDirection:'row',
        alignItems:'flex-end',
    },
    detail_type_option:{
        flex:1,
        justifyContent:'flex-end',
        alignItems:'flex-end',
    },
    text_name:{
        color:'black',
        fontSize:H*0.025,
    },
    text_location:{
        color:'grey',
        fontSize:H*0.02,
        textAlign:'center'
    },
    text_type:{
        color:'grey'
    }
})
