import React, { Component } from 'react'
import { StyleSheet, View, Image, SectionList, Text, ActivityIndicator } from 'react-native'
import Header from '../Navigation/Header'
import EventsItem from './EventsItem'

import { EventsListObj } from '../../lib/Events/EventsList'


export default class EventsList extends Component {
    constructor(props) {
        super(props)
        this.state = {
            isEventListLoading: true,
            sectionListDs: new EventsListObj().getDatasourceFailed()
        }
    }

    async componentDidMount() {
        let datasourceResult = await new EventsListObj().getDataSource()
        if(!datasourceResult) {
            console.log("Failed to format events list datasource")
            this.setState({isEventListLoading: false})
            return
        }
        else{
            this.setState({ 
                sectionListDs: datasourceResult,
                isEventListLoading: false,
            })
        }
    }

    renderItem = (item) => {
        return (
            <EventsItem
                eventId={Number(item.item.id)}
                eventTitle={item.item.title}
                eventMonth={item.item.month}
                eventDate={Number.isInteger(item.item.date) ? Number(item.item.date) : null}
                eventTime={item.item.time}
                eventLocation={item.item.location}
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
                                keyExtractor={(item) => item.id}
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
