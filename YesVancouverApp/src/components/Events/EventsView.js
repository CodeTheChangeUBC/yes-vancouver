import React, { Component } from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';

export default class EventsView extends Component {
    static navigationOptions = {
        tabBarLabel: 'EventsView',
        tabBarIcon: ({ focused, tintColor }) => focused ?
        ( <Image 
            source={require('../../images/Calendar-icon-white@3x.png')}
            size={50}/> 
        ) :
        ( <Image 
            source={require('../../images/Calendar-icon-orange@3x.png')}
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