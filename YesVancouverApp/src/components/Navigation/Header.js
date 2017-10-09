import React, { Component } from 'react';
import { StyleSheet, View, Image } from 'react-native';


const Header = () => {
    return (
        <View style={styles.imageContainer}>
            <Image 
                style={styles.headerImage}
                resizeMode='stretch'
                source={require('../../images/Header/Top-header-bar@3x.png')}
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