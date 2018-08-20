import React from 'react'
import { Image } from 'react-native'
import { createBottomTabNavigator, BottomTabBar } from 'react-navigation-tabs'
import EventsView from '../Events/EventsView'
import PerksView from '../Perks/PerksView'
import NewsFeedView from '../NewsFeed/NewsFeedView'
// import MessagingView from '../Messaging/MessagingView'
import ProfileView from '../Profile/ProfileView'


const NavBar = createBottomTabNavigator({
    EventsView: { 
        screen: EventsView,
        navigationOptions: {
            tabBarLabel: 'EventsView',
            tabBarIcon: ({ focused }) => focused ?
            ( <Image 
                source={require('../../images/NavBar/Calendar-icon-white-3x.png')}
                resizeMode="contain"
                style={{height:30}}/> 
            ) :
            ( <Image 
                source={require('../../images/NavBar/Calendar-icon-orange-3x.png')}
                resizeMode="contain"
                style={{height:30}}/> 
            )
        }
    },
    PerksView: { screen: PerksView },
    NewsFeedView: { screen: NewsFeedView },
    // MessagingView: { screen: MessagingView },
    ProfileView: {
        screen: ProfileView,
        navigationOptions: {
            tabBarLabel: 'ProfileDetails',
            tabBarIcon: ({ focused }) => focused ?
            ( <Image 
                source={require('../../images/NavBar/Profile-icon-white-3x.png')}
                resizeMode="contain"
                style={{height:30}}/> 
            ) :
            ( <Image 
                source={require('../../images/NavBar/Profile-icon-orange-3x.png')}
                resizeMode="contain"
                style={{height:30}}/>
            )
        }
    }
}, {
    tabBarOptions: {
        showIcon: true,
        showLabel: false,
        style: {
            backgroundColor: '#ED4969'
        }
    },
    tabBarComponent: BottomTabBar,
    tabBarPosition: 'bottom',
    initialRouteName: 'NewsFeedView',
    drawUnderTabBar: true
})

export default NavBar
