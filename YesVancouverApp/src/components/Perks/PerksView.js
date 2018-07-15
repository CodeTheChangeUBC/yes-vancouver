import React, { Component } from 'react';
import { Image, View } from 'react-native';
import PerksList from './PerksList';
import PerksDetails from './PerksDetails';


export default class PerksView extends Component {

    static navigationOptions = {
        title: 'Perks Partners',
        headerLeft: (<View></View>),
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
        let {navigate} = this.props.navigation;
        return (

            <PerksList navigation={this.props.navigation} />
            // <PerksDetails />
        );
    }
}
