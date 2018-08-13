import React, { Component } from 'react'
import { ActivityIndicator, Text, View, Image, ScrollView, Button, FlatList, Alert} from 'react-native'
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
        // const upcomingEventsList = params ? params.upcomingEvents : null;

        let contactDetailsObj = new ContactDetailsObj(givenUserDetails)
        let contactUpcomingEvents = await contactDetailsObj.getContactEventRegistrationList()
        console.log(contactUpcomingEvents)

        // let contactDetailsObj = new ContactDetailsObj(givenUserDetails)
        // console.log(contactDetailsObj)

        this.setState({
            contactDetails: contactDetailsObj,
            upcomingEvents: contactUpcomingEvents,
            isProfileLoading: false,
        })
    }

    render() {
        // const { params } = this.props.navigation.state;
        // const givenUserDetails = params ? params.userData : null;
        // const upcomingEventsList = params ? params.upcomingEvents : null;

        // let contactDetailsObj = new ContactDetailsObj(givenUserDetails)
        // let contactUpcomingEvents = await contactDetailsObj.getContactEventRegistrationList()
        // console.log("HEEHEE")
        // console.log(contactUpcomingEvents)
        // return this.returnProfileScreenView(contactDetailsObj, contactUpcomingEvents)
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
            <ScrollView contentContainerStyle={styles.container}>
                <Image
                    style={styles.profileLogo}
                    source={require('../../images/Login-Signup/Profile-Pic-Cropped.png')}/>
                <Text style={styles.nameFont}>{userFirstName + " " + userLastName}</Text>
                <Text style={styles.subHeading}>
                    <Image
                        style={styles.imageLogo}
                        source={require('../../images/Login-Signup/YES-logo.png')}/>
                    YES! Vancouver Member
                </Text>
                <Text style={styles.paragraphWithMargin}>First joined on : {userCreationDate.substring(0, 10)}</Text>
                <Text style={styles.subHeading}>Current Membership:</Text>
                <Text style={styles.paragraph}>Since : {userMemberSince.substring(0, 10)}</Text>
                <Text style={styles.paragraph}>Upto : {userRenewalDue.substring(0, 10)} </Text>
                <View style={styles.extendMembershipButtonView}>
                    <Button color="#ED4969" title="Extend membership" onPress={
                        ()=> Alert.alert(
                        'Extended membership',
                        'Your membership has been extended',
                        [
                            {text: "Ok", style:'cancel'}
                        ]
                        )
                    }/>
                </View>

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
