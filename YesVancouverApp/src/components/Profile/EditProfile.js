import React, { Component } from 'react';
import {ScrollView, View, Text, TextInput, Button, Alert} from 'react-native';
import {styles} from './ProfileStyleSheet'
import {updateContactDetails, getContactEventRegistrationList, getIndividualContactsList} from './FetchUserDetails'

export default class EditProfile extends Component{

    userID = '';
    newContactFirstName = '';
    newContactLastName = '';
    newContactEmail = '';
    newContactPhone = '';
    newContactLinkedIn = '';

    async updateProfileDetails(){
        let {navigate} = this.props.navigation;
        let apiDetails = {
            "Id" : this.userID,
            "FirstName": this.newContactFirstName,
            "LastName": this.newContactLastName,
            "Email": this.newContactEmail,
            "FieldValues": [
                {
                    "FieldName": "Phone",
                    "Value": this.newContactPhone
                },
                {
                    "FieldName": "Linkedin",
                    "Value": this.newContactLinkedIn
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

        const { params } = this.props.navigation.state;
        const userID = params ? params.userID : '';
        const oldFirstName = params ? params.userFirstName: '';
        const oldLastName = params ? params.userLastName: '';
        const oldEmail = params ? params.userEmail : '';
        const oldPhone = params ? params.userPhone : '';
        const oldLinkedIn = params ? params.userLinkedIn : '';

        this.userID = userID;
        this.newContactFirstName = oldFirstName;
        this.newContactLastName = oldLastName;
        this.newContactEmail = oldEmail;
        this.newContactPhone = oldPhone;
        this.newContactLinkedIn = oldLinkedIn;

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
                        defaultValue = {oldFirstName}
                        style={styles.input}
                        onChangeText={(text)=> this.newContactFirstName = text}
                    />
                    <Text>Last Name: </Text>
                    <TextInput
                        returnKeyType="next"
                        keyboardType="default"
                        autoCapitalize="none"
                        autoCorrect={false}
                        defaultValue = {oldLastName}
                        style={styles.input}
                        onChangeText={(text)=> this.newContactLastName = text}
                    />
                    <Text>Email: </Text>
                    <TextInput
                        returnKeyType="next"
                        keyboardType="email-address"
                        autoCapitalize="none"
                        autoCorrect={false}
                        defaultValue = {oldEmail}
                        style={styles.input}
                        onChangeText={(text)=> this.newContactEmail = text}
                    />
                    <Text>Phone: </Text>
                    <TextInput
                        returnKeyType="next"
                        keyboardType="phone-pad"
                        autoCapitalize="none"
                        autoCorrect={false}
                        defaultValue = {oldPhone}
                        style={styles.input}
                        onChangeText={(text)=> this.newContactPhone = text}
                    />
                    <Text>LinkedIn: </Text>
                    <TextInput
                        returnKeyType="next"
                        keyboardType="default"
                        autoCapitalize="none"
                        autoCorrect={false}
                        defaultValue = {oldLinkedIn}
                        style={styles.input}
                        onChangeText={(text)=> this.newContactLinkedIn = text}
                    />
                    <View style={styles.buttonView}>
                        <Button color="#ED4969" title="Update Profile" style={styles.buttonView} onPress={
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