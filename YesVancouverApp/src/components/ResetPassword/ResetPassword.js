import React, { Component } from 'react'
import { Alert, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'


export default class ResetPassword extends Component {
    static navigationOptions = {
        header: null
    }

    render(){
        let { navigate } = this.props.navigation
        return(
            <View style={styles.container}>
                <View style={styles.parentView}>
                    <View style={styles.boxTitleContainer}>
                        <Text style={styles.boxTitle}>Reset Password</Text>
                    </View>

                    <Text style={styles.boxBody}>
                        We'll send you an email with instructions to reset your password.
                    </Text>

                    <View style={styles.emailView}>
                        <TextInput style={styles.emailTextInput}
                            placeholder="Email"
                            keyboardType="email-address"
                            placeholderTextColor='#979797'
                            returnKeyType="next"
                            autoCapitalize="none"
                            autoCorrect={false}
                            underlineColorAndroid='transparent'/>
                    </View>

                    <View style={styles.buttonContainer}>
                        <View style={{flex:0.1}}/>

                        <View style={styles.button}>
                            <TouchableOpacity
                                onPress={()=> navigate("Login", {})}>
                                <Text style={styles.buttonText}>Cancel</Text>
                            </TouchableOpacity>
                        </View>

                        <View style={{flex:0.2}}/>

                         <View style={styles.button}>
                            <TouchableOpacity
                                onPress={()=> Alert.alert(
                                    'Reset Password Email Sent',
                                    'Check your email to view the reset password link',
                                    [{text: "Ok", style:'cancel'}]
                                )}>
                                <Text style={styles.buttonText}>Send</Text>
                            </TouchableOpacity>
                        </View>

                        <View style={{flex:0.1}}/>
                    </View>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 30,
        backgroundColor: 'black'
    },
    parentView: {
        backgroundColor: 'white',
        justifyContent: 'center',
    },
    boxTitleContainer: {
        backgroundColor: '#ED4969',
        justifyContent: 'center',
        alignItems: 'center',
        height: 80
    },
    boxTitle: {
        fontFamily: 'alternate-gothic-no3-d-regular',
        fontSize: 24,
        color: '#ffffff',
        
    },
    boxBody: {
        textAlign: "center",
        backgroundColor: '#ffffff',
        fontFamily: 'source-sans-pro-regular',
        fontSize: 20,
        color: 'black',
        marginVertical: 15,
        marginHorizontal: 15
    },
    emailView: {
        paddingHorizontal: 20,
        marginBottom: 20
    },
    emailTextInput: {
        height: 40,
        borderBottomWidth: 1,
        fontFamily: 'alternate-gothic-no3-d-regular',
        fontSize: 24,
        color: 'black'
    },
    buttonContainer:{
        flexDirection: 'row',
        justifyContent: 'center',
        paddingVertical: 15
    },
    button: {
        flex: 0.3,
        height: 40,
        width: '100%',
        backgroundColor: '#ED4969',
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttonText: {
        fontFamily: 'alternate-gothic-no3-d-regular',
        fontSize: 24,
        color: 'white'
    }
})
