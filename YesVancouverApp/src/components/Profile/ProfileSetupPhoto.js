import React, { Component } from 'react';
import { StyleSheet, View, Image, Text, TextInput, TouchableOpacity, StatusBar, Platform, ImageBackground } from 'react-native';
import Header from '../Navigation/Header';
import Expo from 'expo'


export default class ProfileSetupPhoto extends Component {
    static navigationOptions = {
        title:"ProfileSetupPhoto",
    }

    render() {
        var {navigate} = this.props.navigation
        return (
            <View style={styles.container}>
                <View paddingTop={(Platform.OS === 'ios') ? Expo.Constants.statusBarHeight : 0}>
                    <StatusBar
                        barStyle='dark-content'
                        backgroundColor='#FFFFFF'
                        hidden={false}
                    />
                </View>
                <View style={styles.headerContainer}>
                    <Header style={styles.header}/>
                    
                    <View style={styles.headerIconContainer}>
                        <View style={styles.backArrowContainer}>
                            <Image source={require('../../images/Header/White-arrow-3x.png')}/>
                        </View>

                        <View style={styles.pageIndicatorContainer}>
                            <Image source={require('../../images/Login-Signup/Pagination/Pagination3-3x.png')}/>
                        </View>

                        <View style={styles.backArrowContainer}></View>
                    </View>
                </View>
                <View style={styles.content}>
                    <Text style={styles.title}>
                        Profile photo
                    </Text>

                    <View style={styles.imageContainer}>
                        <ImageBackground source={require('../../images/Login-Signup/Profile-Photo-Click-To-Add.png')}
                            style={styles.image}>
                            <View style={styles.imageTextBackground}>
                                <Text style={styles.imageText}>Tap to add</Text>
                                <Text style={styles.imageText}>a photo</Text>
                            </View>
                        </ImageBackground>
                    </View>

                    <Text style={styles.description}>
                        You can add a photo to your profile to help other YES! members recognize you.
                        Keep it professional (think like your LinkedIn profile photo).
                    </Text>
     
                    <View style={styles.nextButtonContainer}>
                        <View style={styles.nextButtonSpacer}></View>
                            <TouchableOpacity style={styles.nextButtonRectangle}
                                onPress={()=> navigate("NavBar",{})}>
                                <Text style={styles.nextButtonText}>Next</Text>
                            </TouchableOpacity>
                        <View style={styles.nextButtonSpacer}></View>
                    </View>

                    <Text style={styles.skip}>
                        Skip this step
                    </Text>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    headerContainer: {
        flex: 1
    },
    header: {
        flex: 1,
        width: null,
        height: null
    },
    headerIconContainer: {
        position: 'absolute',
        width: '100%',
        height: '100%',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    backArrowContainer: {
        flex: 1,
        alignItems: 'center'
    },
    pageIndicatorContainer: {
        flex: 4,
        alignItems: 'center'
    },
    content: {
        flex: 7,
        alignItems: 'center',
        paddingHorizontal: 48,
        paddingTop: 30
    },
    title:{
        fontFamily: 'alternate-gothic-no3-d-regular',
        fontSize: 24,
        color: '#F74F72',
        textAlign: 'center'
    },
    imageContainer: {
        paddingVertical: 15
    },
    image: {
        width: 200,
        height: 200,
        justifyContent: 'center',
        alignItems: 'center'
    },
    imageTextBackground: {
        backgroundColor: 'rgba(0,0,0,0)'
    },
    imageText: {
        fontFamily: 'source-sans-pro-regular',
        fontSize: 20,
        color: '#464647',
        textAlign: 'center'
    },
    description: {
        fontFamily: 'source-sans-pro-regular',
        fontSize: 20,
        color: '#464647',
        textAlign: 'center',
        paddingHorizontal: 10,
        paddingVertical: 10
    },
    nextButtonContainer: {
        flexDirection:'row',
        paddingTop: 30,
        paddingBottom: 15
    },
    nextButtonRectangle: {
        backgroundColor: '#EA4B6C',
        paddingVertical: 10,
        alignItems: 'center',
        flex: 4
    },
    nextButtonText: {
        fontFamily: 'alternate-gothic-no3-d-regular',
        fontSize: 24,
        color: 'white'
    },
    nextButtonSpacer: {
        flex: 3
    },
    skip: {
        fontFamily: 'source-sans-pro-regular',
        fontSize: 20,
        color: '#464647',
        textAlign: 'center'
    }
});
