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
                            source={require('../../images/Perks/Aveda.png')}
                            // source={require('../../images/Perks/Camp-Tech.png')}
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
                        <Text style={styles.perkDetails}>
                            15% off all salon services and products
                        </Text>
                        <Text style={styles.toRedeemHeader}>
                            TO REDEEM
                        </Text>
                        <Text style={styles.toRedeemInstructions}>
                            Present this screen at the time of payment
                        </Text>
                        <View style={styles.toRedeemCodeContainer}>
                            <Text style={styles.toRedeemCode}>123XYZ72</Text>
                            <View style={styles.toRedeemImageContainer}>
                                <Image
                                    source={require('../../images/Perks/Barcode.png')}
                                    style={styles.toRedeemImage}
                                />
                            </View>
                            <View style={{paddingVertical: 10}}></View>
                            <Text style={styles.memberText}>Camilla White</Text>
                            <View style={styles.yesVancouverLogoContainer}>
                                <Image
                                    source={require('../../images/Settings/yes-logo@3x.png')}
                                    style={styles.yesVancouverLogo}
                                />
                                <Text style={styles.memberText}>YES! Vancouver Member</Text>
                            </View>
                        </View>
                        <Text style={styles.questionsText}>
                            Questions? Email
                        </Text>
                        <Text style={styles.emailText}>
                            perks@yesvancouver.org
                        </Text>
                        <View style={{paddingVertical: 10}}></View>
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
    },
    perkDetails: {
        fontFamily: 'source-sans-pro-regular',
        fontSize: 20,
        color: '#464647',
        textAlign: 'center',
        paddingHorizontal: 58,
        paddingVertical: 5,
        borderColor: 'black',
        borderWidth: 1
    },
    toRedeemHeader: {
        fontFamily: 'alternate-gothic-no3-d-regular',
        fontSize: 28,
        color: '#EA4B6C',
        textAlign: 'center',
        paddingTop: 40,
        paddingBottom: 5,
        borderColor: 'black',
        borderWidth: 1
    },
    toRedeemInstructions: {
        fontFamily: 'source-sans-pro-regular',
        fontSize: 20,
        color: '#464647',
        textAlign: 'center',
        paddingHorizontal: 58,
        paddingVertical: 5,
        borderColor: 'black',
        borderWidth: 1
    },
    toRedeemCodeContainer: {
        marginHorizontal: 25,
        marginVertical: 30,
        paddingVertical: 25,
        borderColor: 'rgba(151,151,151,0.4)',
        borderWidth: 1
    },
    toRedeemCode: {
        fontFamily: 'alternate-gothic-no3-d-regular',
        fontSize: 45,
        color: '#464647',
        textAlign: 'center',
        paddingHorizontal: 50,
        paddingVertical: 10,
        borderColor: 'orange',
        borderWidth: 1,
    },
    toRedeemImageContainer: {
        height: 100,
        paddingVertical: 10,
        paddingHorizontal: 35,
        borderColor: 'green',
        borderWidth: 1
    },
    toRedeemImage: {
        flex: 1,
        alignSelf: 'stretch',
        width: null,
        height: null,
        borderColor: 'red',
        borderWidth: 1
    },
    memberText: {
        fontFamily: 'alternate-gothic-no3-d-regular',
        fontSize: 30,
        color: '#464647',
        textAlign: 'center',
    },
    yesVancouverLogoContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 5
    },
    yesVancouverLogo: {
        width: 45,
        height: 45,
        marginRight: 5
    },
    questionsText: {
        fontFamily: 'source-sans-pro-regular',
        fontSize: 20,
        color: '#464647',
        textAlign: 'center',
        paddingVertical: 5,
    },
    emailText: {
        fontFamily: 'source-sans-pro-regular',
        fontSize: 20,
        color: '#EA4B6C',
        textAlign: 'center',
        paddingVertical: 5,
    }
});
