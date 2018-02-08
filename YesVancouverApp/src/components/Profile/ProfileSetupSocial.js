import React, { Component } from 'react';
import { StyleSheet, View, Image, Text, TextInput, TouchableOpacity, KeyboardAvoidingView, StatusBar, Platform } from 'react-native';
import Header from '../Navigation/Header';
import Expo from 'expo'


export default class ProfileSetupSocial extends Component {
    constructor(props) {
        super(props);
        this.state = {
            linkedIn: '',
            facebook: '',
            twitter: '',
            instagram: '',
            website: ''
        };
    }

    render() {
        return (
            <KeyboardAvoidingView behavior='padding' style={styles.container}>
                <View paddingTop={(Platform.OS === 'ios') ? Expo.Constants.statusBarHeight : 0}>
                    <StatusBar
                        barStyle='dark-content'
                        backgroundColor='#ffffff'
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
                            <Image source={require('../../images/Login-Signup/Pagination/Pagination2-3x.png')}/>
                        </View>

                        <View style={styles.backArrowContainer}></View>
                    </View>
                </View>
                <View style={styles.content}>
                    <Text style={styles.title}>
                        Enter information you would like other YES! Members to see
                    </Text>

                    <View style={styles.textInputContainer}>
                        <TextInput
                            placeholder='LinkedIn'
                            placeholderTextColor='#979797'
                            style={styles.textInput}
                            underlineColorAndroid='transparent'
                            autoCapitalize='none'
                            autoCorrect={false}
                            returnKeyType='go'
                            onChangeText={(linkedIn) => this.setState({linkedIn})}
                            value={this.state.linkedIn}
                        />
                    </View>
                    <View style={styles.textInputContainer}>
                        <TextInput
                            placeholder='Facebook'
                            placeholderTextColor='#979797'
                            style={styles.textInput}
                            underlineColorAndroid='transparent'
                            autoCapitalize='none'
                            autoCorrect={false}
                            returnKeyType='go'
                            onChangeText={(facebook) => this.setState({facebook})}
                            value={this.state.facebook}
                        />
                    </View>
                    <View style={styles.textInputContainer}>
                        <TextInput
                            placeholder='Twitter'
                            placeholderTextColor='#979797'
                            style={styles.textInput}
                            underlineColorAndroid='transparent'
                            autoCapitalize='none'
                            autoCorrect={false}
                            returnKeyType='go'
                            onChangeText={(twitter) => this.setState({twitter})}
                            value={this.state.twitter}
                        />
                    </View>
                    <View style={styles.textInputContainer}>
                        <TextInput
                            placeholder='Instagram'
                            placeholderTextColor='#979797'
                            style={styles.textInput}
                            underlineColorAndroid='transparent'
                            autoCapitalize='none'
                            autoCorrect={false}
                            returnKeyType='go'
                            onChangeText={(instagram) => this.setState({instagram})}
                            value={this.state.instagram}
                        />
                    </View>
                    <View style={styles.textInputContainer}>
                        <TextInput
                            placeholder='Website'
                            placeholderTextColor='#979797'
                            style={styles.textInput}
                            underlineColorAndroid='transparent'
                            autoCapitalize='none'
                            autoCorrect={false}
                            returnKeyType='go'
                            onChangeText={(website) => this.setState({website})}
                            value={this.state.website}
                        />
                    </View>

                    <View style={styles.nextButtonContainer}>
                        <View style={styles.nextButtonSpacer}></View>
                            <TouchableOpacity style={styles.nextButtonRectangle}>
                                <Text style={styles.nextButtonText}>Next</Text>
                            </TouchableOpacity>
                        <View style={styles.nextButtonSpacer}></View>
                    </View>

                    <Text style={styles.skip}>
                        Skip this step
                    </Text>
                </View>
            </KeyboardAvoidingView>
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
        paddingHorizontal: 48,
        paddingTop: 66
    },
    title:{
        fontFamily: 'alternate-gothic-no3-d-regular',
        fontSize: 24,
        color: '#F74F72',
        marginBottom: 37
    },
    textInput: {
        fontFamily: 'alternate-gothic-no3-d-regular',
        fontSize: 24,
        color: 'black',
        height: 24
    },
    textInputContainer: {
        borderBottomWidth: 1,
        borderBottomColor: 'black',
        marginHorizontal: 5,
        marginVertical: 13
    },
    nextButtonContainer: {
        flexDirection:'row',
        paddingTop: 30,
        paddingBottom: 20
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
