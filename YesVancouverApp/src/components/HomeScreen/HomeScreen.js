/**
 * Created by joycheng on 2017-08-24.
 */
import React from 'react';
import { StyleSheet, Image, Text, View, Button, StatusBar } from 'react-native';
// const util = require('util');

export default class HomeScreen extends React.Component {
    static navigationOptions = {
        title:"HomeScreen",
    };

    render(){
        var {navigate} = this.props.navigation;
        return(
            <Image
                style={{resizeMode:"center"}}
                source={require('../../images/Login-Signup/Background-Photo.png')}
            >
                <View>
                    <Image
                        style={styles.mainLogo}
                        source={require("../../images/Login-Signup/YES-logo.png")}
                    />
                    <Button
                        color="#ED4969"
                        onPress={
                            ()=> navigate("SignUp", {})
                        }
                        title="Sign up"
                    />
                    <Text
                        style={{color:"#ffffff", fontSize:20, alignContent:"center"}}>Already have an account?</Text>
                    <Text
                        style={{color:"#ffffff", fontSize:20, alignContent:"center", textDecorationLine:'underline'}}
                        onPress={
                            ()=> navigate("Second",{})
                        }>
                        Sign in
                    </Text>
                </View>
            </Image>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    mainLogo:{
        alignContent:'center',
        justifyContent: 'center',
    }
});

