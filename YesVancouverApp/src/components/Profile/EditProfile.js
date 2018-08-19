import React, { Component } from 'react'
import { ActivityIndicator, Alert, Button, ScrollView, Text, TextInput, View } from 'react-native'
import { styles } from './ProfileStyleSheet'
import {updateContactDetails, getContactEventRegistrationList, getIndividualContactsList} from './FetchUserDetails'


export default class EditProfile extends Component{
    constructor(props) {
        super(props)
        this.state = {
            isEditProfileLoading: true,
            contactDetails: null,
            newContactFirstName: '',
            newContactLastName: '',
            newContactEmail: '',
            newContactPhone: '',
            newContactCompany: '',
            newContactJobTitle: '',
            newContactLinkedIn: '',
            newContactFacebook: '',
            newContactInstagram: '',
            newContactTwitter: '',
            newContactWebsite: '',
            newContactOtherInfo: ''
        }
    }

    async componentDidMount(){
        let { params } = this.props.navigation.state;
        let contactDetails = params ? params.contactDetails : null
        console.log(contactDetails)

        this.setState({
            contactDetails: contactDetails,
            newContactFirstName: contactDetails.firstName,
            newContactLastName: contactDetails.lastName,
            newContactEmail: contactDetails.email,
            newContactPhone: contactDetails.phone,
            newContactCompany: contactDetails.company,
            newContactJobTitle: contactDetails.jobTitle,
            newContactLinkedIn: contactDetails.linkedIn,
            newContactFacebook: contactDetails.facebook,
            newContactInstagram: contactDetails.instagram,
            newContactTwitter: contactDetails.twitter,
            newContactWebsite: contactDetails.website,
            newContactOtherInfo: contactDetails.otherInfo,
            isEditProfileLoading: false,
        })
    }

