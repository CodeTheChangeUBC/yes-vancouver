import React, { Component } from 'react'
import { ActivityIndicator, Alert, Button, FlatList, Image, ScrollView, Text, TouchableOpacity, View } from 'react-native'
import { styles } from './ProfileStyleSheet'
import { ContactDetailsObj } from '../../lib/Profile/ContactDetails'
import Accordion from 'react-native-collapsible/Accordion'


export default class ProfileView extends Component {
    constructor(props) {
        super(props)
        this.state = {
            isProfileLoading: true,
            contactDetails: null,
            pastEvents: null,
            upcomingEvents: null
        }
    }

    static navigationOptions = {
        tabBarLabel: 'ProfileView',
        tabBarIcon: ({ focused, tintColor }) => focused ?
        ( <Image 
            source={require('../../images/NavBar/Profile-icon-white-3x.png')}
            resizeMode="contain"
            style={{height:30}}/> 
        ) :
        ( <Image 
            source={require('../../images/NavBar/Profile-icon-orange-3x.png')}
            resizeMode="contain"
            style={{height:30}}/>
        )
    };

    async componentDidMount(){
        const { params } = this.props.navigation.state;
        const givenUserDetails = params ? params.userData : null;

        let contactDetailsObj = new ContactDetailsObj(givenUserDetails)
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
            <View style={{flexDirection: 'row', justifyContent:'flex-start', marginVertical: 10}}>
                {(isActive) ? 
                    <Image
                        style={{width:20, height: 20}}
                        source={require('../../images/Settings/Arrow-open.png')}
                        transform={[{rotate: '90deg'}]}/>
                : 
                    <Image
                        style={{width:20, height: 20}}
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
                    style = {styles.flatList}
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
        let userMemberSince = this.state.contactDetails.memberSince
        let userRenewalDue = this.state.contactDetails.renewalDue
        let userLinkedIn = this.state.contactDetails.linkedIn
        let userCreationDate = "NO VALUE"
        let upcomingEventsList = this.state.upcomingEvents
        let pastEventsList = this.state.pastEvents
        let userProfilePictureUrl = this.state.contactDetails.profilePhoto

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
                        <Text style={styles.subHeading}>
                            YES! Vancouver Member
                        </Text>
                        <Text style={styles.paragraph}>
                            First joined on : {userCreationDate.substring(0, 10)}
                        </Text>
                    </View>
                </View>

                <View style={{marginBottom: 30}}/>

                <Text style={styles.subHeading}>Membership Information</Text>
                <Text style={styles.paragraph}>Level: membershiplevel</Text>
                <Text style={styles.paragraph}>Status: {userMemberSince.substring(0, 10)}</Text>
                <Text style={styles.paragraph}>Renewal due: {userRenewalDue.substring(0, 10)} </Text>

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
                    <View style={styles.contactInfoRow}>
                        <Image
                            style={styles.contactInfoRowImage}
                            resizeMode='contain'
                            source={require('../../images/Settings/iconmonstr-email-4.png')}/>
                        <View style={styles.contactInfoRowSpacer}/>
                        <Text style={styles.paragraph}>
                            {userEmail}
                        </Text>
                    </View>

                    <View style={styles.contactInfoRow}>
                        <Image
                            style={styles.contactInfoRowImage}
                            resizeMode='contain'
                            source={require('../../images/Settings/iconmonstr-phone-1.png')}/>
                        <View style={styles.contactInfoRowSpacer}/>
                        <Text style={styles.paragraph}>
                            {userPhone}
                        </Text>
                    </View>

                   <View style={styles.contactInfoRow}>
                        <Image
                            style={styles.contactInfoRowImage}
                            resizeMode='contain'
                            source={require('../../images/Settings/iconmonstr-linkedin-1.png')}/>
                        <View style={styles.contactInfoRowSpacer}/>
                        <Text style={styles.paragraph}>
                            {userLinkedIn}
                        </Text>
                    </View>

                    <View style={styles.contactInfoRow}>
                        <Image
                            style={styles.contactInfoRowImage}
                            resizeMode='contain'
                            source={require('../../images/Settings/iconmonstr-company.png')}/>
                        <View style={styles.contactInfoRowSpacer}/>
                        <Text style={styles.paragraph}>
                            Company
                        </Text>
                    </View>

                    <View style={styles.contactInfoRow}>
                        <Image
                            style={styles.contactInfoRowImage}
                            resizeMode='contain'
                            source={require('../../images/Settings/iconmonstr-user16.png')}/>
                        <View style={styles.contactInfoRowSpacer}/>
                        <Text style={styles.paragraph}>
                            Job title
                        </Text>
                    </View>

                    <View style={styles.contactInfoRow}>
                        <Image
                            style={styles.contactInfoRowImage}
                            resizeMode='contain'
                            source={require('../../images/Settings/iconmonstr-info.png')}/>
                        <View style={styles.contactInfoRowSpacer}/>
                        <Text style={styles.paragraph}>
                            Other info
                        </Text>
                    </View>

                    <View style={styles.contactInfoRow}>
                        <Image
                            style={styles.contactInfoRowImage}
                            resizeMode='contain'
                            source={require('../../images/Settings/iconmonstr-facebook.png')}/>
                        <View style={styles.contactInfoRowSpacer}/>
                        <Text style={styles.paragraph}>
                            Facebook
                        </Text>
                    </View>

                    <View style={styles.contactInfoRow}>
                        <Image
                            style={styles.contactInfoRowImage}
                            resizeMode='contain'
                            source={require('../../images/Settings/iconmonstr-instagram-6-3x.png')}/>
                        <View style={styles.contactInfoRowSpacer}/>
                        <Text style={styles.paragraph}>
                            Instagram
                        </Text>
                    </View>

                    <View style={styles.contactInfoRow}>
                        <Image
                            style={styles.contactInfoRowImage}
                            resizeMode='contain'
                            source={require('../../images/Settings/iconmonstr-twitter-1-3x.png')}/>
                        <View style={styles.contactInfoRowSpacer}/>
                        <Text style={styles.paragraph}>
                            Twitter
                        </Text>
                    </View>

                    <View style={styles.contactInfoRow}>
                        <Image
                            style={styles.contactInfoRowImage}
                            resizeMode='contain'
                            source={require('../../images/Settings/iconmonstr-globe-5.png')}/>
                        <View style={styles.contactInfoRowSpacer}/>
                        <Text style={styles.paragraph}>
                            Website
                        </Text>
                    </View>

                    <View style={styles.contactInfoRow}>
                        <Image
                            style={styles.contactInfoRowImage}
                            resizeMode='contain'
                            source={require('../../images/Settings/iconmonstr-info.png')}/>
                        <View style={styles.contactInfoRowSpacer}/>
                        <Text style={styles.paragraph}>
                            Other info
                        </Text>
                    </View>
                </View>

                <View style={{marginBottom: 30}}/>

                <View style={styles.buttonContainer}>
                    <View style={styles.buttonSpacer} />
                    <TouchableOpacity style={styles.button}
                        onPress={()=> navigate('EditProfile', {'userID' : userID,
                        'userFirstName' : userFirstName,
                        'userLastName' : userLastName,
                        'userEmail': userEmail,
                        'userPhone' : userPhone,
                        'userLinkedIn' : userLinkedIn})}>

                        <Text style={styles.buttonText}>Edit Contact Info</Text>
                    </TouchableOpacity>
                    <View style={styles.buttonSpacer} />
                </View>

                <View style={{marginBottom: 15}}/>

                <View style={styles.buttonContainer}>
                    <View style={styles.buttonSpacer} />
                    <TouchableOpacity style={styles.button}
                        onPress={()=> Alert.alert(
                            'Password Changed',
                            'Your password has been changed',
                            [
                                {text: "Ok", style:'cancel'}
                            ]
                        )}>
                        <Text style={styles.buttonText}>Change Password</Text>
                    </TouchableOpacity>
                    <View style={styles.buttonSpacer} />
                </View>

                <View style={{marginBottom: 30}}/>

                <View style={{flexDirection:'column', justifyContent:'flex-start'}}>
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
        );
    }
}
