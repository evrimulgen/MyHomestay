import React, { Component } from 'react';
import { View,StyleSheet ,Image,Text,Dimensions,TouchableOpacity,WebView} from 'react-native';
var W = Dimensions.get('window').width;
var H = Dimensions.get('window').height;
export default class PanoramaRoom extends Component {
    constructor(props){
        super(props);
        this.state={
         
        }
    }
    render() {
        return (
            <View style={styles.wrapper}>
                <View style={styles.webView}>
                    <WebView
                        startInLoadingState
                        source={{uri: 'http://10.1.129.132/homestayapp/upload/pano/SocTiHon.jpg'}}
                    />
                </View>
                <View style={styles.abs}>
                     <View style={styles.header}>
                        <View style={styles.HLeft}></View>
                        <TouchableOpacity style={styles.HRight}
                            onPress={()=>{
                                this.props.navigation.goBack()
                            }}
                        >
                            <Image
                                style = {styles.imgMenu}
                                source={require('../images/cancel.png')}/>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.container}></View>
                </View>
            </View>
        );
    }
}
const styles = new StyleSheet.create({
      wrapper: {flex:1,backgroundColor:'#2ecc71'},
        webView:{flex:1},
        abs:{flex:1, position: 'absolute'},
            header: {height: H*0.1,flexDirection:'row'},
                HLeft: {width: W* 0.8, height: H*0.1},
                HRight: {width: W * 0.2, height: H*0.1,justifyContent:'center',alignItems:'center'},
                    imgMenu: {width: W * 0.08, height: W * 0.08},
            container:{height: H* 0.7},
})  
