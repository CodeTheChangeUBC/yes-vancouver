import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { StackNavigator, TabNavigator, TabBarBottom } from 'react-navigation';
import EventsView from '../Events/EventsView';
import PerksView from '../Perks/PerksView';
import NewsFeedView from '../NewsFeed/NewsFeedView';
import MessagingView from '../Messaging/MessagingView';
import ProfileView from '../Profile/ProfileView';

const NavBar = TabNavigator({
    EventsView: { screen: EventsView },
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
    tabBarPosition: 'bottom'
});

export default NavBar;