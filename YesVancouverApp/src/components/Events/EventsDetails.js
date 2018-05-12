import React, { Component } from 'react'
import { ActivityIndicator, Dimensions, Image, ScrollView, StyleSheet, Text, TouchableHighlight, TouchableOpacity, View, WebView } from 'react-native'
import Header from '../Navigation/Header'
import ReadMore from '@expo/react-native-read-more-text'
import AutoHeightImage from 'react-native-auto-height-image';

import ApiUtils from '../../utils/ApiUtils'
import { ClientSecrets } from '../../../config/config'

import { parseString } from 'react-native-xml2js'

import HTML from 'react-native-render-html';

function speaker(firstName, lastName, title, company, role, imageurl) {
    this.firstName = firstName
    this.lastName = lastName
    this.title = title
    this.company = company
    this.role = role
    this.imageurl = imageurl
}

var monthsMixedCaseAbbrev = [
    "Jan.",
    "Feb.",
    "Mar.",
    "Apr.",
    "May",
    "June",
    "July",
    "Aug.",
    "Sep.",
    "Oct.",
    "Nov.",
    "Dec."
]

function formatAMPM(date) {
    // https://stackoverflow.com/questions/8888491/how-do-you-display-javascript-datetime-in-12-hour-am-pm-format
    var hours = date.getHours()
    var minutes = date.getMinutes()
    var ampm = hours >= 12 ? 'PM' : 'AM'
    hours = hours % 12
    hours = hours ? hours : 12 // the hour '0' should be '12'
    minutes = minutes < 10 ? '0'+minutes : minutes
    var strTime = hours + ':' + minutes + ' ' + ampm
    return strTime
}

function formatDateTime(startDate, endDate) {
    let formattedDateTime = ''
    if(startDate.toLocaleDateString() == endDate.toLocaleDateString()){
        formattedDateTime = monthsMixedCaseAbbrev[startDate.getMonth()] + ' ' + startDate.getDate() + ', '
        formattedDateTime += formatAMPM(startDate) + ' — ' + formatAMPM(endDate)
    }
    else {
        formattedDateTime = monthsMixedCaseAbbrev[startDate.getMonth()] + ' ' + startDate.getDate() + ', '
        formattedDateTime += formatAMPM(startDate) 
        formattedDateTime += ' — \n'
        formattedDateTime += monthsMixedCaseAbbrev[endDate.getMonth()] + ' ' + endDate.getDate() + ', '
        formattedDateTime += formatAMPM(endDate)
    }
    return formattedDateTime
}

/* 
 * Additional details (banner image, event description, speakers, sponsors)
 * specified in the comment at the end of the event DescriptionHtml
 */
function getAdditionalDetails(eventDescriptionHtml) {
    let openingCommentTag = "<!--"
    let closingCommentTag = '-->'

    let indexOfCommentStart = eventDescriptionHtml.lastIndexOf(openingCommentTag)
    if(indexOfCommentStart == -1) {
        console.log('No additional details recorded for this event')
        return null
    }
    let indexOfXmlStart = indexOfCommentStart + openingCommentTag.length

    let indexOfCommentEnd = eventDescriptionHtml.lastIndexOf(closingCommentTag)
	if(indexOfCommentEnd == -1) {
        console.log('No additional details recorded for this event')
        return null
    }

    let xmlString = eventDescriptionHtml.substring(indexOfXmlStart, indexOfCommentEnd).trim();

	let xmlDoc = null
    parseString(xmlString, {trim: true}, function (err, result) {
        if(!err){
            console.dir(result)
            xmlDoc = result
        }
    })
    return xmlDoc
}

function getSpeakersList(eventAdditionalDetails) {
    if(!eventAdditionalDetails.additionaldetails) {
        console.log('No additional details found for event')
        return null
    }
    
    if(!eventAdditionalDetails.additionaldetails.speaker) {
        console.log('No speakers found in additional details of event')
        return null
    }

    let speakersResult = [] 
    let speakersList = eventAdditionalDetails.additionaldetails.speaker
    for(let i = 0; i < speakersList.length; i++) {
        let firstName = speakersList[i].firstname
        let lastName = speakersList[i].lastname
        let title = speakersList[i].title
        let company = speakersList[i].company
        let role = speakersList[i].role
        let imageurl = speakersList[i].imageurl[0]
        speakersResult.push(new speaker(firstName, lastName, title, company, role, imageurl))
    }
    return speakersResult
}

