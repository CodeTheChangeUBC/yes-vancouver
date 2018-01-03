import React from 'react';
import { StyleSheet, Text, View, TextInput, Button, ToastAndroid} from 'react-native';

export default class ResetPassword extends React.Component{
    render(){
        let {navigate} = this.props.navigation;
        return(
            <View style={styles.parentView}>
                <Text style={styles.boxTitle}>Reset Password</Text>
                <Text style={styles.boxBody}>
                    We'll send you an email with instructions to reset your password
                </Text>
                <View style={styles.emailView}>
                    <TextInput style={{height:100}}
                               placeholder="Email"
                               keyboardType="email-address">
                    </TextInput>
                </View>
                <View style={styles.buttonContainer}>
                    <View style={styles.button}>
                        <Button color="#ED4969" title="Send" onPress={
                            ()=> ToastAndroid.show("Reset Email Sent" ,ToastAndroid.SHORT)
                        }/>
                    </View>
                    <View style={styles.button}>
                        <Button color="#ED4969" title="Cancel" onPress={
                            ()=> navigate("Second", {})
                        }/>
                    </View>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    parentView: {
        backgroundColor: '#000000',
        flex:1,
        justifyContent: 'center'
    },
    boxTitle:{
        textAlign: "center",
        backgroundColor: "#ED4969",
        fontSize: 28,
        color: "#ffffff",
        height:80
    },
    boxBody:{
        textAlign: "center",
        backgroundColor: "#ffffff",
        fontSize: 20,
        color: "#000000"
    },
    emailView:{
        backgroundColor: "#ffffff"
    },
    buttonsContainer:{
        flex:1,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    button:{
        height:40,
        width : '100%',
        backgroundColor: "#ffffff"
    }
});
