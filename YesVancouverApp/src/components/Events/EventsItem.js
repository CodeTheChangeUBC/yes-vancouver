import React, { Component } from 'react';
import { StyleSheet, View, Text } from 'react-native';


export default class EventsItem extends Component {
    render() {
        return (
            <View style={styles.container}>
                <View style={styles.dateColumn}>
                    <Text style={styles.dateText}>MAY</Text>
                    <Text style={styles.dateText}>28</Text>
                </View>
                <View style={styles.detailsColumn}>
                    <Text style={styles.title}>Event title</Text>
                    <Text style={styles.time}>Event time</Text>
                    <Text style={styles.location}>Event location</Text>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        height: 100,
        borderStyle: 'solid',
        borderWidth: 1,
        borderColor: 'rgba(151,151,151,0.2)',
        backgroundColor: 'rgba(255,255,255,0.5)'
    },
    dateColumn: {
        flex: 1,
        alignItems: 'center'
    },
    dateText: {
        fontSize: 30,
        fontWeight: 'bold',
        color: '#464647'
    },
    detailsColumn: {
        flex: 3
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'left',
        color: '#464647'
    },
    time: {
        fontSize: 15,
        color: '#464647'
    },
    location: {
        fontSize: 15,
        color: '#464647'
    }
});
