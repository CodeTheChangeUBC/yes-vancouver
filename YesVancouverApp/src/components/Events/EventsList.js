import React, { Component } from 'react';
import { StyleSheet, View, Image, SectionList, Text } from 'react-native';
import Header from '../Navigation/Header';
import EventsItem from './EventsItem';

import ApiUtils from '../../utils/ApiUtils'
import { ClientSecrets } from '../../../config/config'

const datasource = [
    {data: [ {name: 'Event1'}, {name: 'Event2'} ], key: 'Upcoming'},
    {data: [ {name: 'Event3'}, {name: 'Event4'}, {name: 'Event5'} ], key: 'Past Events'}
]

export default class EventsList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: true
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
            return await response.json()
        } catch(error) {
            console.error(error);
        }
    }

    async componentDidMount() {
        bearerToken = await this.getBearerToken()
        console.log(await this.getEventsList(bearerToken))
    }

    renderItem = (item) => {
        return (
            <EventsItem />
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
                            <Image source={require('../../images/Header/Menu-icon-white@3x.png')}/>
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
                            sections={datasource}
                            keyExtractor={(item) => item.name}
                            stickySectionHeadersEnabled={false}
                        />
                    </View>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
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