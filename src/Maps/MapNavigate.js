import React, { Component } from 'react';
import {Platform, StyleSheet, Text, View, Dimensions,Image,Alert} from 'react-native';
import MapView from 'react-native-maps';
var W = Dimensions.get('window').width;
var H = Dimensions.get('window').height;

const mode = 'driving'; //'walking';
const APIKEY = 'AIzaSyDCfvhVZ4NtOZYVWhSMPGQUv9cZ0_Vfl6E';
//const url = 'https://maps.googleapis.com/maps/api/directions/json?origin='+this.state.origin+'&destination='+destination+'&key='+APIKEY+'&mode='+mode;
//const url = 'https://maps.googleapis.com/maps/api/directions/json?origin=Hồ Chí Minh&destination=Tan+An,+Long+An,+Viet+Nam&key=AIzaSyD9Qs7IPmEYsxCH3mG54GIJj_GUSuyJv-g'

export default class MapNavigate extends Component{
  constructor(props){
    super(props);
     this.state = {
        initalRegion:{
                latitude:0,
                longitude:  0,
                latitudeDelta: 0.01,
                longitudeDelta: 0.01,
           },
           coords:'',
           distances:{
               distance:{
                text:'0',
                value:'0'
               },
               duration:{
                text:'0',
                value:'0' 
               }
           },
           origin : '',
           destination : '10.408588147232294 , 107.13517494499682',
           makerPosition:{
               latitude:0,
               longitude:0,
           },
           x:{
            latitude:0,
            longitude:0, 
            latitudeDelta: 0.01,
            longitudeDelta: 0.01,

        }
        }

    }
Get_Road(){
    url = 'https://maps.googleapis.com/maps/api/directions/json?origin='+this.state.origin+'&destination='+this.state.destination+'&key='+APIKEY+'&mode='+mode;
    fetch(url)
    .then(response => response.json())
    .then(responseJson => {
        if (responseJson.routes.length) {
            this.setState({
                coords: this.decode(responseJson.routes[0].overview_polyline.points) 

            });  
          //  this.getLocation();    
        }
    }).then(responseJson =>{
        this.getLocation()
    }).catch(e => {console.warn(e)});
}
decode(t,e){
    for(var n,o,u=0,l=0,r=0,d= [],h=0,i=0,a=null,c=Math.pow(10,e||5);u<t.length;)
    {
        a=null,
        h=0,
        i=0;
        do a=t.charCodeAt(u++)-63,
        i|=(31&a)<<h,
        h+=5;
        while(a>=32);
        n=1&i?~(i>>1):i>>1,
        h=i=0;
        do a=t.charCodeAt(u++)-63,
        i|=(31&a)<<h,
        h+=5;
        while(a>=32);
        o=1&i?~(i>>1):i>>1,
        l+=n,
        r+=o,
        d.push([l/c,r/c])
    }
    return d=d.map(
        function(t){
            return{
                latitude:t[0],
                longitude:t[1]
            }
        }
    )

}
  getLocation(){
    
    var ar = this.state.coords.length;
        try {
            this.setState({
                x:{
                    ...this.state.x,
                    latitude:this.state.coords[ar-1].latitude,
                    longitude:this.state.coords[ar-1].longitude
                }
              })
          } catch (error) {
          }  
         
  }
Get_Distance(){
    url='https://maps.googleapis.com/maps/api/distancematrix/json?origins='+this.state.origin+'&destinations='+this.state.destination+'&key='+APIKEY
    fetch(url)
    .then(response => response.json())
    .then(responseJson => {
        if (responseJson.rows[0].elements[0].duration !=null){
            try {
                this.setState({distances:responseJson.rows[0].elements[0]}) 
             } catch (error) {
                
             }
        }       
        console.log(responseJson.rows[0].elements[0].duration)
    })
    .catch(e => {console.warn(e)});
}
 watchID : ?number = null
GPS(){
    navigator.geolocation.getCurrentPosition((position) => {
        var lat = parseFloat(position.coords.latitude);
        var long = parseFloat(position.coords.longitude);

        var initalRegion = {
            latitude: lat,
            longitude: long ,
            latitudeDelta:0.0922,
            longitudeDelta: W/H,
        }
        this.setState({initalRegion:initalRegion});
        this.setState({makerPosition:initalRegion})

        this.setState({origin:+initalRegion.latitude+','+initalRegion.longitude })
    },
        (error) => console.log(error.message),
        {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000})
        
        this.watchID = navigator.geolocation.watchPosition((position) => {
            var lat = parseFloat(position.coords.latitude)
            var long = parseFloat(position.coords.longitude)
       
            var lastRegion = {
                latitude: lat,
                longitude: long,
                latitudeDelta:0.0922,
                longitudeDelta: W/H,
            }
            this.setState({initalRegion: lastRegion})
            this.setState({makerPosition:lastRegion})
            this.setState({origin:+lastRegion.latitude+','+lastRegion.longitude })
            this.Get_Road();
            this.Get_Distance();
        })
}
getHomestay(){
    this.setState({destination:+ this.props.navigation.state.params.latitude+','+ this.props.navigation.state.params.longitude});
}
    componentWillMount(){  
   //    navigator.geolocation.clearWatch(this.watchID);
  //     this.getLocation();  
    this.getHomestay();
    }
    componentWillUnmount() {
      navigator.geolocation.clearWatch(this.watchID);
           }


        

componentDidMount(){  
  //  console.log('+++++++++++');


 


  this.GPS();
//console.log(this.state.distance.distance);
 
 }
  render() {
    return (
        <View style={{flex:1}}>              
         <MapView 
               style={styles.map}
               showsScale
               followUserLocation={true}
               showsUserLocation={true}
               showsCompass={true}
               showsBuildings
               showsTraffic
               cacheEnabled={true}
               showsScale
               region={this.state.initalRegion}
                style={{flex:1}}
                mapType = "standard"
               
            >
            <MapView.Marker coordinate={this.state.x} 
                 title={'Homestay'}
                  description={'THU HÀ'}
                  image={require('../images/home.png')}
                >
                <MapView.Callout style={{ flex: 1, position: 'relative' }}>
                 
                    <Text >Hello</Text>
        
                </MapView.Callout>
            </MapView.Marker> 
            
            <MapView.Polyline
                coordinates={[
                // optional
                ...this.state.coords,
                  // optional
                     ]}
                strokeWidth={5}
                strokeColor='blue'
            />
        </MapView> 
        <View style={styles.Container} >
            <View style={styles.Distance} >
                <View style={styles.Master}>
                <View style={styles.DLeft}>
                        <Image
                        style = {styles.imgMenu}
                        source={require('../images/back.png')}/>
                </View>
                <View style={styles.DistanceCenter}>
                    <View style={styles.distance_image} >
                        <View style={{flex:1}}>
                         <Image
                              style={{width:W*0.05,height:W*0.05}}
                              source={require('../images/distance.png')}
                            />
                         </View>
                         <View style={{flex:2}}>
                             <Text style={styles.Distance_text} >{this.state.distances.distance.text}</Text>
                        </View>
                    </View>
                    <View style={{ flex:1.5, flexDirection:'row'}}>
                       <View style={{flex:1,paddingLeft:W*0.01}}>
                         <Image
                            style={{width:W*0.05,height:W*0.05}}
                            source={require('../images/time.png')}
                         />
                    </View>
                         <View style={{flex:4}}>
                             <Text style={styles.Distance_text}>{this.state.distances.duration.text}</Text>
                        </View>
                    </View>
                </View>
                 <View style={styles.DRight}></View>
                </View>
            </View>
        </View>
    </View>
    );
  }
}
const styles= StyleSheet.create({
    map:{
        flex:1
    },
    Container:{
         flex:1,
         position: 'absolute',
         alignItems: 'center'
    //     padding:W*0.05
    },
    Distance:{
       width: W,
        height:H*0.1,
      //  backgroundColor:'green',
      justifyContent:'center'
    },
    Master:{
        width: W,
        height:H*0.08,
        flexDirection:'row'
    },
    DLeft:{
        width:W*0.15,
        height:H*0.08,
        justifyContent:'center',
        alignItems:'center'
    },
    imgMenu: {width: W * 0.08, height: W * 0.08},
    DRight:{
        width:W*0.15,
        height:H*0.08,
    },
    DistanceCenter:{
        flexDirection:'row',
        width: W * 0.7,
        height:H*0.08,
        backgroundColor:'rgba(255,255,255,1)',
        borderRadius:2,
        padding:H*0.015,
        justifyContent:'center',
        alignItems:'center'
    },

    Distance_text:{
        fontSize:W*0.035
    },
    distance_image:{
         flex:1,
         flexDirection:'row',
         borderRightWidth:1,
         borderColor:'rgba(0,0,0,0.2)'
        }
})



