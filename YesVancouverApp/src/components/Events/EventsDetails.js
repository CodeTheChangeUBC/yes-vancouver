import React, { Component } from 'react';
import { StyleSheet, View, Image, ScrollView, Text, TouchableOpacity, TouchableHighlight } from 'react-native';
import Header from '../Navigation/Header';
import EventsItem from './EventsItem';
import ReadMore from '@expo/react-native-read-more-text';

import ApiUtils from '../../utils/ApiUtils'
import { ClientSecrets } from '../../../config/config'


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

    async componentDidMount(){
        bearerToken = await getBearerToken()
        if(!bearerToken) {
            console.log("Failed to get bearer token")
            this.setState({isEventListLoading: false})
            return
        }

        let eventId = this.props.navigation.state.params.eventId
        eventsListResponse = await getEventsDetails(bearerToken, eventId)
        if(!eventsListResponse) {
            console.log("Failed to get events list from API call")
            this.setState({isEventListLoading: false})
            return
        }
        console.log(eventsListResponse)
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.headerContainer}>
                    <Header style={styles.header}/>
                    <View style={styles.headerIconContainer}>
                        <TouchableHighlight onPress={() => {this.props.navigation.pop()}} 
                                style={styles.backArrowContainer}>
                            <Image source={require('../../images/Header/White-arrow-3x.png')}
                                resizeMode='contain'
                                style={{height:'50%'}}/>
                        </TouchableHighlight>
                        <View style={styles.eventsTitleContainer}>
                            <Text style={styles.eventsTitleText}>
                                Events
                            </Text>
                        </View>
                        <View style={styles.backArrowContainer}>
                            <Image source={require('../../images/Header/Menu-icon-white-3x.png')}
                                resizeMode='contain'
                                style={{height:'50%'}}/>
                        </View>
                    </View>
                </View>
                <View style={styles.content}>
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
                                <Image source={require('../../images/Events/Event-icons/calendar-3x.png')}
                                    resizeMode='contain'
                                    style={{width:'50%'}}/>
                            </View>
                            <View style={styles.eventDetailTextContainer}>
                                <Text style={styles.eventDetailText}>May 15, 10:30PM - 11:30PM</Text>
                            </View>
                        </View>

                        <View style={styles.divider}></View>

                        <View style={styles.eventDetailContainer}>
                            <View style={styles.eventDetailIcon}>
                                <Image source={require('../../images/Events/Event-icons/location-3x.png')}
                                    resizeMode='contain'
                                    style={{width:'35%'}}/>
                            </View>
                            <View style={styles.eventDetailTextContainer}>
                                <Text style={styles.eventDetailText}>Location Location Location Location Location Location Location</Text>
                            </View>
                        </View>

                        <View style={styles.divider}></View>

                        <View style={styles.eventDetailContainer}>
                            <View style={styles.eventDetailIcon}>
                                <Image source={require('../../images/Events/Event-icons/message-3x.png')}
                                    resizeMode='contain'
                                    style={{width:'50%'}}/>
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
                                source={require('../../images/Events/Share-icons/Twitter-3x.png')}
                                style={styles.shareIcon}
                                resizeMode='contain'
                            />
                            <Image
                                source={require('../../images/Events/Share-icons/Facebook-3x.png')}
                                style={styles.shareIcon}
                                resizeMode='contain'
                            />
                            <Image
                                source={require('../../images/Events/Share-icons/Email-3x.png')}
                                style={styles.shareIcon}
                                resizeMode='contain'
                            />
                            </View>
                        <Text style={styles.copyLinkText}>Copy Link</Text>
                        
                    </ScrollView>
                </View>
            </View>
        );
    }
}

