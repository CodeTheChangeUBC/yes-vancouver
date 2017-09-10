import React from 'react';
import { AppRegistry, StyleSheet, Text, View } from 'react-native';
import Login from './src/components/Login/login';
import NavBar from './src/components/Navigation/NavBar';

export default class App extends React.Component {
  render() {
    return (
        
        <NavBar />

      );
  }
}

const styles = StyleSheet.create({
   container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});
