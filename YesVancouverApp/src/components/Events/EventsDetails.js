import React, { Component } from 'react'
import { ActivityIndicator, Dimensions, Image, ScrollView, Share, StyleSheet, Text, TouchableHighlight, TouchableOpacity, View, WebView } from 'react-native'
import Header from '../Navigation/Header'
import ReadMore from '@expo/react-native-read-more-text'
import AutoHeightImage from 'react-native-auto-height-image'
import HTML from 'react-native-render-html';

import { EventDetailsObj } from '../../lib/Events/EventsDetails'

export default class EventsDetails extends Component {
    constructor(props) {
        super(props)
        this.state = {
            isEventDetailsLoading: true,
            eventUrl: '',
            eventBannerImage: '',
            eventTitle: '',
            eventDateTime: '',
            eventLocation: '',
            eventDescriptionHTML: null,
            eventDescriptionText: null,
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
        let eventId = this.props.navigation.state.params.eventId
        let eventsDetailsObj = new EventDetailsObj(eventId)
        let result = await eventsDetailsObj.processEventDetails()
        console.dir(eventsDetailsObj)

        this.setState({
            eventUrl: eventsDetailsObj.url,
            eventBannerImage: eventsDetailsObj.bannerImage,
            eventTitle: eventsDetailsObj.title,
            eventDateTime: eventsDetailsObj.dateTime,
            eventLocation: eventsDetailsObj.location,
            eventDescriptionHTML: eventsDetailsObj.descriptionHTML,
            eventDescriptionText: eventsDetailsObj.descriptionText,
            eventSpeakers: eventsDetailsObj.speakers,
            eventSponsors: eventsDetailsObj.sponsors,
            isEventDetailsLoading: false
        })
    }

    renderBannerImageSection() {
        if(!this.state.eventBannerImage){
            return (
                <AutoHeightImage
                    resizeMode='contain'
                    width={Dimensions.get('window').width}
                    source={require('../../images/Events/Event-Detail-Banner.png')}
                    defaultSource={require('../../images/Events/Event-Detail-Banner.png')}
                />
            )
        }
        
        return (
            <AutoHeightImage
                resizeMode='contain'
                width={Dimensions.get('window').width}
                source={{uri: this.state.eventBannerImage}}
                defaultSource={require('../../images/Events/Event-Detail-Banner.png')}
            />
        )
    }

    renderDescriptionSection() {
        if(this.state.eventDescriptionText != null) {
            return this.renderDescriptionText()
        }
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
                    {
                        this.state.eventSpeakers.map((speaker, index) => {
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
                    }
                </View>
            )
        }
    }

    renderSponsorsSection() {
        if(this.state.eventSponsors.length > 0) {
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
    }

    renderRegisterButton(isVisible) {
        if(isVisible) {
            return(
                <View style={styles.registerButtonContainer}>
                    <View style={styles.registerButtonSpacer}></View>
                    <TouchableOpacity style={styles.registerButtonRectangle}
                        onPress={() => {
                            this.props.navigation.navigate("EventsRegistration", 
                            {eventUrl: this.state.eventUrl})
                        }
                    }>
                        <Text style={styles.registerButtonText}>Register</Text>
                    </TouchableOpacity>
                    <View style={styles.registerButtonSpacer}></View>
                </View>
            )
        }
    }

    shareEventDetails() {
        Share.share({   
            title: this.state.eventTitle,
            message: 'Check out this awesome event! ' + this.state.eventTitle + ' - ' + this.state.eventUrl
        })
        .then(result => console.log(result))
        .catch(errorMsg => console.log(errorMsg))
    }

    shareEventLink() {
        Share.share({   
            title: this.state.eventTitle,
            message: this.state.eventUrl
        })
        .then(result => console.log(result))
        .catch(errorMsg => console.log(errorMsg))
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
                        <ScrollView>

                            {this.renderBannerImageSection()}

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
                            
                            {this.renderRegisterButton(true)}
                            
                            {this.renderDescriptionSection()}

                            {this.renderSpeakersSection()}

                            {this.renderSponsorsSection()}

                            {this.renderRegisterButton(!(this.state.eventSpeakers.length == 0 && this.state.eventSponsors.length == 0))}

                            <Text style={styles.headingGrey}>Share</Text>

                            <View style={styles.socialMediaContainer}>
                                <View style={{flex:2}}></View>
                                <TouchableOpacity style={styles.shareIcon}
                                    onPress={() => this.shareEventDetails()}>
                                    <Image
                                        source={require('../../images/Events/Share-icons/Twitter-3x.png')}
                                        resizeMode='center'
                                    />
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.shareIcon}
                                    onPress={() => this.shareEventDetails()}>
                                    <Image
                                        source={require('../../images/Events/Share-icons/Facebook-3x.png')}
                                        resizeMode='center'
                                    />
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.shareIcon}
                                    onPress={() => this.shareEventDetails()}>
                                    <Image
                                        source={require('../../images/Events/Share-icons/Email-3x.png')}
                                        resizeMode='center'
                                    />
                                </TouchableOpacity>
                                <View style={{flex:2}}></View>
                            </View>

                            <Text style={styles.copyLinkText}
                                onPress={() => {this.shareEventLink()}}>
                                Copy Link
                            </Text>
                            
                        </ScrollView>
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
        paddingBottom: 10
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
        flex: 1,
        alignItems: 'center',
        paddingHorizontal: 5
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
    sponsorImage: {
        resizeMode: 'contain',
        height: 90,
        marginVertical: 5
    }
})