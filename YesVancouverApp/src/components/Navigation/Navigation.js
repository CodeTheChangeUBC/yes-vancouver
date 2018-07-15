/**
 * Created by joycheng on 2017-10-21.
 */

import React from 'react'
import { StyleSheet, View } from 'react-native'
import { Header, StackNavigator } from 'react-navigation'

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
import CustomHeader from './Header'


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
        headerMode: 'screen',
        headerStyle: {
            paddingVertical: (Header.HEIGHT - 24) / 2,
            paddingLeft: 10
        },
        headerVisible: true,
        headerTitleStyle: {
            flex: 1,
            textAlign: 'center',
            alignSelf: 'center',
            fontFamily: 'alternate-gothic-no3-d-regular',
            fontWeight: 'normal',
            lineHeight: 24,
            fontSize: 24,
            padding: 30
        },
        headerBackImage: require('../../images/Header/White-arrow-3x.png'),
        headerBackTitle: null,
        headerTintColor: 'white',
        headerTransparent: false,
        headerBackground: 
            <View style={styles.headerContainer}>
                <CustomHeader style={styles.header}/>
            </View>,
        headerRight: (<View></View>)
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
