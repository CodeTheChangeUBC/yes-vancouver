import React from 'react'
import { View } from 'react-native'
import { createStackNavigator } from 'react-navigation'
import CustomHeader, { CustomHeaderBackButton, headerStyles } from '../Navigation/Header'
import ProfileDetails from './ProfileDetails'
import EditProfile from './EditProfile'
import ChangePassword from './ChangePassword'


const EventsView = createStackNavigator({
    ProfileDetails: {
        screen: ProfileDetails,
        navigationOptions:({navigation}) => ({
            title: 'Profile',
            headerLeft: (<View></View>),
        })
    },
    EditProfile: {
        screen: EditProfile,
        navigationOptions: ({navigation}) => ({
            title: 'Edit Profile'
        })
    },
    ChangePassword: {
        screen: ChangePassword,
        navigationOptions: ({navigation}) => ({
            title: 'Change Password'
        })
    }
},
{
    navigationOptions: {
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
    }
})

export default EventsView
