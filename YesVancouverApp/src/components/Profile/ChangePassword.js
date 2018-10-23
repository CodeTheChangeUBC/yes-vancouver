import React, { Component } from 'react'
import { ActivityIndicator, Alert, Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'


export default class ChangePassword extends Component{
    constructor(props) {
        super(props)
        this.state = {
            isChangePasswordLoading: true,
            contactEmail: '',
            currentPassword: '',
            newPassword: '',
            newPasswordConfirm: '',
        }

        // For determining the next field to focus on when user clicks next on the keyboard
        this.focusNextField = this.focusNextField.bind(this)
        this.inputs = {}
    }

    focusNextField(id) {
        this.inputs[id].focus();
    }

    async componentDidMount(){
        let { params } = this.props.navigation.state
        let contactEmail = await Expo.SecureStore.getItemAsync("contactEmail")
        let contactPassword = await Expo.SecureStore.getItemAsync("contactPassword")

        this.setState({
            contactEmail: contactEmail,
            isChangePasswordLoading: false,
        })
    }

    render(){
        if(this.state.isChangePasswordLoading) {
            return (
                <View style={changePasswordStyles.activityIndicator}>
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
        console.log("SUBMIT CHANGE PASSWORD SUBMITTED")

        // let newContactDetailsObj = this.state.contactDetails.clone()
        // newContactDetailsObj.firstName = this.state.newContactFirstName
        // newContactDetailsObj.lastName = this.state.newContactLastName
        // newContactDetailsObj.email = this.state.newContactEmail
        // newContactDetailsObj.phone = this.state.newContactPhone
        // newContactDetailsObj.company = this.state.newContactCompany
        // newContactDetailsObj.jobTitle = this.state.newContactJobTitle
        // newContactDetailsObj.linkedIn = this.state.newContactLinkedIn
        // newContactDetailsObj.facebook = this.state.newContactFacebook
        // newContactDetailsObj.instagram = this.state.newContactInstagram
        // newContactDetailsObj.twitter = this.state.newContactTwitter
        // newContactDetailsObj.website = this.state.newContactWebsite
        // newContactDetailsObj.otherInfo = this.state.newContactOtherInfo

        // let updateResult = await newContactDetailsObj.updateContactDetails()
        // if (updateResult !== null) {
        //     Alert.alert(
        //         'Details Updated',
        //         'Your profile details have been updated.',
        //         [
        //             {text: "Ok", style:'cancel'}
        //         ]
        //     )
        //     await Expo.SecureStore.setItemAsync('contactEmail', newContactDetailsObj.email)
        //     navigation.state.params.refreshProfileDetails()
        //     navigation.goBack()
        // }
        // else {
        //     Alert.alert(
        //         'Update Failed',
        //         'Please try to update your details again.',
        //         [
        //             {text: "Ok", style:'cancel'}
        //         ]
        //     )
        // }
    }

    returnEditProfileView(){
        let { navigation } = this.props
        return (
            <KeyboardAwareScrollView style={changePasswordStyles.scrollView} 
                contentContainerStyle={changePasswordStyles.scrollViewContentContainer}
                enableAutomaticScroll={true}
                extraScrollHeight={20}
                enableOnAndroid={true}
                enableResetScrollToCoords={false}>
                
                <View style={changePasswordStyles.contentTopSpacer} />

                <View style={changePasswordStyles.inputRow}>
                    <Text style={changePasswordStyles.inputHeaderText}>
                        Current Password
                    </Text>
                    <View style={changePasswordStyles.inputVerticalSpacer} />
                    <TextInput
                        ref={input => {this.inputs['CurrentPassword'] = input}}
                        onSubmitEditing={() => {this.focusNextField('NewPassword')}}
                        blurOnSubmit={false}
                        underlineColorAndroid='transparent'
                        returnKeyType="next"
                        secureTextEntry
                        autoCapitalize="none"
                        autoCorrect={false}
                        style={changePasswordStyles.inputText}
                        onChangeText={(currentPassword)=> this.setState({currentPassword})}
                    />
                </View>

                <View style={changePasswordStyles.contentHorizontalSpacer} />

                <View style={changePasswordStyles.inputRow}>
                    <Text style={changePasswordStyles.inputHeaderText}>
                        New Password
                    </Text>
                    <View style={changePasswordStyles.inputVerticalSpacer} />
                    <TextInput
                        ref={input => {this.inputs['NewPassword'] = input}}
                        onSubmitEditing={() => {this.focusNextField('NewPasswordConfirm')}}
                        blurOnSubmit={false}
                        underlineColorAndroid='transparent'
                        returnKeyType="next"
                        secureTextEntry
                        autoCapitalize="none"
                        autoCorrect={false}
                        style={changePasswordStyles.inputText}
                        onChangeText={(newPassword)=> this.setState({newPassword})}
                    />
                </View>

                <View style={changePasswordStyles.contentHorizontalSpacer} />
        
                <View style={changePasswordStyles.inputRow}>
                    <Text style={changePasswordStyles.inputHeaderText}>
                        Confirm New Password
                    </Text>
                    <View style={changePasswordStyles.inputVerticalSpacer} />
                    <TextInput
                        ref={input => {this.inputs['NewPasswordConfirm'] = input}}
                        blurOnSubmit={true}
                        underlineColorAndroid='transparent'
                        returnKeyType="done"
                        secureTextEntry
                        autoCapitalize="none"
                        autoCorrect={false}
                        style={changePasswordStyles.inputText}
                        onChangeText={(newPasswordConfirm)=> this.setState({newPasswordConfirm})}
                    />
                </View>

                <View style={changePasswordStyles.contentHorizontalSpacer} />

                <View style={changePasswordStyles.buttonContainer}>
                    <View style={changePasswordStyles.buttonSpacer} />
                    <TouchableOpacity style={changePasswordStyles.button}
                        onPress={() => this.submitDetails()}>
                        <Text style={changePasswordStyles.buttonText}>Save</Text>
                    </TouchableOpacity>
                    <View style={changePasswordStyles.buttonSpacer} />
                </View>

                <View style={changePasswordStyles.spacerBetweenButtons} />

                <View style={changePasswordStyles.buttonContainer}>
                    <View style={changePasswordStyles.buttonSpacer} />
                    <TouchableOpacity style={changePasswordStyles.button}
                        onPress={
                            ()=> Alert.alert(
                                'Exit Edit Profile',
                                'Are you sure you want to go back? Unsaved changes will be lost.',
                                [
                                    {text: 'Yes', onPress: () => navigation.goBack()},
                                    {text: 'No'}
                                ]
                        )}>
                        <Text style={changePasswordStyles.buttonText}>Cancel</Text>
                    </TouchableOpacity>
                    <View style={changePasswordStyles.buttonSpacer} />
                </View>

                <View style={changePasswordStyles.contentTopSpacer}></View>

            </KeyboardAwareScrollView>
        )
    }
}

const changePasswordStyles = StyleSheet.create({
    activityIndicator: {
        flex: 1,
        justifyContent: 'center',
        flexDirection: 'row',
        justifyContent: 'space-around',
        padding: 10
    },
    scrollView: {
        backgroundColor: 'white'
    },
    scrollViewContentContainer: {
        paddingHorizontal: 25,
        backgroundColor: 'white'
    },
    contentTopSpacer: {
        height: 50
    },
    contentHorizontalSpacer: {
        height: 50
    },
    inputRow: {
        flexDirection:'column',
        justifyContent: 'flex-start'
    },
    inputHeaderText: {
        fontFamily: 'alternate-gothic-no3-d-regular',
        fontSize: 24,
        color: 'black'
    },
    inputVerticalSpacer: {
        height: 10
    },
    inputText: {
        borderBottomWidth: 1,
        fontFamily: 'alternate-gothic-no3-d-regular',
        color: '#979797',
        fontSize: 24,
        height: 30
    },
    buttonContainer: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    button: {
        backgroundColor: '#EA4B6C',
        paddingVertical: 10,
        alignItems: 'center',
        flex: 0.6
    },
    buttonText: {
        fontFamily: 'alternate-gothic-no3-d-regular',
        fontSize: 24,
        color: 'white'
    },
    buttonSpacer: {
        flex: 0.2
    },
    spacerBetweenButtons: {
        height: 20
    }
})
