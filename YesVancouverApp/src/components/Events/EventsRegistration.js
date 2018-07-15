import React, { Component } from 'react'
import { ActivityIndicator, StyleSheet, View, WebView } from 'react-native'


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
                <WebView source={{uri: this.state.eventUrl}} />
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
    }
})
