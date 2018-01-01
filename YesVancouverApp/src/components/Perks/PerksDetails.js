import React, { Component } from 'react';
import { StyleSheet, View, Image, ScrollView, Text, TouchableOpacity } from 'react-native';
import Header from '../Navigation/Header';


export default class PerksDetails extends Component {
    render() {
        return (
            <View style={styles.container}>
                <Header style={styles.header}/>
                <View style={styles.content}>
                    <Text>HI</Text>
                </View>
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
    content: {
        flex: 7
    }
});
