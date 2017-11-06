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

                    <Text style={styles.headingPink}>Speakers</Text>

                    <View style={styles.speakerContainer}>
                        <View style={styles.speakerImageContainer}>
                            <Image
                                style={styles.speakerImage}
                                source={require('../../images/Events/Blank-Profile-Picture.png')}
                            />
                        </View>
                        <View style={styles.speakerDescription}>
                            <Text style={styles.speakerName}>Firstname Lastname</Text>
                            <Text style={styles.speakerTitle}>Title, Company</Text>
                            <Text style={styles.speakerRole}>Role and responsibilities</Text>
                        </View>
                    </View>

                    <View style={styles.speakerContainer}>
                        <View style={styles.speakerImageContainer}>
                            <Image
                                style={styles.speakerImage}
                                source={require('../../images/Events/Blank-Profile-Picture.png')}
                            />
                        </View>
                        <View style={styles.speakerDescription}>
                            <Text style={styles.speakerName}>Firstname Lastname</Text>
                            <Text style={styles.speakerTitle}>Title, Company</Text>
                            <Text style={styles.speakerRole}>Role and responsibilities</Text>
                        </View>
                    </View>

                    <View style={styles.speakerContainer}>
                        <View style={styles.speakerImageContainer}>
                            <Image
                                style={styles.speakerImage}
                                source={require('../../images/Events/Blank-Profile-Picture.png')}
                            />
                        </View>
                        <View style={styles.speakerDescription}>
                            <Text style={styles.speakerName}>Firstname Lastname</Text>
                            <Text style={styles.speakerTitle}>Title, Company</Text>
                            <Text style={styles.speakerRole}>Role and responsibilities</Text>
                        </View>
                    </View>

                    <Text style={styles.headingPink}>Sponsors</Text>

                    <View style={styles.sponsorImageContainer}>
                        <Image
                            style={styles.sponsorImage}
                            source={require('../../images/Events/Square-Company-Logo.png')}
                        />
                        <Image
                            style={styles.sponsorImage}
                            source={require('../../images/Events/Rectangular-Company-Logo.png')}
                        />
                    </View>

                    <View style={styles.registerButtonContainer}>
                        <View style={styles.registerButtonSpacer}></View>
                        <TouchableOpacity style={styles.registerButtonRectangle}>
                            <Text style={styles.registerButtonText}>Register</Text>
                        </TouchableOpacity>
                        <View style={styles.registerButtonSpacer}></View>
                    </View>

                    <Text style={styles.headingGrey}>Share</Text>
                    <View style={styles.socialMediaContainer}>
                        <Image
                            style={styles.shareIcon}
                            source={require('../../images/Events/Share-icons/Twitter@3x.png')}
                        />
                        <Image
                            style={styles.shareIcon}
                            source={require('../../images/Events/Share-icons/Facebook@3x.png')}
                        />
                        <Image
                            style={styles.shareIcon}
                            source={require('../../images/Events/Share-icons/Email@3x.png')}
                        />
                        </View>
                    <Text style={styles.copyLinkText}>Copy Link</Text>
                    
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
    },
    headingPink: {
        fontSize: 36,
        color: '#EA4B6C',
        textAlign: 'center',
        paddingVertical: 15
    },
    headingGrey: {
        fontSize: 36,
        color: '#464647',
        textAlign: 'center',
        paddingBottom: 20
    },
    copyLinkText: {
        fontSize: 15,
        color: '#EA4B6C',
        textAlign: 'center',
        paddingBottom: 30
    },
    socialMediaContainer: {
        flexDirection: 'row',
        justifyContent: 'center'
    },
    shareIcon: {
        marginHorizontal: 2.5,
        marginBottom: 5
    },
    speakerContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        paddingVertical: 10
    },
    speakerImageContainer: {
        flex: 1,
        alignItems: 'flex-end'
    },
    speakerImage: {
        width: 80,
        height: 80,
        borderRadius: 40,
        borderWidth: 1,
        borderColor: 'rgba(151,151,151,0.4)'
    },
    speakerDescription: {
        flex: 2,
        flexDirection: 'column',
        justifyContent: 'center',
        paddingLeft: 10,
        paddingRight: 20
    },
    speakerName: {
        fontSize: 20,
        color: '#EA4B6C',
        marginVertical: 2
    },
    speakerTitle: {
        fontSize: 11,
        fontWeight: 'bold',
        color: '#464647',
        marginVertical: 2
    },
    speakerRole: {
        fontSize: 11,
        color: '#464647',
        marginVertical: 2
    },
    sponsorImageContainer:{
        alignItems: 'center'
    },
    sponsorImage: {
        resizeMode: 'contain',
        height: 90,
        marginVertical: 5
    }
});