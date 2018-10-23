import React, { Component } from 'react'
import { ActivityIndicator, Alert, FlatList, Image, ScrollView, Text, TouchableOpacity, View } from 'react-native'
import { styles } from './ProfileStyleSheet'
import { ContactDetailsObj } from '../../lib/Profile/ContactDetails'
import Accordion from 'react-native-collapsible/Accordion'
import { authenticateContactLogin } from '../../apicalls/Authentication/AuthToken'
import { getCurrentContactDetails } from '../../apicalls/Profile/ProfileDetails'


export default class ProfileDetails extends Component {
    constructor(props) {
        super(props)
        this.state = {
            isProfileLoading: true,
            contactDetails: null,
            pastEvents: null,
            upcomingEvents: null
        }
    }

    async refreshProfileDetails() {
        let contactEmail = await Expo.SecureStore.getItemAsync("contactEmail")
        let contactPassword = await Expo.SecureStore.getItemAsync("contactPassword")
        let contactAuthenticationToken = await authenticateContactLogin(contactEmail, contactPassword)
        
        let contactDetailsJson = await getCurrentContactDetails(contactAuthenticationToken)

        let contactDetailsObj = new ContactDetailsObj()
        contactDetailsObj.setCustomFields(contactDetailsJson)
        contactDetailsObj.setPassword(contactPassword)

        this.setState({
            contactDetails: contactDetailsObj,
            isProfileLoading: false
        })
    }

    async componentDidMount(){
        let contactEmail = await Expo.SecureStore.getItemAsync("contactEmail")
        let contactPassword = await Expo.SecureStore.getItemAsync("contactPassword")
        let contactAuthenticationToken = await authenticateContactLogin(contactEmail, contactPassword)
        
        let contactDetailsJson = await getCurrentContactDetails(contactAuthenticationToken)
        let contactDetailsObj = new ContactDetailsObj()
        contactDetailsObj.setCustomFields(contactDetailsJson)
        contactDetailsObj.setPassword(contactPassword)

        let contactRegisteredEvents = await contactDetailsObj.getContactEventRegistrationList()

        this.setState({
            contactDetails: contactDetailsObj,
            pastEvents: contactRegisteredEvents.pastEvents,
            upcomingEvents: contactRegisteredEvents.upcomingEvents,
            isProfileLoading: false,
        })
    }

    render() {
        if(this.state.isProfileLoading) {
            return (
                <View style={styles.activityIndicator}>
                    <ActivityIndicator size="large" color="#ED4969" />
                </View>
            )
        }
        else {
            return this.returnProfileScreenView()
        }
    }

    _renderEventsHeader(section, _, isActive) {
        return (
            <View style={styles.eventsHeaderContainer}>
                {(isActive) ? 
                    <Image
                        style={styles.eventsHeaderIcon}
                        source={require('../../images/Settings/Arrow-open.png')}
                        transform={[{rotate: '90deg'}]}/>
                    : 
                    <Image
                        style={styles.eventsHeaderIcon}
                        source={require('../../images/Settings/Arrow-open.png')}/>
                }
                <View style={{marginRight: 10}}/>
                <Text style={styles.subHeading}>
                    {section.title}
                </Text>
            </View>
        );
    }
     
    _renderEventsContent(section) {
        if(section.content.length == 0) {
            return (
                <Text style={styles.paragraph}>No events</Text>
            )
        }
        else {
            return (
                <FlatList
                    data = {section.content}
                    renderItem={({item}) => 
                        <Text style={styles.paragraph}>
                            {item.date} | {item.name}
                        </Text>
                    }
                />
            )
        }
    }

