import React, { Component } from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';

export default class PerksView extends Component {
    static navigationOptions = {
        tabBarLabel: 'PerksView',
        tabBarIcon: ({ tintColor }) => (
            <Image 
                source={require('../../images/Perks-icon-white@3x.png')}
                size={50}
            />
        )
    }

    render() {
        return (
            <View style={styles.container}>
                <Text>Perks View</Text>
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