import React from 'react'
import { View } from 'react-native'
import { Header, StackNavigator } from 'react-navigation'
import EventsList from './EventsList'
import EventsDetails from './EventsDetails'
import EventsRegistration from './EventsRegistration'
import CustomHeader, { headerStyles } from '../Navigation/Header'


const EventsView = StackNavigator({
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
        headerStyle: {
            paddingVertical: (Header.HEIGHT - 24) / 2,
            paddingLeft: 10
        },
        headerVisible: true,
        headerTitleStyle: headerStyles.headerTitle,
        headerBackImage: require('../../images/Header/White-arrow-3x.png'),
        headerBackTitle: null,
        headerTintColor: 'white',
        headerTransparent: false,
        headerBackground: <CustomHeader />,
        headerRight: (<View></View>)
    }
})

export default EventsView
