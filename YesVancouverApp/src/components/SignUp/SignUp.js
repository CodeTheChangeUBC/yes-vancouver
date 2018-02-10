import React from 'react';
import { StyleSheet, ToastAndroid, View, Button, StatusBar, TextInput, ScrollView} from 'react-native';
import Header from '../Navigation/Header';


export default class SignUp extends React.Component{
    render (){
        //<Header style={styles.header}/>
        var {navigate} = this.props.navigation;
        return(
            <ScrollView contentContainerStyle={styles.container}>
                <TextInput style={{height:100}} placeholder="First name" autoCapitalize="words"></TextInput>
                <TextInput style={{height:100}} placeholder="Last name" autoCapitalize="words"></TextInput>
                <TextInput style={{height:100}} placeholder="Email" keyboardType="email-address"></TextInput>
                <TextInput style={{height:100}} placeholder="Password" secureTextEntry={true}></TextInput>
                <Button color="#ED4969" title="Sign up" onPress={
                    ()=> {
                        navigate("ProfileSetupWork", {})
                        ToastAndroid.show("Signed Up" ,ToastAndroid.SHORT)
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
});
