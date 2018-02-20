import React, { Component } from 'react';
import { StyleSheet, View, Image, Text } from 'react-native';


export default class PerksItem extends Component {

    constructor(props) {
        super(props);

        this.state = {
            image: props.imageA,
        };

    }
    componentWillReceiveProps(nextProps) {
        // update original states
        this.setState({
            image: nextProps.imageA,
        });
    }
    render() {

        return (
            <View style={styles.container}>
                <View style={styles.perksPartnerColumn}>
                    <Image
                        source={this.state.image}
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

/*

*/
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
        flex: 1,
        justifyContent: 'center',
        alignItems: 'flex-end',
        paddingHorizontal: 20
    },
    favouriteStarIcon: {
        width: 30,
        height: 30
    }
});
