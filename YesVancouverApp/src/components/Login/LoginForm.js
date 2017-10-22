
import React, { Component } from 'react';

import {StyleSheet, View, TextInput, TouchableOpacity, Text, StatusBar, Button} from 'react-native';

import { StackNavigator } from 'react-navigation';

export default class LoginForm extends Component {

    static navigationOptions = {
        title:"Login",
    };


  render() {

      var {navigate} = this.props.navigation;

    return (

      <View style={styles.container}>
        <StatusBar
          barStyle="dark-content"
          />

        <TextInput
        placeholder="Email"
        placeholderTextColor="rgba(128,128,128,0.7)"
          returnKeyType="next"
          onSubmitEditing={()=> this.passwordInput.focus()}
          keyboardType="email-address"
          autoCapitalize="none"
          autoCorrect={false}
          style= {styles.input}
          />
        <TextInput
        placeholder="Password"
        placeholderTextColor='rgba(128,128,128,0.7)'
        returnKeyType="go"
        secureTextEntry
        style={styles.input}
        ref={(input) => this.passwordInput = input}
        />

        <TouchableOpacity style={styles.buttonContainer}>
          <Button
              onPress={
                        ()=> navigate("Third",{})
                    }
              title="Login"
              style={styles.buttonText}
          />

        </TouchableOpacity>

        <TouchableOpacity style={styles.passContainer}>
          <Text style={styles.forgotPassText}>I forgot my password</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    // padding: 30,
    paddingHorizontal: 50,
    // borderLeftWidth: 50,
    // borderRightWidth: 50,
    // height: 60


  },

  input: {
    height: 40,
    backgroundColor:'rgba(255,255,255,0.7)',
    marginBottom:20,
    // marginTop: 20,

    paddingHorizontal:5,
    borderBottomWidth:1,

  },

  buttonContainer:{
    backgroundColor: '#ff0066',
    paddingVertical: 10,
    marginTop: 30

  },

  buttonText:{
    textAlign:'center',
    color:'#FFFFFF',
    fontWeight: '600',
    fontSize: 19,
    padding: 5




  },

  passContainer:{
    paddingVertical: 50

  },

  forgotPassText:{
    textAlign: 'center',
    fontSize: 16,
    color: '#808080',

  }



});

