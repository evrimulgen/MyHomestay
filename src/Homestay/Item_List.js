import React, { Component } from 'react';
import { View,StyleSheet ,Image,Text,Dimensions,TouchableOpacity} from 'react-native';
var W = Dimensions.get('window').width;
var H = Dimensions.get('window').height;
export default class Item_List extends Component {
    constructor(props){
        super(props);
        this.state={
         
        }
    }
    
    render() {
        return (
            <View style={styles.container}>
                    <TouchableOpacity onPress ={()=>{this.props.goToDetails()}} >
                        <Image
                          source={{uri: this.props.urlRoom }}
                          style={styles.images}
                        />
                    </TouchableOpacity>
                <View style={styles.detail} >
                    <View style={styles.detail_name} >
                         <Text style={styles.text_name} >{this.props.nameRoom}</Text>
                    </View>

                    <View style={styles.detail_money}>
                        <Text style={styles.text_money} >{this.props.money.toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,")} VND</Text>
                    </View>

                    <View style={styles.detail_type}>
                        <Text>{this.props.typeRoom}</Text>
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
    //    backgroundColor:'rgba(0,0,0,0.1)' 
        borderBottomWidth:0.5,
        borderColor:'black',
    },
    images:{
        width: W*0.4,
        height:H*0.18,
        justifyContent:'center',
        alignItems:'center',
        borderRadius:5,
        margin:2
    },
    detail:{
        flex:1,
        width:W*0.51,
        height:H*0.19,
        borderRadius:5,
        borderWidth:0.1,
        borderColor:'black',
        margin:W*0.005,
        paddingLeft:W*0.02,
        paddingRight:W*0.02,
    },
    detail_name:{
        flex:1,

    },
    detail_money:{
        flex:1,

    },
    detail_type:{
        flex:2,
        justifyContent:'flex-end',
        alignItems:'flex-end'
    },
    text_name:{
        color:'black',
    },
    text_money:{
        color:'red'
    },
    text_type:{
        color:'grey'
    }
})
