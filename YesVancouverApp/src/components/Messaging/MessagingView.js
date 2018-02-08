import React, { Component } from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';

export default class MessagingView extends Component {
    static navigationOptions = {
        tabBarLabel: 'MessagingView',
        title: "MessagingView",
        tabBarIcon: ({ focused, tintColor }) => focused ?
        ( <Image 
            source={require('../../images/NavBar/Message-icon-white-3x.png')}
            resizeMode="contain"
            style={{height:30}}/> 
        ) :
        ( <Image 
            source={require('../../images/NavBar/Message-icon-orange-3x.png')}
            resizeMode="contain"
            style={{height:30}}/>
        )
    }

    render() {
        return (
            <View style={styles.container}>
                <Text>Messaging View</Text>
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