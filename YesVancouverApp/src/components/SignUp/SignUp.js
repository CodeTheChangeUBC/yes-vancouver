import React from 'react';
import { StyleSheet, ToastAndroid, ToolbarAndroid, Button, StatusBar, TextInput, ScrollView} from 'react-native';


export default class SignUp extends React.Component{
    render (){
        return(
            <ScrollView contentContainerStyle={styles.container}>
                <StatusBar
                    barStyle="dark-content"
                    backgroundColor="#ffffff"
                />
                <TextInput style={{height:100}} placeholder="First name" autoCapitalize="words"></TextInput>
                <TextInput style={{height:100}} placeholder="Last name" autoCapitalize="words"></TextInput>

                <TextInput style={{height:100}} placeholder="Email" keyboardType="email-address"></TextInput>
                <TextInput style={{height:100}} placeholder="Password" secureTextEntry={true}></TextInput>
                <Button color="#ED4969" title="Sign up" onPress={
                    ()=> ToastAndroid.show("Signed Up" ,ToastAndroid.SHORT)
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
});