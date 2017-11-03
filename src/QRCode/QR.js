import React, { Component } from 'react';
import { View,Text ,TextInput,StyleSheet,Dimensions} from 'react-native';
var W = Dimensions.get('window').width;
var H = Dimensions.get('window').height;

//QR Scaner
import QRCode from 'react-native-qrcode';

export default class QR extends Component {
constructor(props){
super(props);
this.state={
    text:'http://facebook.github.io/react-native/'
}
}
    render() {
        return (
            <View style={styles.container}>
                <View style={styles.Title} >
                    <Text style={styles.text}>Mã Nhận Phòng</Text>
                </View>
                <View style={styles.center} >
                    <QRCode
                        value={this.props.navigation.state.params.item}
                        size={200}
                        bgColor='black'
                        fgColor='white'/>
                </View>
            </View>
        );
    }
}
const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:'white',
    },
    center:{
        flex:10,
        justifyContent:'center',
         alignItems:'center',
    },
    Title:{
        flex:1,
        justifyContent:'center',
        alignItems:'center'
    },
    text:{
        textAlign:'center',
        fontSize:W*0.08,
        color:'black'
    }
})
