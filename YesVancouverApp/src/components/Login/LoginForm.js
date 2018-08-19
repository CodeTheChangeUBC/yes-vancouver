
import React, { Component } from 'react'
import { Alert, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import Expo from 'expo'
import { authenticateContactLogin } from '../../apicalls/Authentication/AuthToken'
import { getCurrentContactDetails } from '../../apicalls/Profile/ProfileDetails'
import { headerStyles } from '../Navigation/Header'


export default class LoginForm extends Component {
    constructor(props) {
        super(props)
        this.state = {
            clientEmail : "",
            clientPassword : ""
        }
    }

    static navigationOptions = {
        title: "Login",
        headerTitleStyle: headerStyles.headerTitle
    };

    async authenticateLogin(){
        let { navigate } = this.props.navigation
        let contactAuthenticationToken = await authenticateContactLogin(this.state.clientEmail, this.state.clientPassword)

        if (contactAuthenticationToken !== null){
            let currentContactDetails = await getCurrentContactDetails(contactAuthenticationToken)
            
            await Expo.SecureStore.setItemAsync('contactDetailsJson', JSON.stringify(currentContactDetails))
            await Expo.SecureStore.setItemAsync('contactPassword', this.state.clientPassword)

            await navigate("NavBar")
        }
        else{
            Alert.alert(
                'Incorrect Credentials',
                'Either your username or password is incorrect',
                [
                    {text: "Ok", style:'cancel'}
                ]
            )
        }
    }

    render() {
        let {navigate} = this.props.navigation;
        return (
            <View style={styles.container}>
                <View style={styles.inputContainer}>
                    <TextInput
                        placeholder="Email"
                        placeholderTextColor='#979797'
                        returnKeyType="next"
                        keyboardType="email-address"
                        autoCapitalize="none"
                        autoCorrect={false}
                        style={styles.input}
                        onChangeText={(clientEmail)=> this.setState({clientEmail})}
                        underlineColorAndroid='transparent'
                    />
                </View>

                <View style={styles.inputContainer}>
                    <TextInput
                        placeholder="Password"
                        placeholderTextColor='#979797'
                        returnKeyType="go"
                        secureTextEntry
                        onChangeText={(clientPassword)=> this.setState({clientPassword})}
                        style={styles.input}
                        underlineColorAndroid='transparent'
                    />
                </View>

                <View style={styles.buttonContainer}>
                    <View style={styles.buttonSpacer} />
                    <TouchableOpacity style={styles.button}
                        onPress={() => this.authenticateLogin()}>
                        <Text style={styles.buttonText}>Login</Text>
                    </TouchableOpacity>
                    <View style={styles.buttonSpacer} />
                </View>

                <View>
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
        )
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
        marginBottom: 20,
        borderBottomWidth: 1,
        fontFamily: 'alternate-gothic-no3-d-regular',
        fontSize: 24,
        color: 'black'
    },
    buttonContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 20
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
    passContainer: {
        marginTop : 20
    },
    forgotPassText: {
        textAlign: 'center',
        fontSize: 20,
        color: '#808080',
        fontFamily: 'source-sans-pro-regular'
    }
})
