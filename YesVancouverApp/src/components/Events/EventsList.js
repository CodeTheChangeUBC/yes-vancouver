import React, { Component } from 'react'
import { ActivityIndicator, Image, SectionList, StyleSheet, Text, View } from 'react-native'
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
    overlay: {
        flex: 1,
        opacity: 1,
        backgroundColor: 'rgba(0, 0, 0, 0)'
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