    async updateProfileDetails(newContactDetails){
        let { navigate } = this.props.navigation;
        let apiDetails = {
            "Id" : newContactDetails.id,
            "FirstName": newContactDetails.firstName,
            "LastName": newContactDetails.lastName,
            "Email": newContactDetails.email,
            "FieldValues": [
                {
                    "FieldName": "Phone",
                    "Value": newContactDetails.phone,
                    "SystemCode": "Phone"
                },
                {
                    "FieldName": "Company",
                    "Value": newContactDetails.company,
                    "SystemCode": "custom-10381084"
                },
                {
                    "FieldName": "JobTitle",
                    "Value": newContactDetails.jobTitle,
                    "SystemCode": "custom-10381083"
                },
                {
                    "FieldName": "Linkedin",
                    "Value": newContactDetails.linkedIn,
                    "SystemCode": "custom-10381090"
                },
                {
                    "FieldName": "Facebook",
                    "Value": newContactDetails.facebook,
                    "SystemCode": "custom-10381086"
                },
                {
                    "FieldName": "Instagram",
                    "Value": newContactDetails.instagram,
                    "SystemCode": "custom-10381088"
                },
                {
                    "FieldName": "Twitter",
                    "Value": newContactDetails.twitter,
                    "SystemCode": "custom-10381087"
                },
                {
                    "FieldName": "Website",
                    "Value": newContactDetails.website,
                    "SystemCode": "custom-10381089"
                },
                {
                    "FieldName": "OtherInfo",
                    "Value": newContactDetails.otherInfo,
                    "SystemCode": "custom-10381085"
                }
            ]
        };

        let updateResult = await updateContactDetails(newContactDetails.id, apiDetails);
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

    async submitDetails() {
        let newContactDetails = JSON.parse(JSON.stringify(this.state.contactDetails))
        newContactDetails.firstName = this.state.newContactFirstName
        newContactDetails.lastName = this.state.newContactLastName
        newContactDetails.email = this.state.newContactEmail
        newContactDetails.phone = this.state.newContactPhone
        newContactDetails.company = this.state.newContactCompany
        newContactDetails.jobTitle = this.state.newContactJobTitle
        newContactDetails.linkedIn = this.state.newContactLinkedIn
        newContactDetails.facebook = this.state.newContactFacebook
        newContactDetails.instagram = this.state.newContactInstagram
        newContactDetails.twitter = this.state.newContactTwitter
        newContactDetails.website = this.state.newContactWebsite
        newContactDetails.otherInfo = this.state.newContactOtherInfo

        await this.updateProfileDetails(newContactDetails)
    }

    returnEditProfileView(){
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
                        onChangeText={(newContactFirstName)=> this.setState({newContactFirstName})}
                    />
                    <Text>Last Name: </Text>
                    <TextInput
                        returnKeyType="next"
                        keyboardType="default"
                        autoCapitalize="none"
                        autoCorrect={false}
                        defaultValue = {this.state.contactDetails.lastName}
                        style={styles.input}
                        onChangeText={(newContactLastName)=> this.setState({newContactLastName})}
                    />
                    <Text>Email: </Text>
                    <TextInput
                        returnKeyType="next"
                        keyboardType="email-address"
                        autoCapitalize="none"
                        autoCorrect={false}
                        defaultValue = {this.state.contactDetails.email}
                        style={styles.input}
                        onChangeText={(newContactEmail)=> this.setState({newContactEmail})}
                    />
                    <Text>Phone: </Text>
                    <TextInput
                        returnKeyType="next"
                        keyboardType="phone-pad"
                        autoCapitalize="none"
                        autoCorrect={false}
                        defaultValue = {this.state.contactDetails.phone}
                        style={styles.input}
                        onChangeText={(newContactPhone)=> this.setState({newContactPhone})}
                    />

                    <Text>Company: </Text>
                    <TextInput
                        returnKeyType="next"
                        keyboardType="default"
                        autoCapitalize="none"
                        autoCorrect={false}
                        defaultValue = {this.state.contactDetails.company}
                        style={styles.input}
                        onChangeText={(newContactCompany)=> this.setState({newContactCompany})}
                    />

                    <Text>Job Title: </Text>
                    <TextInput
                        returnKeyType="next"
                        keyboardType="default"
                        autoCapitalize="none"
                        autoCorrect={false}
                        defaultValue = {this.state.contactDetails.jobTitle}
                        style={styles.input}
                        onChangeText={(newContactJobTitle)=> this.setState({newContactJobTitle})}
                    />

                    <Text>LinkedIn: </Text>
                    <TextInput
                        returnKeyType="next"
                        keyboardType="default"
                        autoCapitalize="none"
                        autoCorrect={false}
                        defaultValue = {this.state.contactDetails.linkedIn}
                        style={styles.input}
                        onChangeText={(newContactLinkedIn)=> this.setState({newContactLinkedIn})}
                    />

                    <Text>Facebook: </Text>
                    <TextInput
                        returnKeyType="next"
                        keyboardType="default"
                        autoCapitalize="none"
                        autoCorrect={false}
                        defaultValue = {this.state.contactDetails.facebook}
                        style={styles.input}
                        onChangeText={(newContactFacebook)=> this.setState({newContactFacebook})}
                    />

                    <Text>Instagram: </Text>
                    <TextInput
                        returnKeyType="next"
                        keyboardType="default"
                        autoCapitalize="none"
                        autoCorrect={false}
                        defaultValue = {this.state.contactDetails.instagram}
                        style={styles.input}
                        onChangeText={(newContactInstagram)=> this.setState({newContactInstagram})}
                    />

                    <Text>Twitter: </Text>
                    <TextInput
                        returnKeyType="next"
                        keyboardType="default"
                        autoCapitalize="none"
                        autoCorrect={false}
                        defaultValue = {this.state.contactDetails.twitter}
                        style={styles.input}
                        onChangeText={(newContactTwitter)=> this.setState({newContactTwitter})}
                    />

                    <Text>Website: </Text>
                    <TextInput
                        returnKeyType="next"
                        keyboardType="default"
                        autoCapitalize="none"
                        autoCorrect={false}
                        defaultValue = {this.state.contactDetails.website}
                        style={styles.input}
                        onChangeText={(newContactWebsite)=> this.setState({newContactWebsite})}
                    />

                    <Text>Other Info: </Text>
                    <TextInput
                        returnKeyType="next"
                        keyboardType="default"
                        autoCapitalize="none"
                        autoCorrect={false}
                        defaultValue = {this.state.contactDetails.otherInfo}
                        style={styles.input}
                        onChangeText={(newContactOtherInfo)=> this.setState({newContactOtherInfo})}
                    />

                    <View style={styles.buttonView}>
                        <Button color="#ED4969" title="Update Profile" style={styles.buttonView} 
                        onPress={() => this.submitDetails()}/>
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