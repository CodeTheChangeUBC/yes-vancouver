import React, { Component } from 'react'
import { ActivityIndicator, Dimensions, Image, ScrollView, StyleSheet, Text, TouchableHighlight, TouchableOpacity, View, WebView } from 'react-native'
import Header from '../Navigation/Header'
import ReadMore from '@expo/react-native-read-more-text'

import ApiUtils from '../../utils/ApiUtils'
import { ClientSecrets } from '../../../config/config'

import HTML from 'react-native-render-html';
// const htmlContent = `
//     <h1>This HTML snippet is now rendered with native components !</h1>
//     <h2>Enjoy a webview-free and blazing fast application</h2>
//     <img src="https://i.imgur.com/dHLmxfO.jpg?2" />
//     <em style="textAlign: center;">Look at how happy this native cat is</em>
// `;

const htmlContent = `
<p>This is a sample event. You can modify or delete it from the Events module.</p>    <div>    <br>      <div>      <font size="2"><img src="/Resources/Pictures/imageWA.png" title="" alt="" height="160" align="left" border="0" width="160" style="margin: 7px;"></font>    </div>      <div>      <span style="line-height: 1.5;">You can&nbsp;</span><em style="line-height: 1.5;"><strong>format</strong></em><span style="line-height: 1.5;">&nbsp;the description&nbsp;of the event, and include&nbsp;and links to pages, sites, and documents.</span>    </div>  </div><!-- Comment -->
`

// const htmlContent = `
// <p>This is another sample event. With Wild Apricot's Events module, you can set up any number of events and publish them in an events calendar on your Wild Apricot site (or another website). From the events calendar, visitors can view event details, sign up for events, register guests, and pay registration fees online.</p>    <p style="margin-top: 0px;"><br>  You can organize various types of events, including:<br></p>    <ul>    <li>conventions, conferences, and seminars<br></li>      <li>board meetings<br></li>      <li>training sessions and webinars<br></li>      <li>social events<br></li>  </ul>    <div>    If you want to learn more, please visit our&nbsp;<a href="http://help.wildapricot.com/display/DOC/Getting+started+with+events">Events help page</a>.  </div>
// `

// const htmlContent = `
// <p>This is another sample event. This one spans several days.</p>    <p>From the Events module, you can specify the event name, location, date, and cost, and control whether visitors to your site can see and register for the event.</p>To learn more about event management, visit our&nbsp;<a href="http://help.wildapricot.com/display/DOC/Events" target="_blank">Events help</a>&nbsp;section.<br>
// `

function speaker(firstName, lastName, title, company, role) {
    this.firstName = firstName
    this.lastName = lastName
    this.title = title
    this.company = company
    this.role = role
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

export default class EventsDetails extends Component {
    constructor(props) {
        super(props)
        this.state = {
            isEventDetailsLoading: true,
            eventBanner: '',
            eventTitle: '',
            eventDateTime: '',
            eventLocation: '',
            eventDescription: '',
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

        let eventTitle = eventsListResponse.Name
        let eventLocation = eventsListResponse.Location
        let eventStartDateTime = new Date(Date.parse(eventsListResponse.StartDate))
        let eventEndDateTime = new Date(Date.parse(eventsListResponse.EndDate))
        let eventDateTimeFormatted = formatDateTime(eventStartDateTime, eventEndDateTime)

        this.setState({
            eventTitle: eventTitle,
            eventDateTime: eventDateTimeFormatted,
            eventLocation: eventLocation,
            eventDescription: 'Sample Description',
            isEventDetailsLoading: false
        })
    }

    renderSpeakers() {
        let speakersArr = [
            new speaker('FirstName1', 'LastName1', 'Title1', 'Company1', 'Role1'),
            new speaker('FirstName2', 'LastName2', 'Title2', 'Company2', 'Role2'),
            new speaker('FirstName3', 'LastName3', 'Title3', 'Company3', 'Role3'),
            new speaker('FirstName4', 'LastName4', 'Title4', 'Company4', 'Role4'),
            new speaker('FirstName5', 'LastName5', 'Title5', 'Company5', 'Role5'),
        ]

        return speakersArr.map((speaker, index) => {
            return (
                <View key={index} style={styles.speakerContainer}>
                    <View style={styles.speakerImageContainer}>
                        <Image
                            style={styles.speakerImage}
                            source={require('../../images/Events/Blank-Profile-Picture.png')}
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
    }
    
    render() {
        if(this.state.isEventDetailsLoading) {
            return (
                <View style={styles.activityIndicator}>
                    <ActivityIndicator size="large" color="#ED4969" />
                </View>
                // <ScrollView style={{ flex: 1 }}>
                
            // </ScrollView>
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
                            <Image 
                                style={styles.bannerImage}
                                resizeMode='stretch'
                                source={require('../../images/Events/Event-Detail-Banner.png')}
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
                            
                            <View style={{paddingHorizontal: 30, paddingVertical: 30}}>
                                <HTML html={htmlContent} 
                                    imagesMaxWidth={Dimensions.get('window').width - 60}
                                    ignoredTags={['br','img']}
                                    ignoredStyles={['line-height']}
                                />
                            </View>

                            <View style={styles.eventDescriptionContainer}>
                                <ReadMore
                                    numberOfLines={5}
                                    renderTruncatedFooter={this.renderTruncatedFooter}
                                    renderRevealedFooter={this.renderRevealedFooter}>
                                    <Text style={styles.eventDescriptionText}>
                                        {this.state.eventDescription}
                                    </Text>
                                </ReadMore>
                            </View>

                            <Text style={styles.headingPink}>Speakers</Text>
                            {this.renderSpeakers()}

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