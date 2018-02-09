import React, { Component } from 'react';
import { StyleSheet, View, Image, SectionList, Text, ActivityIndicator } from 'react-native';
import Header from '../Navigation/Header';
import EventsItem from './EventsItem';

import ApiUtils from '../../utils/ApiUtils'
import { ClientSecrets } from '../../../config/config'

var monthsAbbrev = [
    "JAN",
    "FEB",
    "MAR",
    "APR",
    "MAY",
    "JUN",
    "JUL",
    "AUG",
    "SEP",
    "OCT",
    "NOV",
    "DEC"
]

var datasource = [
    {
        key: 'Upcoming',
        data: [ 
            new eventEntry('8', 'eventName8', 'eventTime8', 'eventLocation8'),
            {
                eventId: '2',
                eventTitle: 'eventTitle2',
                eventTime: 'eventTime2',
                eventLocation: 'eventLocation2'
            }
        ]
    },
    {   
        key: 'Past Events',
        data: [ 
            {
                eventId: '3',
                eventTitle: 'eventTitle3',
                eventTime: 'eventTime3',
                eventLocation: 'eventLocation3'
            },
            {
                eventId: '4',
                eventTitle: 'eventTitle4',
                eventTime: 'eventTime4',
                eventLocation: 'eventLocation4'
            }
        ]
    }
]

function eventEntry(eventId, eventName, eventMonth, eventDate, eventTime, eventLocation) {
    this.eventId = eventId
    this.eventTitle = eventName
    this.eventMonth = eventMonth
    this.eventDate = eventDate
    this.eventTime = eventTime
    this.eventLocation = eventLocation
}

export default class EventsList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isEventListLoading: true,
            sectionListDs: datasource
        }
    }

    async getBearerToken() {
        try {
            let base64 = require('base-64')
            username = ClientSecrets.API_USERNAME;
            password = ClientSecrets.API_PASSWORD;
            basicAuthHeaderValue = 'Basic ' + base64.encode(username + ":" + password)
            console.log(basicAuthHeaderValue)

            let requestAuthTokenBody = {
                'grant_type': 'client_credentials',
                'scope': 'contacts finances events'
            };

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
            console.error(error);
            return null
        }
    }

    async getEventsList(bearerToken) {
        try {
            let requestAuthTokenBody = {
                'grant_type': 'client_credentials',
                'scope': 'contacts finances events'
            };
            
            let getUrl = 'https://api.wildapricot.org/v2/Accounts/' + ClientSecrets.ACCOUNT_NUM + '/Events'
            let response = await fetch(getUrl, 
            {
                method: 'GET',
                headers: {
                    'Authorization': 'Bearer ' + bearerToken
                }
            })
            
            if(response.status != 200) {
                console.log(reponse.status)
                return null
            }
            return response.json()

        } catch(error) {
            console.error(error)
            return null
        }
    }

    async componentDidMount() {
        bearerToken = await this.getBearerToken()
        if(!bearerToken) {
            console.log("Failed to get bearer token")
        }

        eventsListResponse = await this.getEventsList(bearerToken)
        if(!eventsListResponse) {
            console.log("Failed to get events list")
        }
        
        if(!eventsListResponse.hasOwnProperty('Events')) {
            console.log("Failed to get events property")
        }
            
        eventsList = eventsListResponse.Events
            
        var upcomingEvents = []
        var pastEvents = []
        pastEvents.push(new eventEntry(1234, 'eventTitleA', 'JAN', 12, 'eventTimeA', 'eventLocationA'))
        pastEvents.push(new eventEntry(5678, 'eventTitleB', 'JAN', 12, 'eventTimeB', 'eventLocationB'))

        for (i = 0; i < eventsList.length; i++) { 
            let date = new Date(Date.parse(eventsList[i].StartDate))
            console.log(date)
            var entry = new eventEntry(eventsList[i].Id, eventsList[i].Name, monthsAbbrev[date.getMonth()], date.getDate(), eventsList[i].StartDate, eventsList[i].Location)
            console.log(entry)
            upcomingEvents.push(entry)
        }
        
        datasource = [
            {
                key: 'Upcoming',
                data: upcomingEvents
            },
            {   
                key: 'Past Events',
                data: pastEvents
            }
        ]
        this.setState({ 
            sectionListDs: datasource,
            isEventListLoading: false,
        });
    }

    renderItem = (item) => {
        return (
            <EventsItem eventId={Number(item.item.eventId)}
                eventTitle={item.item.eventTitle}
                eventMonth={item.item.eventMonth}
                eventDate={Number(item.item.eventDate)}
                eventTime={item.item.eventTime}
                eventLocation={item.item.eventLocation}/>
            // <Text style={styles.text}>{item.item.name}</Text>
        );
    }

    renderHeader = (headerItem) => {
        return (
            <View style={styles.sectionContainer}>
                <Text style={styles.sectionHeader}>{headerItem.section.key}</Text>
            </View>
        );
    }

    render() {
        if(this.state.isEventListLoading) {
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
                            <View style={styles.menuContainer}></View>
                            <View style={styles.eventsTitleContainer}>
                                <Text style={styles.eventsTitleText}>
                                    Events
                                </Text>
                            </View>
                            <View style={styles.menuContainer}>
                                <Image source={require('../../images/Header/Menu-icon-white-3x.png')}/>
                            </View>
                        </View>
                    </View>
                    <View style={styles.content}>
                        <View style={styles.backgroundContainer}>
                            <Image style={styles.backgroundImage}
                                resizeMode='stretch'
                                source={require('../../images/Events/Events-background.png')}
                            />
                        </View>
                        <View style={styles.overlay}>
                            <SectionList
                                renderItem={this.renderItem}
                                renderSectionHeader={this.renderHeader}
                                sections={this.state.sectionListDs}
                                keyExtractor={(item) => item.eventId}
                                stickySectionHeadersEnabled={false}
                            />
                        </View>
                    </View>
                </View>
            );
        }
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
        flex: 1
    },
    content: {
        flex: 7
    },
    overlay: {
        opacity: 1,
        backgroundColor: 'rgba(0, 0, 0, 0)'
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
    backgroundContainer: {
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
    },
    backgroundImage: {
        flex: 7,
        width: null,
        height: null
    },
    sectionContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        height: 100,
        borderStyle: 'solid',
        borderWidth: 2,
        borderColor: '#DCDCDC'
    },
    sectionHeader: {
        fontFamily: 'alternate-gothic-no3-d-regular',
        fontSize: 36,
        fontWeight: 'bold',
        textAlign: 'center',
        color: '#EA4B6C'
    },
    text: {
        fontSize: 14,
        color: 'rgba(0,0,0,1)',
    }
});