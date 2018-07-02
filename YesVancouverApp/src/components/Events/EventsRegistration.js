import React, { Component } from 'react'
import { ActivityIndicator, Image, StyleSheet, Text, TouchableOpacity, View, WebView } from 'react-native'

import Header from '../Navigation/Header'


export default class EventsRegistration extends Component {
    constructor(props) {
        super(props)
        this.state = {
            isEventListLoading: true,
            eventUrl: this.props.navigation.state.params.eventUrl
        }
    }

    async componentDidMount() {
        this.setState({
            isEventListLoading: false
        })
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
                            <TouchableOpacity onPress={() => {this.props.navigation.pop()}} 
                                    style={styles.backArrowContainer}>
                                <Image source={require('../../images/Header/White-arrow-3x.png')}
                                    resizeMode='contain'
                                    style={{height:'50%'}}/>
                            </TouchableOpacity>
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
                        <WebView
                            source={{uri: this.state.eventUrl}}
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
    }
})
