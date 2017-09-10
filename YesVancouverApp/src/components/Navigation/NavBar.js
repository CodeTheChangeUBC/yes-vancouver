import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { StackNavigator, TabNavigator, TabBarBottom } from 'react-navigation';
import EventsView from '../Events/EventsView';
import MessagingView from '../Messaging/MessagingView'

const NavBar = TabNavigator({
    EventsView: { screen: EventsView },
    MessagingView: { screen: MessagingView },
}, {
    tabBarOptions: {
        activeTintColor: 'red',
        showIcon: true,
        
    },
    tabBarComponent: TabBarBottom,
    tabBarPosition: 'bottom'
});

export default NavBar;