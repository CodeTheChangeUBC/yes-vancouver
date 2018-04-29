import React, { Component } from 'react';
import {Text, View, Image, ScrollView, Button, FlatList, Alert} from 'react-native';
import {styles} from './ProfileStyleSheet'

export default class ProfileView extends Component {

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

    render() {
        const { params } = this.props.navigation.state;
        const givenUserDetails = params ? params.userData : null;
        const upcomingEventsList = params ? params.upcomingEvents : null;

        let profileFieldTableDictionary = this.constructProfileFieldTableDictionary(givenUserDetails);
        let userID = Number(this.accessProfileFieldTableDictionary(givenUserDetails, "Id"));
        let userFirstName = this.accessProfileFieldTableDictionary(givenUserDetails, "FirstName");
        let userLastName = this.accessProfileFieldTableDictionary(givenUserDetails, "LastName");
        let userEmail = this.accessProfileFieldTableDictionary(givenUserDetails, "Email");
        let userPhone = this.accessProfileFieldTableDictionary(profileFieldTableDictionary, "Phone");
        let userMemberSince = this.accessProfileFieldTableDictionary(profileFieldTableDictionary, "Member since");
        let userRenewalDue = this.accessProfileFieldTableDictionary(profileFieldTableDictionary, "Renewal due");
        let userLinkedIn = this.accessProfileFieldTableDictionary(profileFieldTableDictionary, "Linkedin");
        let userCreationDate = this.accessProfileFieldTableDictionary(profileFieldTableDictionary, "Creation date");

        return this.returnProfileScreenView(userID, userFirstName, userLastName, userEmail, userPhone, userMemberSince,
            userRenewalDue, userLinkedIn, userCreationDate, upcomingEventsList);
    }

    constructProfileFieldTableDictionary(givenUserDetails){
        let profileDictionary = {};
        givenUserDetails["FieldValues"].forEach(function (miniObject) {
            profileDictionary[miniObject["FieldName"].toString()] = miniObject["Value"]
        });
        return profileDictionary;
    }

    accessProfileFieldTableDictionary(dictionary, key){
        if (dictionary[key] === undefined){
            return "No Value";
        }
        return dictionary[key];
    }

    returnProfileScreenView(userID, userFirstName, userLastName, userEmail, userPhone, userMemberSince, userRenewalDue,
                            userLinkedIn, userCreationDate, upcomingEventsList, userProfilePictureUrl){
        let {navigate} = this.props.navigation;
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
