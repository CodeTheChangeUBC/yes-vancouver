import React, { Component } from 'react';
import { Image } from 'react-native';
import { StackNavigator } from 'react-navigation';
import EventsList from './EventsList'


export default class EventsView extends Component {
    static navigationOptions = {
        tabBarLabel: 'EventsView',
        title: 'EventsView',
        tabBarIcon: ({ focused, tintColor }) => focused ?
        ( <Image 
            source={require('../../images/NavBar/Calendar-icon-white@3x.png')}
            size={50}/> 
        ) :
        ( <Image 
            source={require('../../images/NavBar/Calendar-icon-orange@3x.png')}
            size={50}/>
        )
    }

    render() {
        return (
            <EventsList/>
        );
    }
}