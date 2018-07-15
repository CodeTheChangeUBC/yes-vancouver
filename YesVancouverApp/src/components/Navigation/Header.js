import React, { Component } from 'react';
import { StyleSheet, View, Image } from 'react-native';


const Header = () => {
    return (
        <View style={styles.imageContainer}>
            <Image 
                style={styles.headerImage}
                resizeMode='stretch'
                source={require('../../images/Header/Top-header-bar-3x.png')}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    imageContainer: {
        flex: 1
    },
    headerImage: {
        flex: 1,
        width: null,
        height: null
    }
});

export default Header;


{/* <View style={styles.headerContainer}>
    <Header style={styles.header}/>
    <View style={styles.headerIconContainer}>
        <View style={styles.menuContainer}></View>
        <View style={styles.eventsTitleContainer}>
            <Text style={styles.eventsTitleText}>
                Events
            </Text>
        </View>
        <View style={styles.menuContainer}>
            <Image source={require('../../images/Header/Menu-icon-white-3x.png')}
                resizeMode="contain"
                style={{height:30}}/>
        </View>
    </View>
</View>

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
menuContainer: {
    flex: 1,
    alignItems: 'center'
}, */}