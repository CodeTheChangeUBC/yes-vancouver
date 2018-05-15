import React, { Component } from 'react'
import { StyleSheet, View, Image, SectionList, Text, ActivityIndicator } from 'react-native'
import Header from '../Navigation/Header'
import EventsItem from './EventsItem'

import { getEventsList } from '../../apicalls/Events/EventsList'

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

// Default datasource to be displayed when events list cannot be fetched
var datasource = [
    {
        key: 'Upcoming',
        data: [ 
            new eventEntry(null, 'Failed to retrieve events', '', null, '', '')
        ]
    },
    {   
        key: 'Past Events',
        data: [ 
            new eventEntry(null, 'Failed to retrieve events', '', null, '', '')
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

function getEventsListDataSource(response) {
    let eventsList = null
    try {
        eventsList = eventsListResponse.Events
    } catch (error) {
        console.log("Failed to get events property")
        return null
    }
        
    let upcomingEvents = []
    let pastEvents = []
    let currentDateInMs = Date.now()

    for (i = 0; i < eventsList.length; i++) { 
        if(eventsList[i].AccessLevel != "Public") {
            continue
        }

        let startDate = new Date(Date.parse(eventsList[i].StartDate))
        let endDate = new Date(Date.parse(eventsList[i].EndDate))
        let eventTime = null

        // If multi-day event, just display startDate's month, day and time
        if(startDate.toLocaleDateString() != endDate.toLocaleDateString()) {
            eventTime = formatAMPM(startDate)
        }
        else {
            // If start time and end time same, just display one
            if(startDate.toLocaleTimeString() == endDate.toLocaleTimeString()) {
                eventTime = formatAMPM(startDate)
            }
            else {
                eventTime = formatAMPM(startDate) + ' - ' + formatAMPM(endDate)
            }
        }

        var entry = new eventEntry (
            eventsList[i].Id,
            eventsList[i].Name,
            monthsAbbrev[startDate.getMonth()],
            startDate.getDate(),
            eventTime,
            eventsList[i].Location
        )

        console.log(entry)
        if(startDate.getTime() < currentDateInMs) {
            pastEvents.push(entry)
        }
        else {
            upcomingEvents.push(entry)
        }
    }

    if(upcomingEvents.length == 0) {
        upcomingEvents.push(new eventEntry(null, 'No upcoming events', '', null, '', ''))
    }

    if(pastEvents.length == 0) {
        pastEvents.push(new eventEntry(null, 'No past events', '', null, '', ''))
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
    return datasource
}

export default class EventsList extends Component {
    constructor(props) {
        super(props)
        this.state = {
            isEventListLoading: true,
            sectionListDs: datasource
        }
    }

    async componentDidMount() {
        // bearerToken = await getBearerToken()
        // if(!bearerToken) {
        //     console.log("Failed to get bearer token")
        //     this.setState({isEventListLoading: false})
        //     return
        // }

        // eventsListResponse = await getEventsList(bearerToken)

        eventsListResponse = await getEventsList()
        if(!eventsListResponse) {
            console.log("Failed to get events list from API call")
            this.setState({isEventListLoading: false})
            return
        }
        console.log(eventsListResponse)

        datasourceResult = getEventsListDataSource(eventsListResponse)
        if(!datasourceResult) {
            console.log("Failed to format events list datasource")
            this.setState({isEventListLoading: false})
            return
        }

        this.setState({ 
            sectionListDs: datasource,
            isEventListLoading: false,
        })
    }

    renderItem = (item) => {
        return (
            <EventsItem eventId={Number(item.item.eventId)}
                eventTitle={item.item.eventTitle}
                eventMonth={item.item.eventMonth}
                eventDate={Number.isInteger(item.item.eventDate) ? Number(item.item.eventDate) : null}
                eventTime={item.item.eventTime}
                eventLocation={item.item.eventLocation}
                navigation={this.props.navigation}/>
            // <Text style={styles.text}>{item.item.name}</Text>
        )
    }

    renderHeader = (headerItem) => {
        return (
            <View style={styles.sectionContainer}>
                <Text style={styles.sectionHeader}>{headerItem.section.key}</Text>
            </View>
        )
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
                                <Image source={require('../../images/Header/Menu-icon-white-3x.png')}
                                    resizeMode="contain"
                                    style={{height:30}}/>
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
            )
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
        flex: 1,
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
})