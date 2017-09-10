import React, { Component } from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';

export default class NewsFeedView extends Component {
    static navigationOptions = {
        tabBarLabel: 'NewsFeedView',
        tabBarIcon: ({ tintColor }) => (
            <Image 
                source={require('/Users/OL/Documents/YesVancouver/yes-vancouver/YesVancouverApp/src/images/Perks-icon-white@3x.png')}
                size={50}
            />
        )
    }

    render() {
        return (
            <View style={styles.container}>
                <Text>News Feed View</Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});