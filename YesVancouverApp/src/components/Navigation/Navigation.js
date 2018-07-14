/**
 * Created by joycheng on 2017-10-21.
 */

import React, { Component } from 'react'
import { StyleSheet, View } from 'react-native'
import { StackNavigator } from 'react-navigation'

import Login from '../Login/LoginForm'
import HomeScreen from '../HomeScreen/HomeScreen'
import SignUp from '../SignUp/SignUp'
import ProfileSetupPhoto from '../Profile/Old Views/ProfileSetupPhoto'
import ProfileSetupSocial from '../Profile/Old Views/ProfileSetupSocial'
import ProfileSetupWork from '../Profile/Old Views/ProfileSetupWork'
import ResetPassword from '../ResetPassword/ResetPassword'
import NavBar from './NavBar'
import Aveda from '../Perks/aveda'
import PerksView from '../Perks/PerksView'
import PerksList from '../Perks/PerksList'
import EditProfile from "../Profile/EditProfile"
import Header from './Header'
import Expo from 'expo'


const Navigation = StackNavigator({
    HomeScreen : {screen : HomeScreen},
    Login : {screen : Login},
    NavBar : {screen : NavBar},
    SignUp : {screen : SignUp},
    ProfileSetupPhoto : {screen : ProfileSetupPhoto},
    EditProfile : {screen : EditProfile},
    ProfileSetupSocial : {screen : ProfileSetupSocial},
    ProfileSetupWork : {screen : ProfileSetupWork},
    ResetPassword : {screen : ResetPassword},
    Aveda : {screen : Aveda},
    PerksView: {screen: PerksView},
    PerksList: {screen: PerksList},
},
{
    navigationOptions: ({ navigation }) => ({
        headerStyle:{
            marginTop: Expo.Constants.statusBarHeight,
        },
        headerVisible: true,
        headerTitleStyle: {
            flex: 1,
            textAlign: 'center',
            alignSelf: 'center'
        },
        headerBackImage: require('../../images/Header/White-arrow-3x.png'),
        headerBackTitle: null,
        headerTintColor: 'white',
        headerTransparent: false,
        headerBackground: 
            <View style={styles.headerContainer}>
                <Header style={styles.header}/>
            </View>,
        // headerLeft: (Platform.OS === 'android' && ()) ? <View /> : null,
        // <View style={{backgroundColor:'transparent'}}/>,
        // headerRight: <View />,
    })
})

export default Navigation


const styles = StyleSheet.create({
    headerContainer: {
        flex: 1
    },
    header: {
        flex: 1,
        width: null,
        height: null
    }
})
