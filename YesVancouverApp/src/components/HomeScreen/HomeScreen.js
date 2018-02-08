/**
 * Created by joycheng on 2017-08-24.
 */
import React from 'react';
import { StyleSheet, Image, Text, View, Button, StatusBar } from 'react-native';

export default class HomeScreen extends React.Component {
    static navigationOptions = {
        title:"HomeScreen",
    };

    render(){
        var {navigate} = this.props.navigation;
        return(
            // <Image
            //     style={{resizeMode:"center"}}
            //     source={require('../../images/Login-Signup/Background-Photo.png')}>
                <View style = {styles.container}>
                    <Image
                        style={styles.mainLogo}
                        source={require("../../images/Login-Signup/YES-logo.png")}
                    />
                    <View style = {styles.buttonStyle}>
                        <Button
                            style={styles.button}
                            color="#ED4969"
                            onPress={
                                ()=> navigate("SignUp", {})
                            }
                            title="Sign up"
                        />
                    </View>
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
            // </Image>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    mainLogo:{
        alignContent:'center',
        justifyContent: 'center',
        marginTop: 90,
        marginBottom: 80
    },
    buttonStyle:{
        alignSelf : 'stretch',
        marginBottom : 30
    }
});
