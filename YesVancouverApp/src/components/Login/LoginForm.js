
import React, { Component } from 'react';
import {StyleSheet, View, TextInput, TouchableOpacity, Text, StatusBar, Button} from 'react-native';
import {getContactEventRegistrationList, getIndividualContactsList} from '../Profile/FetchUserDetails'

let clientEmail = "";
let clientPassword = "";

export default class LoginForm extends Component {

    static navigationOptions = {
        title:"Login",
    };

    async authenticateLogin(){
        let {navigate} = this.props.navigation;
        let contactsListArray = await getIndividualContactsList(clientEmail);
        if (contactsListArray.length === 1){
            let contact = contactsListArray[0];
            let contactEventRegistrationDetails = await getContactEventRegistrationList(contact["Id"]);
            navigate("NavBar", {'userData' : contact,
                                'upcomingEvents' : contactEventRegistrationDetails});
        }
        else{
            console.log("Invalid Email Supplied");
        }
    }

    // async authenticateLogin(){
    //     let {navigate} = this.props.navigation;
    //     let contactsListArray = await getIndividualContactsList();
    //
    //     let resultsList = [];
    //     for (let e in contactsListArray) {
    //         resultsList.push(new Promise(function (resolve, reject) {
    //             if (contactsListArray[e]["Email"] === clientEmail) {
    //                 resolve(contactsListArray[e]);
    //             }
    //             resolve();
    //         }));
    //     }
    //     Promise.all(resultsList)
    //         .then(function (values) {
    //             let definedValues = values.filter(value => value !== undefined);
    //             if (definedValues.length === 1){
    //                 let retrieveEventDetails = new Promise(function (resolve, reject) {
    //                     let contactRegistrationDetails = getContactEventRegistrationList(definedValues[0]["Id"]);
    //                     resolve(contactRegistrationDetails );
    //                 });
    //                 retrieveEventDetails.then(function (contactRegistrationDetails ) {
    //                     navigate("NavBar", {'userData' : definedValues[0],
    //                         'upcomingEvents' : contactRegistrationDetails });
    //                 }).catch(function (error) {
    //                     console.log("ERROR: " + error)
    //                 });
    //             }
    //             else{
    //                 console.log("Invalid Email Supplied");
    //             }
    //         })
    //         .catch(function (error) {
    //             console.log("ERROR Occured");
    //             console.log(error);
    //         });
    // }

    render() {
        let {navigate} = this.props.navigation;
        return (
            <View style={styles.container}>
                <StatusBar
                    barStyle="dark-content"
                    backgroundColor="#FFFFFF"
                />
                <View style={styles.inputContainer}>
                    <TextInput
                        placeholder="Email"
                        placeholderTextColor="rgba(128,128,128,0.7)"
                        returnKeyType="next"
                        keyboardType="email-address"
                        autoCapitalize="none"
                        autoCorrect={false}
                        style={styles.input}
                        onChangeText={(text)=> clientEmail = text}
                    />
                    <TextInput
                        placeholder="Password"
                        placeholderTextColor='rgba(128,128,128,0.7)'
                        returnKeyType="go"
                        secureTextEntry
                        onChangeText={(text)=> clientPassword = text}
                        style={styles.input}
                    />
                </View>
                <View style={styles.buttonContainer}>
                    <TouchableOpacity style={styles.button}>
                        <Button
                            style={styles.buttonText}
                            color="#ED4969"
                            onPress={
                                () => this.authenticateLogin()
                            }
                            title="Login"
                        />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.passContainer}>
                        <Text style={styles.forgotPassText}
                              onPress={
                                  () => navigate("ResetPassword", {})
                              }>
                            I forgot my password
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#FFFFFF',
        width: '100%',
        height: '100%'
    },
    inputContainer:{
        marginLeft : 50,
        marginRight : 50
    },
    input: {
        height: 40,
        marginTop : 80,
        backgroundColor: 'rgba(255,255,255,0.7)',
        marginBottom: 20,
        borderBottomWidth: 1,
    },
    button: {
        backgroundColor: '#ff0066',
        marginTop: 60
    },
    buttonText: {
        backgroundColor: '#ff0066',
        textAlign: 'center',
        color: '#FFFFFF',
        fontWeight: '600',
        fontSize: 19,
        padding: 5
    },
    passContainer: {
        marginTop : 40
    },
    forgotPassText: {
        textAlign: 'center',
        fontSize: 16,
        color: '#808080',
    },
    buttonContainer:{
        marginLeft : 80,
        marginRight : 80
    }
});