export default class EventsDetails extends Component {
    constructor(props) {
        super(props)
        this.state = {
            isEventDetailsLoading: true,
            eventBannerImage: '',
            eventTitle: '',
            eventDateTime: '',
            eventLocation: '',
            eventDescriptionHTML: '',
            eventDescriptionText: '',
            eventSpeakers: [],
            eventSponsors: []
        }
    }

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
            this.setState({isEventDetailsLoading: false})
            return
        }

        let eventId = this.props.navigation.state.params.eventId
        eventDetailsResponse = await getEventDetails(bearerToken, eventId)
        if(!eventDetailsResponse) {
            console.log("Failed to get event details from API call")
            this.setState({isEventDetailsLoading: false})
            return
        }
        console.log(eventDetailsResponse)

        let eventTitle = eventDetailsResponse.Name
        let eventLocation = eventDetailsResponse.Location

        let eventStartDateTime = new Date(Date.parse(eventDetailsResponse.StartDate))
        let eventEndDateTime = new Date(Date.parse(eventDetailsResponse.EndDate))
        let eventDateTimeFormatted = formatDateTime(eventStartDateTime, eventEndDateTime)

        let eventDescriptionHtml = eventDetailsResponse.Details.DescriptionHtml


        let eventAdditionalDetails = getAdditionalDetails(eventDescriptionHtml)
        console.log(eventAdditionalDetails)
      
        let eventDescriptionText = eventAdditionalDetails.additionaldetails.eventdetails
        let eventBannerImage = eventAdditionalDetails.additionaldetails.eventbannerimageurl[0]

        let eventSponsors = eventAdditionalDetails.additionaldetails.sponsorimageurl

        let eventSpeakersList = []
        if(eventAdditionalDetails) {
            eventSpeakersList = getSpeakersList(eventAdditionalDetails)
            console.log(eventSpeakersList)
        }

        this.setState({
            eventBannerImage: eventBannerImage,
            eventTitle: eventTitle,
            eventDateTime: eventDateTimeFormatted,
            eventLocation: eventLocation,
            eventDescriptionHTML: eventDescriptionHtml,
            eventDescriptionText: eventDescriptionText,
            eventSpeakers: eventSpeakersList,
            eventSponsors: eventSponsors,
            isEventDetailsLoading: false
        })
    }

    renderDescriptionSection(){
        if(this.state.eventDescriptionText != '')
            return this.renderDescriptionText()
        return this.renderDescriptionHTML()
    }

    renderDescriptionHTML() {
        return (
            <View style={{paddingHorizontal: 30, paddingVertical: 30}}>
                <HTML html={this.state.eventDescriptionHTML} 
                    imagesMaxWidth={Dimensions.get('window').width - 60}
                    ignoredTags={['br','img']}
                    ignoredStyles={['line-height']}
                />
            </View>
        )
    }
     
    renderDescriptionText() {
        return (
            <View style={styles.eventDescriptionContainer}>
                <ReadMore
                    numberOfLines={5}
                    renderTruncatedFooter={this.renderTruncatedFooter}
                    renderRevealedFooter={this.renderRevealedFooter}>
                    <Text style={styles.eventDescriptionText}>
                        {this.state.eventDescriptionText}
                    </Text>
                </ReadMore>
            </View>
        )            
    }

    renderSpeakersSection() {
        if(this.state.eventSpeakers.length > 0) {
            return (
                <View>
                    <Text style={styles.headingPink}>Speakers</Text>
                    {this.renderSpeakersList(this.state.eventSpeakers)}
                </View>
            )
        }
    }

    renderSpeakersList(eventSpeakersList) {
        return (
            eventSpeakersList.map((speaker, index) => {
                return (
                    <View key={index} style={styles.speakerContainer}>
                        <View style={styles.speakerImageContainer}>
                            <Image
                                style={styles.speakerImage}
                                source={{uri: speaker.imageurl}}
                            />
                        </View>
                        <View style={styles.speakerDescription}>
                            <Text style={styles.speakerName}>{speaker.firstName} {speaker.lastName}</Text>
                            <Text style={styles.speakerTitle}>{speaker.title}, {speaker.company}</Text>
                            <Text style={styles.speakerRole}>{speaker.role}</Text>
                        </View>
                    </View>
                )
            })
        )
    }

    renderSponsorsSection() {
        return (
            <View style={{alignItems: 'center'}}>
                <Text style={styles.headingPink}>Sponsors</Text>
                {
                    this.state.eventSponsors.map((sponsorImageUrl, index) => {
                        return (
                            <AutoHeightImage
                                key={index}
                                resizeMode='contain'
                                width={Dimensions.get('window').width / 3}
                                source={{uri: sponsorImageUrl}}
                                style={{marginVertical: 5}}
                            />
                        )
                    })
                }
            </View>
        )
    }

    render() {
        if(this.state.isEventDetailsLoading) {
            return (
                <View style={styles.activityIndicator}>
                    <ActivityIndicator size="large" color="#ED4969" />
                </View>
            )
        }
        else {
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
                            
                             <AutoHeightImage
                                resizeMode='contain'
                                width={Dimensions.get('window').width}
                                source={{uri: this.state.eventBannerImage}}
                            />

                            <Text style={styles.eventTitle}>
                                {this.state.eventTitle}
                            </Text>

                            <View style={styles.divider}></View>

                            <View style={styles.eventDetailContainer}>
                                <View style={styles.eventDetailIcon}>
                                    <Image source={require('../../images/Events/Event-icons/calendar-3x.png')}
                                        resizeMode='contain'
                                        style={{width:'50%'}}/>
                                </View>
                                <View style={styles.eventDetailTextContainer}>
                                    <Text style={styles.eventDetailText}>
                                        {this.state.eventDateTime}
                                    </Text>
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
                                    <Text style={styles.eventDetailText}>
                                        {this.state.eventLocation}
                                    </Text>
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
                            
                            {this.renderDescriptionSection()}

                            {this.renderSpeakersSection()}

                            {this.renderSponsorsSection()}

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
            )
        }
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

async function getEventDetails(bearerToken, eventId) {
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
    activityIndicator: {
        flex: 1,
        justifyContent: 'center',
        flexDirection: 'row',
        justifyContent: 'space-around',
        padding: 10
    },
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
        // flex: 1,
        // width: null,

        flex: 1,
        alignSelf: 'stretch',
        width: Dimensions.get('window').width
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
        
    },
    sponsorImage: {
        resizeMode: 'contain',
        height: 90,
        marginVertical: 5
    }
});