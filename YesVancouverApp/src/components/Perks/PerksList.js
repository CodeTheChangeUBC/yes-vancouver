import React, { Component } from 'react';
import { StyleSheet, View, Image, SectionList, Text, FlatList, TouchableHighlight } from 'react-native';
import Header from '../Navigation/Header';
import PerksItem from './PerksItem';

import { List, ListItem } from "react-native-elements";



export default class PerksList extends Component {

    static navigationOptions = {
        title: "PerksList",
    };

    constructor(props)  {
        super(props);
    }



    goToNextScreen = () => {
        let {navigate} = this.props.navigation;
        return navigate('Aveda');
    }

    renderItem = ({item}) => {

        return (

            <TouchableHighlight onPress={() => this.goToNextScreen()}>
                <View>
                    <PerksItem imageA={item.image} />
                </View>
            </TouchableHighlight>
        //    <Text>{image}</Text>
        );
    }

    render() {

        return (
            <View style={styles.container}>
                <View style={styles.headerContainer}>
                    <Header style={styles.header}/>
                    <View style={styles.headerIconContainer}>
                        <View style={styles.menuContainer}></View>
                        <View style={styles.perksPartnerTitleContainer}>
                            <Text style={styles.perksPartnerTitleText}>
                                Perks Partners
                            </Text>
                        </View>
                        <View style={styles.menuContainer}>
                            <Image source={require('../../images/Header/Menu-icon-white-3x.png')}
                                resizeMode="contain"
                                style={{height:30}}/>
                        </View>
                    </View>
                </View>
                <View style={styles.content}>
                <View style={styles.sortBar}>
                    <View style={styles.aToZTab}>
                        <Image 
                            source={require('../../images/Perks/Icons/Alphabetical-Sort-Unselected.png')}
                            style={styles.sortIcon}/>
                        <Text style={styles.aToZText}>A-Z</Text>
                    </View>
                    <View style={styles.categoriesTab}>
                        <Image 
                            source={require('../../images/Perks/Icons/Category-Sort-Unselected.png')}
                            style={styles.sortIcon}/>
                        <Text style={styles.categoriesText}>Categories</Text>
                    </View>
                    <View style={styles.favouritesTab}>
                        <Image 
                            source={require('../../images/Perks/Icons/Favourites-Sort-Unselected.png')}
                            style={styles.sortIcon}/>
                        <Text style={styles.favouritesText}>Favourites</Text>
                    </View>
                </View>
                    <List>
                        <FlatList
                            data={[
                                {key: 'Aveda',
                                    image: require('../../images/Perks/Aveda.png')},
                                {key: 'Camp-Tech',
                                    image: require('../../images/Perks/Camp-Tech.png')},
                                {key: 'FloatHouse',
                                    image: require('../../images/Perks/Floathouse.png')},
                                {key: 'Red-Academy',
                                    image: require('../../images/Perks/Red-Academy.png')},
                                {key: 'Spin-Society',
                                    image: require('../../images/Perks/Spin-Society.png')},


                            ]}
                            renderItem={this.renderItem}
                        />
                    </List>

                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    content: {
        flex: 7
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
    menuContainer: {
        flex: 1,
        alignItems: 'center'
    },
    perksPartnerTitleContainer: {
        flex: 4,
        alignItems: 'center'
    },
    perksPartnerTitleText: {
        fontFamily: 'alternate-gothic-no3-d-regular',
        fontSize: 24,
        color: '#FFFFFF',
        backgroundColor: 'transparent',
        textAlign: 'center'
    },
    sortBar: {
        flexDirection: 'row',
        backgroundColor: 'white',
        paddingVertical: 10,
        borderBottomColor: '#979797',
        borderBottomWidth: 1
    },
    sortIcon: {
        width: 30,
        height: 30
    },
    aToZTab: {
        flex: 2,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center'
    },
    aToZText: {
        textAlign:'left',
        color: '#979797',
        fontFamily: 'alternate-gothic-no3-d-regular',
        fontSize: 24
    },
    categoriesTab: {
        flex: 3,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    categoriesText: {
        textAlign:'center',
        color: '#979797',
        fontFamily: 'alternate-gothic-no3-d-regular',
        fontSize: 24,
    },
    favouritesTab: {
        flex: 3,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center'
    },
    favouritesText: {
        textAlign:'right',
        color: '#979797',
        fontFamily: 'alternate-gothic-no3-d-regular',
        fontSize: 24
    }
});