    returnProfileScreenView(){
        
        let userID = this.state.contactDetails.id
        let userFirstName = this.state.contactDetails.firstName
        let userLastName = this.state.contactDetails.lastName
        let userEmail = this.state.contactDetails.email       
        let userPhone = this.state.contactDetails.phone
        let userPassword = this.state.contactDetails.userPassword

        let userMembershipLevel = this.state.contactDetails.membershipLevel
        let userMemberSince = this.state.contactDetails.memberSince
        let userMemberStatus = this.state.contactDetails.memberStatus
        let userRenewalDue = this.state.contactDetails.renewalDue

        let userCompany = this.state.contactDetails.company
        let userJobTitle = this.state.contactDetails.jobTitle
        let userLinkedIn = this.state.contactDetails.linkedIn
        let userFacebook = this.state.contactDetails.facebook
        let userInstagram = this.state.contactDetails.instagram
        let userTwitter = this.state.contactDetails.twitter
        let userWebsite = this.state.contactDetails.website

        let userOtherInfo = this.state.contactDetails.otherInfo
        let userProfilePhotoUrl = this.state.contactDetails.profilePhoto

        let upcomingEventsList = this.state.upcomingEvents
        let pastEventsList = this.state.pastEvents
        
        let contactInfoRows = [
            {
                icon: require('../../images/Settings/iconmonstr-email-4.png'),
                value: userEmail
            },
            {
                icon: require('../../images/Settings/iconmonstr-phone-1.png'),
                value: userPhone
            },
            {
                icon: require('../../images/Settings/iconmonstr-company.png'),
                value: userCompany
            },
            {
                icon: require('../../images/Settings/iconmonstr-user16.png'),
                value: userJobTitle
            },
            {
                icon: require('../../images/Settings/iconmonstr-linkedin-1.png'),
                value: userLinkedIn
            },
            {
                icon: require('../../images/Settings/iconmonstr-facebook.png'),
                value: userFacebook
            },
            {
                icon: require('../../images/Settings/iconmonstr-instagram-6-3x.png'),
                value: userInstagram
            },
            {
                icon: require('../../images/Settings/iconmonstr-twitter-1-3x.png'),
                value: userTwitter
            },
            {
                icon: require('../../images/Settings/iconmonstr-globe-5.png'),
                value: userWebsite
            },
            {
                icon: require('../../images/Settings/iconmonstr-info.png'),
                value: userOtherInfo
            }
        ]

        let { navigate } = this.props.navigation;
        return (
            <ScrollView style={{backgroundColor: '#fff'}} contentContainerStyle={styles.container}>
                <View style={{marginBottom: 30}}/>

                <Image
                    style={{alignContent:'center',
                    justifyContent: 'center',
                    width: 200,
                    height: 200,
                    borderRadius: 100}}
                    source={require('../../images/Login-Signup/Profile-Pic-Cropped.png')}/>

                <View style={{marginBottom: 30}}/>

                <Text style={styles.nameFont}>
                    {userFirstName + " " + userLastName}
                </Text>

                <View style={{marginBottom: 30}}/>
                
                <View style={{flexDirection: 'row'}}>
                    <Image style={styles.imageLogo}
                        source={require('../../images/Login-Signup/YES-logo.png')}/>
                    <View style={{marginRight: 10}}/>
                    <View style={{flexDirection: 'column'}}>
                        <Text style={[styles.subHeading, {textAlign:'center'}]}>
                            YES! Vancouver Member
                        </Text>
                        <Text style={[styles.paragraph, {textAlign:'center'}]}>
                            First joined on: {userMemberSince}
                        </Text>
                    </View>
                </View>

                <View style={{marginBottom: 30}}/>

                <Text style={styles.subHeading}>
                    Membership Information
                </Text>

                <Text style={styles.paragraph}>Level: {userMembershipLevel}</Text>
                <Text style={styles.paragraph}>Status: {userMemberStatus}</Text>
                <Text style={styles.paragraph}>Renewal due: {userRenewalDue} </Text>

                <View style={{marginBottom: 30}}/>

                <View style={styles.buttonContainer}>
                    <View style={styles.buttonSpacer} />
                    <TouchableOpacity style={styles.button}
                        onPress={()=> Alert.alert(
                            'Extended membership',
                            'Your membership has been extended',
                            [
                                {text: "Ok", style:'cancel'}
                            ]
                            )}>
                        <Text style={styles.buttonText}>Extend membership</Text>
                    </TouchableOpacity>
                    <View style={styles.buttonSpacer} />
                </View>

                <View style={{marginBottom: 30}}/>

                <Text style={styles.subHeading}>
                    My Contact Information
                </Text>

                <View style={{marginBottom: 15}}/>

                <View style={{flexDirection: 'column'}}>
                {
                    contactInfoRows.map((row, index) => {
                        return (
                            <View key={index} style={styles.contactInfoRow}>
                                <Image
                                    style={styles.contactInfoRowImage}
                                    resizeMode='contain'
                                    source={row.icon}/>
                                <View style={styles.contactInfoRowSpacer}/>
                                <Text style={styles.paragraph}>
                                    {row.value}
                                </Text>
                            </View>
                        )
                    })
                }
                </View>

                <View style={{marginBottom: 30}}/>

                <View style={styles.buttonContainer}>
                    <View style={styles.buttonSpacer} />
                    <TouchableOpacity style={styles.button}
                        onPress={()=> navigate('EditProfile', 
                            {'contactDetails' : this.state.contactDetails,
                             refreshProfileDetails: () => this.refreshProfileDetails()})}>
                        <Text style={styles.buttonText}>Edit Contact Info</Text>
                    </TouchableOpacity>
                    <View style={styles.buttonSpacer} />
                </View>

                <View style={{marginBottom: 15}}/>

                <View style={styles.buttonContainer}>
                    <View style={styles.buttonSpacer} />
                    <TouchableOpacity style={styles.button}
                        onPress={()=> navigate('ChangePassword')}>
                        <Text style={styles.buttonText}>Change Password</Text>
                    </TouchableOpacity>
                    <View style={styles.buttonSpacer} />
                </View>

                <View style={{marginBottom: 30}}/>

                <View style={styles.eventsAccordianContainer}>
                    <Accordion
                        sections={[{
                            title: 'My Upcoming Events',
                            content: upcomingEventsList
                        }]}
                        renderHeader={this._renderEventsHeader}
                        renderContent={this._renderEventsContent}
                        underlayColor='#fff'
                    />

                    <View style={{marginBottom: 15}}/>

                    <Accordion
                        sections={[{
                            title: 'My Past Events',
                            content: pastEventsList
                        }]}
                        renderHeader={this._renderEventsHeader}
                        renderContent={this._renderEventsContent}
                        underlayColor='#fff'
                    />
                </View>

                <View style={{marginBottom: 60}}/>

            </ScrollView>
        )
    }
}
