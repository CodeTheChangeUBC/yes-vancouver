import React, { Component } from 'react';
import { StyleSheet, View, Image } from 'react-native';


export default class PerksItem extends Component {
    render() {
        return (
            <View style={styles.container}>
                <View style={styles.perksPartnerColumn}>
                    <Image 
                        source={require('../../images/Perks/Aveda.png')}
                        // source={require('../../images/Perks/Camp-Tech.png')}
                        // source={require('../../images/Perks/Floathouse.png')}
                        // source={require('../../images/Perks/Red-Academy.png')}
                        // source={require('../../images/Perks/Spin-Society.png')}
                        resizeMode='contain'
                        style={styles.perksPartnerLogo}/>
                </View>
                <View style={styles.spacerColumn}></View>
                <View style={styles.favouriteStarColumn}>
                    <Image 
                        source={require('../../images/Perks/Icons/Favourites-Item-Unselected.png')}
                        style={styles.favouriteStarIcon}/>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        height: 100,
        borderStyle: 'solid',
        borderWidth: 0.5,
        borderColor: '#979797',
        backgroundColor: 'white'
    },
    perksPartnerColumn: {
        flex: 2,
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingVertical: 10
    },
    perksPartnerLogo: {
        flex: 1,
        alignSelf: 'stretch',
        width: null,
        height: null
    },
    spacerColumn: {
        flex: 1
    },
    favouriteStarColumn: {
        flex: 1
    },
    favouriteStarIcon: {
        width: 30,
        height: 30
    }
});
