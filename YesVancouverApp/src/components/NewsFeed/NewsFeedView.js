import React, { Component } from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import { StackNavigator } from 'react-navigation';

export default class NewsFeedView extends Component {

    static navigationOptions = {
        title:"NewsFeedViewPage",
    };

    static navigationOptions = {
        tabBarLabel: 'NewsFeedView',
        tabBarIcon: ({ focused, tintColor }) => focused ?
        ( <Image 
            source={require('../../images/NavBar/YES-icon-white@3x.png')}
            size={50}/> 
        ) :
        ( <Image 
            source={require('../../images/NavBar/YES-icon-orange@3x.png')}
            size={50}/>
        )
    };

    render() {
        return (
            <View style={styles.container}>
                <Text>News Feed View</Text>
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