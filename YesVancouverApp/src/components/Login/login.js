
import React, { Component, PropTypes } from 'react';
import {StyleSheet,View,Image, Text, KeyboardAvoidingView, TouchableHighlight} from 'react-native';
import LoginForm from './LoginForm';


export default class Login extends Component {

    render(){


        return(
            <KeyboardAvoidingView behavior="padding" style={styles.container}>


                <View style={styles.bannerContainer}>

                </View>
                <View style= {styles.formContainer}>
                    <LoginForm/>
                </View>


            </KeyboardAvoidingView>
        )
    }
}


const styles = StyleSheet.create({
  container: {
    flex: 1

  },

  bannerContainer:{
    paddingBottom: 200
  }

});


