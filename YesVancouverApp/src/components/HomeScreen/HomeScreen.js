import React from 'react'
import { Image, ImageBackground, StyleSheet, Text, TouchableOpacity, View } from 'react-native'

export default class HomeScreen extends React.Component {
    static navigationOptions = {
        header: null
    }

    render() {
        var { navigate } = this.props.navigation
        return(
            <ImageBackground 
                source={require('../../images/Login-Signup/Background-Photo.png')}
                style={{width: '100%', height: '100%'}}
                resizeMode='stretch'>
                <View style = {styles.container}>
                    <Image
                        style={styles.mainLogo}
                        source={require("../../images/Login-Signup/YES-logo.png")}
                    />

                    <View style={styles.buttonContainer}>
                        <View style={styles.buttonSpacer} />
                        <TouchableOpacity style={styles.button}
                            onPress={()=> navigate("SignUp", {})}>
                            <Text style={styles.buttonText}>Sign up</Text>
                        </TouchableOpacity>
                        <View style={styles.buttonSpacer} />
                    </View>

                    <Text style={styles.signInText}>
                        Already have an account?
                    </Text>

                    <Text
                        style={[styles.signInText, {textDecorationLine:'underline'}]}
                        onPress={()=> navigate("Login",{})}>
                        Sign in
                    </Text>
                </View>
            </ImageBackground>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    mainLogo: {
        alignContent:'center',
        justifyContent: 'center',
        marginTop: 90,
        marginBottom: 80
    },
    buttonContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom:20
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
    signInText: {
        backgroundColor: 'transparent',
        color: 'white',
        fontFamily: 'source-sans-pro-regular',
        fontSize: 20,
        alignContent: 'center',
        marginBottom: 5
    }
})
