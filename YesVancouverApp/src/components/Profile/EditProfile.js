import React, { Component } from 'react'
import { ActivityIndicator, Alert, Button, Image, ScrollView, Text, TextInput, View } from 'react-native'
import { styles } from './ProfileStyleSheet'


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
        let { navigation } = this.props

        let newContactDetailsObj = this.state.contactDetails.clone()
        newContactDetailsObj.firstName = this.state.newContactFirstName
        newContactDetailsObj.lastName = this.state.newContactLastName
        newContactDetailsObj.email = this.state.newContactEmail
        newContactDetailsObj.phone = this.state.newContactPhone
        newContactDetailsObj.company = this.state.newContactCompany
        newContactDetailsObj.jobTitle = this.state.newContactJobTitle
        newContactDetailsObj.linkedIn = this.state.newContactLinkedIn
        newContactDetailsObj.facebook = this.state.newContactFacebook
        newContactDetailsObj.instagram = this.state.newContactInstagram
        newContactDetailsObj.twitter = this.state.newContactTwitter
        newContactDetailsObj.website = this.state.newContactWebsite
        newContactDetailsObj.otherInfo = this.state.newContactOtherInfo

        let updateResult = await newContactDetailsObj.updateContactDetails()
        if (updateResult !== null) {
            Alert.alert(
                'Details Updated',
                'Your profile details have been updated',
                [
                    {text: "Ok", style:'cancel'}
                ]
            )
            await Expo.SecureStore.setItemAsync('contactEmail', newContactDetailsObj.email)
            navigation.state.params.refreshProfileDetails()
            navigation.goBack()
        }
        else {
            Alert.alert(
                'Update Failed',
                'Please try to update your details again',
                [
                    {text: "Ok", style:'cancel'}
                ]
            )
        }
    }

    returnEditProfileView(){
        return (
            <ScrollView style={{backgroundColor: 'white'}} 
                    contentContainerStyle={{paddingHorizontal:25, backgroundColor: 'white'}}>
                <View>
                    <View style={{height: 50}} />

                    <View style={{flexDirection:'column', justifyContent: 'flex-start'}}>
                        <View style={{flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'flex-end'}}>
                            <Image source={require('../../images/Settings/iconmonstr-email-4.png')}
                                    style={{width:30, height: 30, resizeMode: 'contain'}} />
                            <View style={{width: 10}} />
                            <Text style={{
                                    fontFamily: 'alternate-gothic-no3-d-regular',
                                    fontSize: 24,
                                    color: 'black'}}>First Name</Text>
                        </View>
                    
                        <TextInput
                            underlineColorAndroid='transparent'
                            returnKeyType="next"
                            keyboardType="default"
                            autoCapitalize="words"
                            autoCorrect={false}
                            defaultValue = {this.state.contactDetails.firstName}
                            style={{

                                    borderBottomWidth: 1,
                                    fontFamily: 'alternate-gothic-no3-d-regular',
                                    color: 'black',
                                    fontSize: 24,
                                    height: 30
                                    
                            
                            }}
                            onChangeText={(newContactFirstName)=> this.setState({newContactFirstName})}
                        />
                    </View>

                    <View style={{height: 25}} />

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
        )
    }
}
