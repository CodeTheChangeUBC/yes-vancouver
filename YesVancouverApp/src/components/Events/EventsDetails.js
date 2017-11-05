import React, { Component } from 'react';
import { StyleSheet, View, Image, ScrollView, Text } from 'react-native';
import Header from '../Navigation/Header';
import EventsItem from './EventsItem';


export default class EventsDetails extends Component {
    render() {
        return (
            <View style={styles.container}>
                <ScrollView>
                    <Image 
                        style={styles.bannerImage}
                        resizeMode='stretch'
                        source={require('../../images/Events/Event-Detail-Banner.png')}
                    />

                    <Text style={styles.eventTitle}>Event Title</Text>

                    <View style={styles.divider}></View>

                    <View style={styles.eventDetailContainer}>
                        <View style={styles.eventDetailIcon}>
                            <Image source={require('../../images/Events/Event-icons/calendar@3x.png')}/>
                        </View>
                        <View style={styles.eventDetailTextContainer}>
                            <Text style={styles.eventDetailText}>May 15, 10:30PM - 11:30PM</Text>
                        </View>
                    </View>

                    <View style={styles.divider}></View>

                    <View style={styles.eventDetailContainer}>
                        <View style={styles.eventDetailIcon}>
                            <Image source={require('../../images/Events/Event-icons/location@3x.png')}/>
                        </View>
                        <View style={styles.eventDetailTextContainer}>
                            <Text style={styles.eventDetailText}>Location Location Location Location Location Location Location </Text>
                        </View>
                    </View>

                    <View style={styles.divider}></View>

                    <View style={styles.eventDetailContainer}>
                        <View style={styles.eventDetailIcon}>
                            <Image source={require('../../images/Events/Event-icons/message@3x.png')}/>
                        </View>
                        <View style={styles.eventDetailTextContainer}>
                            <Text style={styles.eventDetailText}>Discussion Board</Text>
                        </View>
                    </View>

                    <View style={styles.divider}></View>

                    <Text>Register Button</Text>
                    <Text>Description</Text>
                    <Text>Speakers</Text>
                    <Text>Sponsors</Text>
                    <Text>Register</Text>
                    <Text>Share</Text>
                    <Text>Copy Link</Text>
                    
                </ScrollView>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: 'white'
    },
    divider: {
        borderBottomColor: 'rgba(151,151,151,0.5)',
        borderBottomWidth: 1
    },
    bannerImage: {
        flex: 1,
        width: null
    },
    eventTitle: {
        flex: 1,
        fontSize: 24,
        fontWeight: 'bold',
        color: '#EA4B6C',
        textAlign: 'center',
        paddingTop: 15,
        paddingBottom: 15
    },
    eventDetailContainer: {
        flexDirection: 'row',
        paddingTop: 15,
        paddingBottom: 15
    },
    eventDetailIcon: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'flex-end',
        paddingRight: 15,
        width: 25,
        height: 25
    },
    eventDetailTextContainer: {
        flex: 4,
        justifyContent: 'center',
        alignItems: 'flex-start',
    },
    eventDetailText: {
        fontSize: 20,
        color: '#464647'
    }
});