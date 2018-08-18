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
            headerTitleStyle: headerStyles.headerTitle,
            headerLeft: (<View></View>),
        })
    },
    EventsDetails: {
        screen: EventsDetails,
        navigationOptions: ({navigation}) => ({
            title: navigation.getParam('eventTitle', 'Event Details'),
            headerTitleStyle: headerStyles.headerTitle
        })
    },
    EventsRegistration: {
        screen: EventsRegistration,
        navigationOptions: ({navigation}) => ({
            title: navigation.getParam('eventTitle', 'Event Registration'),
            headerTitleStyle: headerStyles.headerTitle
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
        headerBackground: <CustomHeader />,
        headerRight: (<View></View>)
    }
})

export default EventsView
