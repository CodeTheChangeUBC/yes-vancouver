import React, { Component } from 'react';
import { StyleSheet, View, Image, ScrollView, Text, TouchableOpacity } from 'react-native';
import Header from '../Navigation/Header';


export default class PerksDetails extends Component {
    render() {
        return (
            <View style={styles.container}>
                <Header style={styles.header}/>
                <View style={styles.content}>
                    <ScrollView>
                        <View style={styles.logoContainer}>
                        <Image 
                            // source={require('../../images/Perks/Aveda.png')}
                            source={require('../../images/Perks/Camp-Tech.png')}
                            // source={require('../../images/Perks/Floathouse.png')}
                            // source={require('../../images/Perks/Red-Academy.png')}
                            // source={require('../../images/Perks/Spin-Society.png')}
                            resizeMode='contain'
                            style={styles.logo}/>
                        <Image 
                            source={require('../../images/Perks/Icons/Favourites-Item-Unselected.png')}
                            resizeMode='contain'
                            style={styles.favouritesStar}/>
                        </View>

                        <Text>HI</Text>
                        <Text>HI</Text>
                        <Text>HI</Text>
                        <Text>HI</Text>
                        <Text>HI</Text>
                        <Text>HI</Text>
                        <Text>HI</Text>
                        <Text>HI</Text>
                        <Text>HI</Text>
                        <Text>HI</Text>
                        <Text>HI</Text>
                        <Text>HI</Text>
                        <Text>HI</Text>
                        <Text>HI</Text>
                        <Text>HI</Text>
                        <Text>HI</Text>
                        <Text>HI</Text>
                        <Text>HI</Text>
                        <Text>HI</Text>
                        <Text>HI</Text>
                        <Text>HI</Text>
                        <Text>HI</Text>
                        <Text>HI</Text>
                        <Text>HI</Text>
                        <Text>HI</Text>
                        <Text>HI</Text>
                    </ScrollView>
                </View>
            </View>
        );
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
        backgroundColor: 'white'
    },
    logoContainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 50,
        paddingVertical: 20,
        borderColor: 'red',
        borderWidth: 1,
        height: 150
    },
    logo: {
        flex: 1,
        alignSelf: 'stretch',
        width: null,
        height: null,
        borderColor: 'black',
        borderWidth: 1
    },
    favouritesStar: {
        position: 'absolute',
        top: 20,
        right: 20,
        width: 30,
        height: 30
    }
});
