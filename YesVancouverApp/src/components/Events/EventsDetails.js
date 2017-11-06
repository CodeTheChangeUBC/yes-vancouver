import React, { Component } from 'react';
import { StyleSheet, View, Image, ScrollView, Text, TouchableOpacity } from 'react-native';
import Header from '../Navigation/Header';
import EventsItem from './EventsItem';
import ReadMore from '@expo/react-native-read-more-text';


export default class EventsDetails extends Component {
    renderTruncatedFooter = (handlePress) => {
        return (
            <Text style={styles.truncateText} onPress={handlePress}>
                read more
            </Text>
        );
    }
    
    renderRevealedFooter = (handlePress) => {
        return (
            <Text style={styles.truncateText} onPress={handlePress}>
                show less
            </Text>
        );
    }

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
                            <Text style={styles.eventDetailText}>Location Location Location Location Location Location Location</Text>
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
                    
                    <View style={styles.registerButtonContainer}>
                        <View style={styles.registerButtonSpacer}></View>
                        <TouchableOpacity style={styles.registerButtonRectangle}>
                            <Text style={styles.registerButtonText}>Register</Text>
                        </TouchableOpacity>
                        <View style={styles.registerButtonSpacer}></View>
                    </View>
                    
                    <View style={styles.eventDescriptionContainer}>
                        <ReadMore
                            numberOfLines={5}
                            renderTruncatedFooter={this.renderTruncatedFooter}
                            renderRevealedFooter={this.renderRevealedFooter}>
                            <Text style={styles.eventDescriptionText}>
                                DescriptonDescriptonDescriptonDescriptonDescriptonDescriptonDescriptonDescriptonDescriptonDescriptonDescriptonDescriptonDescriptonDescriptonDescriptonDescriptonDescriptonDescriptonDescriptonDescriptonDescriptonDescriptonDescriptonDescriptonDescriptonDescriptonDescriptonDescriptonDescriptonDescriptonDescriptonDescriptonDescriptonDescripton
                            </Text>
                        </ReadMore>
                    </View>

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
        paddingVertical: 15,
        paddingHorizontal: 30
    },
    eventDetailContainer: {
        flexDirection: 'row',
        paddingVertical: 15
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
        paddingRight: 20
    },
    eventDetailText: {
        fontSize: 20,
        color: '#464647'
    },
    registerButtonContainer: {
        flexDirection:'row',
        paddingVertical: 30
    },
    registerButtonRectangle: {
        backgroundColor: '#EA4B6C',
        paddingVertical: 5,
        alignItems: 'center',
        flex: 0.6
    },
    registerButtonText: {
        fontSize: 24,
        color: 'white'
    },
    registerButtonSpacer: {
        flex: 0.2
    },
    truncateText: {
        textAlign: 'right',
        color: '#464647',
        textDecorationLine: 'underline',
        paddingVertical: 5
    },
    eventDescriptionContainer: {
        paddingHorizontal: 30,
        paddingVertical: 15
    },
    eventDescriptionText: {
        fontSize: 15,
        color: '#464647'
    }
});