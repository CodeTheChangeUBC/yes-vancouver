import React from 'react';
import { StyleSheet, ToastAndroid, View, Button, StatusBar, TextInput, ScrollView, KeyboardAvoidingView, Platform, Image, Text, TouchableOpacity} from 'react-native';
import Header from '../Navigation/Header';
import ApiUtils from '../../utils/ApiUtils'
import { ClientSecrets } from '../../../config/config'





async function getBearerToken() {
    try {
        let base64 = require('base-64')
        username = ClientSecrets.API_USERNAME
        password = ClientSecrets.API_PASSWORD
        basicAuthHeaderValue = 'Basic ' + base64.encode(username + ":" + password)
        console.log(basicAuthHeaderValue)
        console.log ('above is header value')

        let requestAuthTokenBody = {
            'grant_type': 'client_credentials',
            'scope': 'contacts finances events'
        }

        let response = await fetch('https://oauth.wildapricot.org/auth/token', 
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Authorization': basicAuthHeaderValue
            },
            body: ApiUtils.constructFormUrlEncodedBody(requestAuthTokenBody)
        })
        let responseJson = await response.json()
        console.log(responseJson['access_token']);
        console.log('above is token');
        return responseJson['access_token']
    } catch(error) {
        console.error(error)
        return null
    }
}


 async function updateContacts(pFirstName, pLastName, pEmail, pPassword) {
    try {
         bearerToken = '';
         bearerToken = await getBearerToken();
         if(!bearerToken) {
            console.log("Failed to get bearer token")
            return
        }

         console.log("here it is");
         console.log(bearerToken);
        let requestAuthTokenBody = {
            'FirstName' : pFirstName,
            'LastName' : pLastName,
            'Email' : pEmail,
            'Password' : pPassword
        }
        
        let getUrl = 'https://api.wildapricot.org/v2/Accounts/' + ClientSecrets.ACCOUNT_NUM + '/Contacts?$async=false'
        let response = await fetch(getUrl, 
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Authorization': 'Bearer ' + bearerToken
              },
            body:  ApiUtils.constructFormUrlEncodedBody(requestAuthTokenBody)

        })

         if(!response) {
            console.log("Failed to get events list from API call")
            return
        }

        console.log('update contacts finished running');
        return false;


    } catch(error) {
        console.error(error)
        return null
    }
}





// do stuff here

export default class SignUp extends React.Component{

    constructor(props) {
        super(props);
        this.state = {
        firstName: '',
        lastName: '',
        email: '',
        confirmPassword: '',
        };
    }


    
    render (){
        //<Header style={styles.header}/>
        var {navigate} = this.props.navigation
        return(
        
            <ScrollView contentContainerStyle={styles.container}>
                <TextInput
                    style={{height:100}}
                    placeholder="First name"
                    autoCapitalize="words"
                    onChangeText={(firstName) => this.setState({firstName})}
                    value={this.state.firstName}
                ></TextInput>
                <TextInput  
                    style={{height:100}}
                    placeholder="Last name"
                    autoCapitalize="words"
                    onChangeText={(lastName) => this.setState({lastName})}
                    value={this.state.lastName}
                ></TextInput>
                <TextInput
                    style={{height:100}}
                    placeholder="Email"
                    keyboardType="email-address"
                    onChangeText={(email) => this.setState({email})}
                    value={this.state.email}
                ></TextInput>
                <TextInput
                    style={{height:100}}
                    placeholder="Password"
                    secureTextEntry={true}
                    onChangeText={(password) => this.setState({password})}
                    value={this.state.password}
                ></TextInput>
               <TextInput
                    style={{height:100}}
                    placeholder="Confirm Password"
                    secureTextEntry={true}
                    onChangeText={(confirmPassword) => this.setState({confirmPassword})}
                    value={this.state.confirmPassword}
               ></TextInput>
               
               
                <Button color="#ED4969" title="Sign up" onPress={
                    ()=> {
                        // tester
                       
               
                        let vFirstName = this.state.firstName;
                        let vSecondName = this.state.lastName;
                        let vEmail = this.state.email;
                        let vPassword = this.state.password;
                        let vConfirmPassword = this.state.confirmPassword;
               
                        console.log(vFirstName);
                        console.log(vSecondName);
                        console.log(vEmail);
                        console.log(vPassword);
                        console.log(vConfirmPassword);
               
                        // end tester
                        if (vPassword>7 && vPassword == vConfirmPassword) {
                            updateContacts(vFirstName, vSecondName, vEmail, vPassword);
                            navigate("ProfileSetupWork", {})
                            }
                        
                    }
                }/>
            </ScrollView>
        )
    }
}
const styles = StyleSheet.create({
        container: {
            flex:1,
            backgroundColor: '#ffffff',
            justifyContent: 'center',
            paddingLeft:40,
            paddingRight:40
        },
        header: {
            flex: 1,
            width: null,
            height: null
        },
        content: {
            flex: 7,
            paddingHorizontal: 48,
            paddingTop: 66
        },
});
