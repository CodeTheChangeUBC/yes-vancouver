
import React, { Component } from 'react';
import {StyleSheet, View, TextInput, TouchableOpacity, Text, StatusBar, Button} from 'react-native';
import {
    getBearerToken, getContactEventRegistrationList, getContactsList, getIndividualContactsList,
    getResultURL
} from '../Profile/FetchUserDetails'

let clientUsername = "";
let clientPassword = "";

export default class LoginForm extends Component {

    static navigationOptions = {
        title:"Login",
    };

    async authenticateLogin(){
        let {navigate} = this.props.navigation;
        let contactsListArray = await getIndividualContactsList();
        for (let e in contactsListArray){
            if (contactsListArray[e]["Email"] === clientUsername){
                console.log(contactsListArray[e]);
                let contactEventRegistrationDetails = await getContactEventRegistrationList(contactsListArray[e]["Id"]);
                navigate("NavBar", {'userData' : contactsListArray[e],
                                    'userEvent' : contactEventRegistrationDetails});
                return;
            }
        }
        console.log("Invalid Email Supplied");
    }

    render() {
        var {navigate} = this.props.navigation;
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
                        //onSubmitEditing={() => this.passwordInput.focus()}
                        keyboardType="email-address"
                        autoCapitalize="none"
                        autoCorrect={false}
                        style={styles.input}
                        onChangeText={(text)=> clientUsername = text}
                    />
                    <TextInput
                        placeholder="Password"
                        placeholderTextColor='rgba(128,128,128,0.7)'
                        returnKeyType="go"
                        secureTextEntry
                        onChangeText={(text)=> clientPassword = text}
                        style={styles.input}
                        //ref={(input) => this.passwordInput = input}
                    />
                </View>
                <View style={styles.buttonContainer}>
                    <TouchableOpacity style={styles.button}>
                        <Button
                            style={styles.buttonText}
                            color="#ED4969"
                            onPress={
                                () => this.authenticateLogin()
                                    //navigate("NavBar", {})
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
        //paddingHorizontal: 50,
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
        //paddingHorizontal: 5,
        borderBottomWidth: 1,
    },
    button: {
        backgroundColor: '#ff0066',
        //paddingVertical: 10,
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
        //paddingVertical: 50
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

