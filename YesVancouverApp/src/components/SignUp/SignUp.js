 import React from 'react';
import { StyleSheet, ToastAndroid, View, Button, StatusBar, TextInput, ScrollView, KeyboardAvoidingView, Platform, Image, Text, TouchableOpacity} from 'react-native';
import Header from '../Navigation/Header';
import ApiUtils from '../../utils/ApiUtils'
import { ClientSecrets } from '../../../config/config'
import {getBearerToken, getContactsList, getIndividualContactsList, getResultURL} from '../Profile/FetchUserDetails'

var contactsList;

//updated this havent added/committed 
function validateEmail(email) { 
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    var temp1 = re.test(String(email).toLowerCase()) ;
    if (!temp1)
        alert("email is invalid");
    var temp2 = authenticateLogin(email);
    return (temp1 && temp2);
}

// updated bug = wont check with email list currently, may be due to global variable or added in render function
async function updateContactListPrivate(){
    var contactsList2 = await getIndividualContactsList();
}

// added this recently havent commited
 async function authenticateLogin(email){
        let contactsListArray = await getIndividualContactsList();
        for (let e in contactsListArray){
            if (contactsListArray[e]["Email"] == email.toLowerCase()){
                console.log("Email already being used");
                window.alert("Email already being used");
                return false;
            }
        }
        console.log("New Email Supplied");
        return true;
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

static navigationOptions = {
        title:"SignUp",
    }; 

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
        <Header 
                style={styles.header}
        />
        var {navigate} = this.props.navigation

        return(
           <KeyboardAvoidingView behavior='padding' style={styles.container}>

               <View style={styles.headerContainer}>
              
                    <View style={styles.headerIconContainer}>
                        <View style={styles.backArrowContainer}>
                           <Image source={require('../../images/Header/White-arrow-3x.png')}
                                resizeMode='contain'
                                style={{height:'10%'}}/>
                        </View>
                        <View style={styles.backArrowContainer}>
                        </View>
                     </View>
               </View>

            <ScrollView contentContainerStyle={styles.container}>
                <TextInput
                    style={styles.input}
                    placeholder="First name"
                    autoCapitalize="words"
                    onChangeText={(firstName) => this.setState({firstName})}
                    value={this.state.firstName}
                ></TextInput>
                <TextInput  
                    style={styles.input}
                    placeholder="Last name"
                    autoCapitalize="words"
                    onChangeText={(lastName) => this.setState({lastName})}
                    value={this.state.lastName}
                ></TextInput>
                <TextInput
                    style={styles.input}
                    placeholder="Email"
                    keyboardType="email-address"
                    onChangeText={(email) => this.setState({email})}
                    value={this.state.email}
                ></TextInput>
                <TextInput
                    style={styles.input}
                    placeholder="Password"
                    secureTextEntry={true}
                    onChangeText={(password) => this.setState({password})}
                    value={this.state.password}
                ></TextInput>
               <TextInput
                    style={styles.input}
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

                        // checks name
                        if(!vFirstName){
                            alert("First name is empty");
                            return;
                         }

                         if (!vSecondName){  
                            alert("Last name is empty");
                            return;
                         }

                        if(!validateEmail(vEmail)){
                            console.log("email is invalid");
                            return;    
                        }


                        if (!vPassword){
                            alert("Password is not given");
                            return;    
                        }

                        if (!vConfirmPassword){
                            alert("Confirm your password");
                            return;    
                        }

                        if (vPassword.length>7 && vPassword == vConfirmPassword) {
                            updateContacts(vFirstName, vSecondName, vEmail, vPassword);
                            navigate("ProfileSetupWork", {})
                            }
                        if (vPassword.length<8){
                            alert("password needs to be longer than 7 characters");
                            console.log("password needs to be longer than 7 characters");
                            return;
                            }
                        if (vPassword != vConfirmPassword){
                            alert("password doesn't' match");
                            console.log("password doesn't' match");
                            return;
                            }

                        
                    }  
                }/>
            </ScrollView>
          </KeyboardAvoidingView>

        )
    }
}
const styles = StyleSheet.create({
        container: {
            flex:1,
            backgroundColor: '#ffffff',
            justifyContent: 'center',
            paddingLeft:20,
            paddingRight:20
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
        input: {
            height: 40,
            marginTop : 20,
            backgroundColor: 'rgba(255,255,255,0.7)',
            marginBottom: 20,
            //paddingHorizontal: 5,
            borderBottomWidth: 1,
    },

});
