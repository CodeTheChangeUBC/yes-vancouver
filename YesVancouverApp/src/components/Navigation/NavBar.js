import React, { Component } from 'react';
import { View, Text, Image } from 'react-native';
import { StackNavigator, TabNavigator, TabBarBottom } from 'react-navigation';
import EventsView from '../Events/EventsView';
import PerksView from '../Perks/PerksView';
import NewsFeedView from '../NewsFeed/NewsFeedView';
import MessagingView from '../Messaging/MessagingView';
import ProfileView from '../Profile/ProfileView';


const NavBar = TabNavigator({
    EventsView: { 
        screen: EventsView,
        navigationOptions: {
            tabBarLabel: 'EventsView',
            title: 'EventsView',
            tabBarIcon: ({ focused }) => { 
                if(focused){
                    return ( <Image 
                        source={require('../../images/NavBar/Calendar-icon-white-3x.png')}
                        resizeMode="contain"
                        style={{height:30}}/> 
                    )
                } else {
                    return ( <Image 
                        source={require('../../images/NavBar/Calendar-icon-orange-3x.png')}
                        resizeMode="contain"
                    style={{height:30}}/> )
                }
            }
        }
    },
    PerksView: { screen: PerksView },
    NewsFeedView: { screen: NewsFeedView },
    MessagingView: { screen: MessagingView },
    ProfileView: { screen: ProfileView },
}, {
    tabBarOptions: {
        showIcon: true,
        showLabel: false,
        style: {
            backgroundColor: '#ED4969'
        }
    },
    tabBarComponent: TabBarBottom,
    tabBarPosition: 'bottom',
    initialRouteName: 'NewsFeedView',
    drawUnderTabBar: true,
});

export default NavBar;