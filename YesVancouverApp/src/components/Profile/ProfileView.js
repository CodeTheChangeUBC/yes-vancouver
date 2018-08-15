import React, { Component } from 'react'
import { ActivityIndicator, Alert, Button, FlatList, Image, ScrollView, Text, TouchableOpacity, View } from 'react-native'
import { styles } from './ProfileStyleSheet'
import { ContactDetailsObj } from '../../lib/Profile/ContactDetails'

export default class ProfileView extends Component {
    constructor(props) {
        super(props)
        this.state = {
            isProfileLoading: true,
            contactDetails: null,
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
        let contactUpcomingEvents = await contactDetailsObj.getContactEventRegistrationList()
        console.log(contactUpcomingEvents)

        this.setState({
            contactDetails: contactDetailsObj,
            upcomingEvents: contactUpcomingEvents,
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

                <Text style={styles.nameFont}>My contact information</Text>
                <Text style={styles.contactInfo}>
                    <Image
                        style={styles.imageLogo}
                        source={require('../../images/Settings/iconmonstr-email-4.png')}/>
                    |     {userEmail}
                </Text>
                <Text style={styles.contactInfo}>
                    <Image
                        style={styles.imageLogo}
                        source={require('../../images/Settings/iconmonstr-phone-1.png')}/>
                    |     {userPhone}
                </Text>
                <Text style={styles.contactInfo}>
                    <Image
                        style={styles.imageLogo}
                        source={require('../../images/Settings/iconmonstr-linkedin-1.png')}/>
                    |     {userLinkedIn}
                </Text>
                <View style={styles.buttonView}>
                    <Button color="#ED4969" title="Edit Contact Information" onPress={
                        ()=> navigate('EditProfile', {'userID' : userID,
                                                      'userFirstName' : userFirstName,
                                                      'userLastName' : userLastName,
                                                      'userEmail': userEmail,
                                                      'userPhone' : userPhone,
                                                      'userLinkedIn' : userLinkedIn})
                    }/>
                </View>
                <View style={styles.buttonView}>
                    <Button color="#ED4969" title="Change Password" onPress={
                        ()=> Alert.alert(
                            'Password Changed',
                            'Your password has been changed',
                            [
                                {text: "Ok", style:'cancel'}
                            ]
                        )
                    }/>
                </View>
                <Text style={styles.dropDown}>
                    <Image
                        style={styles.imageLogo}
                        source={require('../../images/Settings/Arrow-open.png')}/>
                    My events
                </Text>
                <FlatList
                    style = {styles.flatList}
                    data = {upcomingEventsList}
                    renderItem={({item}) => <Text>{item.date} | {item.name}</Text>}
                />
            </ScrollView>
        );
    }
}
