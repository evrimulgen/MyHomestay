import React from 'react';
import {
  Dimensions
} from 'react-native';
var W = Dimensions.get('window').width;
var H = Dimensions.get('window').height;
import {StackNavigator, DrawerNavigator} from 'react-navigation';
import Home from './Home/Home'
import MapsPage from './Maps/MapsPage'
import ListHomeStay from './Maps/ListHomeStay'
import ListRoom from './Homestay/ListRoom'
import Details from './Homestay/Details'
import PanoramaRoom from './Homestay/PanoramaRoom'
import Welcome from './Welcome/Welcome'
import Menu from './Menu/Menu'
import MapNavigate from './Maps/MapNavigate';
import formInfo from './Booking/formInfo';
import QR from './QRCode/QR';
export const HomeStack = StackNavigator({
    _Home: {
        screen: Home,
        navigationOptions: {
            header: null
        }
    },
    _PanoramaRoom: {
        screen: PanoramaRoom,
        navigationOptions: {
            header: null
        }
    },
    _ListHomeStay: {
        screen: ListHomeStay,
        navigationOptions: {
            header: null
        }
    },
    _MapsPage: {
        screen: MapsPage,
        navigationOptions: {
            header: null
        }
    },
    _ListRoom: {
        screen: ListRoom,
        navigationOptions: {
            header: null
        }
    },
    _Details:{
        screen: Details,
        navigationOptions: {
            header: null
        }
    },
    _Welcome: {
        screen: Welcome,
        navigationOptions: {
            header: null
        }
    },
    _MapNavigate: {
        screen: MapNavigate,
        navigationOptions: {
            header: null
        }
    },
     _formInfo: {
        screen: formInfo,
        navigationOptions: {
            header: null
        }
    },
    _QR: {
        screen: QR,
        navigationOptions: {
            header: null
        }
    },
})

export const SlideMenu = DrawerNavigator({
    _Slide: {
        screen: HomeStack
    }
},{
    drawerWidth: W*0.7,
    drawerPosition: 'left',
    contentComponent: props => <Menu {...props} />,
    drawerBackgroundColor: 'transparent'
})