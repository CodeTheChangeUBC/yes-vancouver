import React, { Component } from 'react'
import { Image, ImageBackground, ScrollView, StyleSheet, Text, View } from 'react-native'

export default class NewsFeedView extends Component {

    static navigationOptions = {
        title:"News Feed",
        headerLeft: (<View></View>),
        tabBarIcon: ({ focused, tintColor }) => focused ?
            ( <Image
                    source={require('../../images/NavBar/YES-icon-white-3x.png')}
                    resizeMode="contain"
                    style={{height:30}}/>
            ) :
            ( <Image
                    source={require('../../images/NavBar/YES-icon-orange-3x.png')}
                    resizeMode="contain"
                    style={{height:30}}/>
            )
    }

    render() {
        return (
            <View style={styles.container}>
                <ScrollView>
                    <View style={{width: 30, height: 50}} />
                    <View>
                        <ImageBackground
                            style={styles.backdrop}
                            source={require('../../images/Home/Logo-with-progress-bar.png')}>
                            <Text style={styles.headline}>$3,800</Text>
                        </ImageBackground>
                    </View>
                    <View>
                        <Text style={styles.inLine}>Our 2017 fundraising goal:</Text>
                        <Text style={styles.headline}>$25,000</Text>
                    </View>
                    <View style={{width: 30, height: 50}} />
                    <Image
                        resizeMode='stretch'
                        source={require('../../images/Events/Event-Detail-Banner.png')}/>
                </ScrollView>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    inLine: {
        fontFamily: 'source-sans-pro-bold',
        fontSize: 20,
        textAlign: 'center',
        color: '#47423d',
        paddingVertical: 15,
        paddingHorizontal: 30,
    },
    backdrop: {
        alignItems: 'center',
        paddingTop: 80,
    },
    backdropView: {
        height: 120,
        width: 320,
        backgroundColor: 'rgba(0,0,0,0)',
    },
    headline: {
        fontFamily: 'source-sans-pro-bold',
        fontSize: 40,
        textAlign: 'center',
        backgroundColor: 'rgba(0,0,0,0)',
        color: '#464647',
        paddingVertical: 15,
        paddingHorizontal: 30,
    }
})
