import React, { Component } from 'react';
import { Image } from 'react-native';
import PerksList from './PerksList'


export default class PerksView extends Component {
    static navigationOptions = {
        tabBarLabel: 'PerksView',
        tabBarIcon: ({ focused, tintColor }) => focused ?
        ( <Image 
            source={require('../../images/NavBar/Perks-icon-white@3x.png')}
            size={50}/> 
        ) :
        ( <Image 
            source={require('../../images/NavBar/Perks-icon-orange@3x.png')}
            size={50}/>
        ) 
    }

    render() {
        return (
            <PerksList />
        );
    }
}
