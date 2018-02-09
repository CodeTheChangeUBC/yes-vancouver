import React, { Component } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import PropTypes from 'prop-types';


export default class EventsItem extends Component {
    render() {
        return (
            <View style={styles.container}>
                <View style={styles.dateColumn}>
                    <View style={styles.dateMonthTextContainer}>
                        <Text style={styles.dateMonthText}>{this.props.eventMonth}</Text>
                    </View>
                    <View style={styles.dateDayTextContainer}>
                        <Text style={styles.dateDayText}>28</Text>
                    </View>
                </View>
                <View style={styles.detailsColumn}>
                    <Text style={styles.title}>{this.props.eventTitle}</Text>
                    <Text style={styles.time}>{this.props.eventTime}</Text>
                    <Text style={styles.location}>{this.props.eventLocation}</Text>
                </View>
            </View>
        );
    }
}

EventsItem.propTypes = {
    eventId: PropTypes.number.isRequired,
    eventTitle: PropTypes.string.isRequired,
    eventMonth: PropTypes.string.isRequired,
    eventTime: PropTypes.string.isRequired,
    eventLocation: PropTypes.string.isRequired
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        height: 100,
        borderStyle: 'solid',
        borderWidth: 0.5,
        borderColor: 'rgba(151,151,151,0.2)',
        backgroundColor: 'rgba(255,255,255,0.5)'
    },
    dateColumn: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
    },
    dateMonthTextContainer: {
        flex: 1,
        flexDirection:'column',
        paddingTop: 13
    },
    dateMonthText: {
        fontFamily: 'source-sans-pro-semibold',
        fontSize: 30,
        color: '#464647'
    },
    dateDayTextContainer: {
        flex: 1,
        flexDirection:'column',
        paddingBottom: 43
    },
    dateDayText: {
        fontFamily: 'source-sans-pro-semibold',
        fontSize: 46,
        color: '#464647'
    },
    detailsColumn: {
        flex: 3
    },
    title: {
        fontFamily: 'source-sans-pro-bold',
        fontSize: 20,
        textAlign: 'left',
        color: '#464647'
    },
    time: {
        fontFamily: 'source-sans-pro-regular',
        fontSize: 15,
        color: '#464647'
    },
    location: {
        fontFamily: 'source-sans-pro-regular',
        fontSize: 15,
        color: '#464647'
    }
});
