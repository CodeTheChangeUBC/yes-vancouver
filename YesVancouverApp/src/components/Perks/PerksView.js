import React, { Component } from 'react';
import { Image } from 'react-native';
import PerksList from './PerksList';
import PerksDetails from './PerksDetails';


export default class PerksView extends Component {
    static navigationOptions = {
        tabBarLabel: 'PerksView',
        tabBarIcon: ({ focused, tintColor }) => focused ?
        ( <Image 
            source={require('../../images/NavBar/Perks-icon-white-3x.png')}
            resizeMode="contain"
            style={{height:30}}/> 
        ) :
        ( <Image 
            source={require('../../images/NavBar/Perks-icon-orange-3x.png')}
            resizeMode="contain"
            style={{height:30}}/>
        ) 
    }

    render() {
        return (
            <PerksList />
            // <PerksDetails />
        );
    }
}
