import React from 'react'
import { View } from 'react-native'
import { createStackNavigator } from 'react-navigation'
import EventsList from './EventsList'
import EventsDetails from './EventsDetails'
import EventsRegistration from './EventsRegistration'
import CustomHeader, { CustomHeaderBackButton, headerStyles } from '../Navigation/Header'


const EventsView = createStackNavigator({
    EventsList: {
        screen: EventsList,
        navigationOptions:({navigation}) => ({
            title: 'Events',
            headerLeft: (<View></View>),
        })
    },
    EventsDetails: {
        screen: EventsDetails,
        navigationOptions: ({navigation}) => ({
            title: navigation.getParam('eventTitle', 'Event Details')
        })
    },
    EventsRegistration: {
        screen: EventsRegistration,
        navigationOptions: ({navigation}) => ({
            title: navigation.getParam('eventTitle', 'Event Registration')
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
