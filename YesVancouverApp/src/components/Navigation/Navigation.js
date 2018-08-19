/**
 * Created by joycheng on 2017-10-21.
 */

import React from 'react'
import { Image, View } from 'react-native'
import { createStackNavigator } from 'react-navigation'

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
import CustomHeader, { CustomHeaderBackButton, headerStyles } from './Header'


const Navigation = createStackNavigator({
    HomeScreen: {screen : HomeScreen},
    Login: {screen : Login},
    NavBar: {
        screen: NavBar,
        navigationOptions: {
            header: null
        }
    },
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
        headerMode: 'screen',
        headerStyle: headerStyles.headerContainer,
        headerVisible: true,
        headerTitleStyle: headerStyles.headerTitle,
        headerBackImage: <CustomHeaderBackButton />,
        headerBackTitle: null,
        headerTintColor: 'white',
        headerTransparent: false,
        headerBackground: <CustomHeader />,
        headerRight: (<View></View>)
    })
})

export default Navigation
