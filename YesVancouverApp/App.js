import React from 'react';
import { AppRegistry, StyleSheet, Text, View, TouchableHighlight, Dimensions } from 'react-native';
import {Navigator} from 'react-native-deprecated-custom-components';
import Login from './src/components/Login/login';
import HomeScreen from './src/components/HomeScreen/HomeScreen';
import { StackNavigator } from 'react-navigation';
import NavBar from './src/components/Navigation/NavBar';

// export default class App extends React.Component {
//   render() {
//     return (
//
//         <Login />
//         // <NavBar />
//     );
//   }
//

const Navigation = StackNavigator({
    First:{screen:HomeScreen},
    Second: {screen:Login}
});



// export default class App extends React.Component {
//
//
//
// const styles = StyleSheet.create({
//    container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: '#F5FCFF',
//   },
//   welcome: {
//     fontSize: 20,
//     textAlign: 'center',
//     margin: 10,
//   },
//   instructions: {
//     textAlign: 'center',
//     color: '#333333',
//     marginBottom: 5,
//   },
// });


export default Navigation;


