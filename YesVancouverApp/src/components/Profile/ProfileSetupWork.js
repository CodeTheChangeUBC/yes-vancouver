import React, { Component } from 'react';
import { StyleSheet, View, Image, SectionList, Text } from 'react-native';
import Header from '../Navigation/Header';


export default class ProfileSetupWork extends Component {
    render() {
        return (
            <View style={styles.container}>
                <View style={{flex:1}}>
                    <Header style={styles.header}/>
                    
                    <View style={{
                        position: 'absolute',
                        width: '100%',
                        height: '100%',
                        flexDirection: 'row',
                        justifyContent: 'center',
                        alignItems: 'center'
                    }}>
                        <View style={
                            {
                            flex: 1,
                            alignItems: 'center',
                            borderWidth: 2,
                            borderColor: 'black',
                            }
                        }>
                            <Image source={require('../../images/Header/White-arrow@3x.png')}/>
                        </View>

                        <View style={
                            {
                            flex: 4,
                            alignItems: 'center',
                            borderWidth: 2,
                            borderColor: 'black',
                            }
                        }>
                            <Image source={require('../../images/Login-Signup/Pagination/Pagination1@3x.png')}/>
                        </View>

                        <View style={
                            {
                            flex: 1,
                            borderWidth: 2,
                            borderColor: 'black',
                            }
                        }>
                        </View>

                    </View>
                </View>
                <View style={styles.content}>
                
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    header: {
        flex: 1,
        width: null,
        height: null
    },
    content: {
        flex: 7,
        backgroundColor: 'black'
    },
});