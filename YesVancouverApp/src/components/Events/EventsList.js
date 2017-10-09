import React, { Component } from 'react';
import { StyleSheet, View, Image } from 'react-native';
import Header from '../Navigation/Header';

export default class EventsList extends Component {
    render() {
        return (
            <View style={styles.container}>
                <Header style={styles.header}/>
                <Image style={styles.backgroundImage}
                    resizeMode='stretch'
                    source={require('../../images/Events/Events-background.png')}
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    header: {
        flex: 1,
        width: null,
        height: null
    },
    backgroundImage: {
        flex: 7,
        width: null,
        height: null
    }
});