async function getBearerToken() {
    try {
        let base64 = require('base-64')
        username = ClientSecrets.API_USERNAME
        password = ClientSecrets.API_PASSWORD
        basicAuthHeaderValue = 'Basic ' + base64.encode(username + ":" + password)
        console.log(basicAuthHeaderValue)

        let requestAuthTokenBody = {
            'grant_type': 'client_credentials',
            'scope': 'contacts finances events'
        }

        let response = await fetch('https://oauth.wildapricot.org/auth/token', 
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Authorization': basicAuthHeaderValue
            },
            body: ApiUtils.constructFormUrlEncodedBody(requestAuthTokenBody)
        })
        let responseJson = await response.json()
        return responseJson['access_token']
    } catch(error) {
        console.error(error)
        return null
    }
}

async function getEventsDetails(bearerToken, eventId) {
    try {
        let requestAuthTokenBody = {
            'grant_type': 'client_credentials',
            'scope': 'contacts finances events'
        }
        
        let getUrl = 'https://api.wildapricot.org/v2/Accounts/' + ClientSecrets.ACCOUNT_NUM + '/Events/' + eventId
        let response = await fetch(getUrl, 
        {
            method: 'GET',
            headers: {
                'Authorization': 'Bearer ' + bearerToken
            }
        })
        
        if(response.status != 200) {
            console.log(response.status)
            return null
        }
        return response.json()

    } catch(error) {
        console.error(error)
        return null
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: 'white'
    },
    content: {
        flex: 7
    },
    headerContainer: {
        flex: 1
    },
    header: {
        flex: 1,
        width: null,
        height: null
    },
    headerIconContainer: {
        position: 'absolute',
        width: '100%',
        height: '100%',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    menuContainer: {
        flex: 1,
        alignItems: 'center'
    },
    eventsTitleContainer: {
        flex: 4,
        alignItems: 'center'
    },
    eventsTitleText: {
        fontFamily: 'alternate-gothic-no3-d-regular',
        fontSize: 24,
        color: '#FFFFFF',
        backgroundColor: 'transparent',
        textAlign: 'center'
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
        fontFamily: 'alternate-gothic-no3-d-regular',
        fontSize: 24,
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
        fontFamily: 'source-sans-pro-regular',
        fontSize: 20,
        color: '#464647'
    },
    registerButtonContainer: {
        flexDirection:'row',
        paddingVertical: 30
    },
    registerButtonRectangle: {
        backgroundColor: '#EA4B6C',
        paddingVertical: 10,
        alignItems: 'center',
        flex: 0.6
    },
    registerButtonText: {
        fontFamily: 'alternate-gothic-no3-d-regular',
        fontSize: 24,
        color: 'white'
    },
    registerButtonSpacer: {
        flex: 0.2
    },
    truncateText: {
        textAlign: 'right',
        fontFamily: 'source-sans-pro-regular',
        fontSize: 15,
        color: '#464647',
        textDecorationLine: 'underline',
        paddingVertical: 5
    },
    eventDescriptionContainer: {
        paddingHorizontal: 30,
        paddingVertical: 15
    },
    eventDescriptionText: {
        fontFamily: 'source-sans-pro-regular',
        fontSize: 15,
        color: '#464647'
    },
    headingPink: {
        fontFamily: 'alternate-gothic-no3-d-regular',
        fontSize: 36,
        color: '#EA4B6C',
        textAlign: 'center',
        paddingVertical: 15
    },
    headingGrey: {
        fontFamily: 'alternate-gothic-no3-d-regular',
        fontSize: 36,
        color: '#464647',
        textAlign: 'center',
        paddingBottom: 20
    },
    copyLinkText: {
        fontFamily: 'source-sans-pro-regular',
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
        marginBottom: 5,
        width: '10%'
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
        fontFamily: 'source-sans-pro-regular',
        fontSize: 20,
        color: '#EA4B6C',
        marginVertical: 2
    },
    speakerTitle: {
        fontFamily: 'source-sans-pro-bold',
        fontSize: 11,
        color: '#464647',
        marginVertical: 2
    },
    speakerRole: {
        fontFamily: 'source-sans-pro-regular',
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