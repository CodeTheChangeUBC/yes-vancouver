import React, { Component, PropTypes } from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import { StackNavigator } from 'react-navigation';

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
            <View style={styles.container}>
                <Text>Events View</Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});