import React, { Component } from 'react'
import { ActivityIndicator, Alert, Button, ScrollView, Text, TextInput, View } from 'react-native'
import { styles } from './ProfileStyleSheet'
import {updateContactDetails, getContactEventRegistrationList, getIndividualContactsList} from './FetchUserDetails'


export default class EditProfile extends Component{
    constructor(props) {
        super(props)
        this.state = {
            isEditProfileLoading: true,
            contactDetails: null
        }
    }

    userId = ''
    newContactFirstName = ''
    newContactLastName = ''
    newContactEmail = ''
    newContactPhone = ''
    newContactCompany = ''
    newContactJobTitle = ''
    newContactLinkedIn = ''
    newContactFacebook = ''
    newContactInstagram = ''
    newContactTwitter = ''
    newContactWebsite = ''
    newContactOtherInfo = ''

    async componentDidMount(){
        let { params } = this.props.navigation.state;
        let contactDetails = params ? params.contactDetails : null
        console.log(contactDetails)

        this.userID = contactDetails.id
        this.newContactFirstName = contactDetails.firstName
        this.newContactLastName = contactDetails.lastName
        this.newContactEmail = contactDetails.email
        this.newContactPhone = contactDetails.phone
        this.newContactCompany = contactDetails.company
        this.newContactJobTitle = contactDetails.jobTitle
        this.newContactLinkedIn = contactDetails.linkedIn
        this.newContactFacebook = contactDetails.facebook
        this.newContactInstagram = contactDetails.instagram
        this.newContactTwitter = contactDetails.twitter
        this.newContactWebsite = contactDetails.website
        this.newContactOtherInfo = contactDetails.otherInfo

        this.setState({
            contactDetails: contactDetails,
            isEditProfileLoading: false,
        })
    }

    async updateProfileDetails(){
        let { navigate } = this.props.navigation;
        let apiDetails = {
            "Id" : this.userID,
            "FirstName": this.newContactFirstName,
            "LastName": this.newContactLastName,
            "Email": this.newContactEmail,
            "FieldValues": [
                {
                    "FieldName": "Phone",
                    "Value": this.newContactPhone,
                    "SystemCode": "Phone"
                },
                {
                    "FieldName": "Linkedin",
                    "Value": this.newContactLinkedIn,
                    "SystemCode": "custom-10381090"
                }
            ]
        };

        let updateResult = await updateContactDetails(this.userID, apiDetails);
        if (updateResult !== null){
            Alert.alert(
                'Details Updated',
                'Your profile details have been updated',
                [
                    {text: "Ok", style:'cancel'}
                ]
            );
            let contact = await getIndividualContactsList(this.userID);
            contact = contact[0];
            let contactEventRegistrationDetails = await getContactEventRegistrationList(contact["Id"]);
            navigate("NavBar", {'userData' : contact,
                                'upcomingEvents' : contactEventRegistrationDetails});
        }
        else{
            Alert.alert(
                'Update Failed',
                'Please try to update your details again',
                [
                    {text: "Ok", style:'cancel'}
                ]
            );
        }
    }

    render(){
        if(this.state.isEditProfileLoading) {
            return (
                <View style={styles.activityIndicator}>
                    <ActivityIndicator size="large" color="#ED4969" />
                </View>
            )
        }
        else {
            return this.returnEditProfileView()
        }
    }

    returnEditProfileView(){
        // return (
        //     <View>
        //         <Text>{this.newContactFirstName}</Text>
        //         <Text>{this.newContactLastName}</Text>
        //         <Text>{this.newContactEmail}</Text>
        //         <Text>{this.newContactPhone}</Text>
        //         <Text>{this.newContactCompany}</Text>
        //         <Text>{this.newContactJobTitle}</Text>
        //         <Text>{this.newContactLinkedIn}</Text>
        //         <Text>{this.newContactFacebook}</Text>
        //         <Text>{this.newContactInstagram}</Text>
        //         <Text>{this.newContactTwitter}</Text>
        //         <Text>{this.newContactWebsite}</Text>
        //         <Text>{this.newContactOtherInfo}</Text>
        //     </View>
        // )

        return (
            <ScrollView contentContainerStyle={styles.editProfileContainer}>
                <View>
                    <Text style = {styles.subHeading}>Edit Profile</Text>
                    <Text>First Name: </Text>
                    <TextInput
                        returnKeyType="next"
                        keyboardType="default"
                        autoCapitalize="words"
                        autoCorrect={false}
                        defaultValue = {this.state.contactDetails.firstName}
                        style={styles.input}
                        onChangeText={(text)=> this.newContactFirstName = text}
                    />
                    <Text>Last Name: </Text>
                    <TextInput
                        returnKeyType="next"
                        keyboardType="default"
                        autoCapitalize="none"
                        autoCorrect={false}
                        defaultValue = {this.state.contactDetails.lastName}
                        style={styles.input}
                        onChangeText={(text)=> this.newContactLastName = text}
                    />
                    <Text>Email: </Text>
                    <TextInput
                        returnKeyType="next"
                        keyboardType="email-address"
                        autoCapitalize="none"
                        autoCorrect={false}
                        defaultValue = {this.state.contactDetails.email}
                        style={styles.input}
                        onChangeText={(text)=> this.newContactEmail = text}
                    />
                    <Text>Phone: </Text>
                    <TextInput
                        returnKeyType="next"
                        keyboardType="phone-pad"
                        autoCapitalize="none"
                        autoCorrect={false}
                        defaultValue = {this.state.contactDetails.phone}
                        style={styles.input}
                        onChangeText={(text)=> this.newContactPhone = text}
                    />
                    <Text>LinkedIn: </Text>
                    <TextInput
                        returnKeyType="next"
                        keyboardType="default"
                        autoCapitalize="none"
                        autoCorrect={false}
                        defaultValue = {this.state.contactDetails.linkedIn}
                        style={styles.input}
                        onChangeText={(text)=> this.newContactLinkedIn = text}
                    />
                    <View style={styles.buttonView}>
                        <Button color="#ED4969" title="Update Profile" style={styles.buttonView} 
                        onPress={
                            ()=> this.updateProfileDetails()
                        }/>
                    </View>
                    <View>
                        <Button color="#ED4969" title="Cancel" style={styles.buttonView} onPress={
                            ()=> Alert.alert(
                                'Click Back',
                                'Click the back button',
                                [
                                    {text: "Ok", style:'cancel'}
                                ]
                            )
                        }/>
                    </View>
                </View>
            </ScrollView>
        );
    }
}