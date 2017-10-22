import React, { Component } from 'react';
import { StyleSheet, View, Image, SectionList, Text } from 'react-native';
import Header from '../Navigation/Header';
import EventsItem from './EventsItem';


const datasource = [
    {data: [ {name: 'Event1'}, {name: 'Event2'} ], key: 'Upcoming'},
    {data: [ {name: 'Event3'}, {name: 'Event4'}, {name: 'Event5'} ], key: 'Past Events'}
]

export default class EventsList extends Component {
    renderItem = (item) => {
        return (
            <EventsItem />
            // <Text style={styles.text}>{item.item.name}</Text>
        );
    }

    renderHeader = (headerItem) => {
        return (
            <View style={styles.sectionContainer}>
                <Text style={styles.sectionHeader}>{headerItem.section.key}</Text>
            </View>
        );
    }

    render() {
        return (
            <View style={styles.container}>
                <Header style={styles.header}/>
                <View style={styles.content}>
                    <View style={styles.backgroundContainer}>
                        <Image style={styles.backgroundImage}
                            resizeMode='stretch'
                            source={require('../../images/Events/Events-background.png')}
                        />
                    </View>
                    <View style={styles.overlay}>
                        <SectionList
                            renderItem={this.renderItem}
                            renderSectionHeader={this.renderHeader}
                            sections={datasource}
                            keyExtractor={(item) => item.name}
                        />
                    </View>
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
    overlay: {
        opacity: 1,
        backgroundColor: 'rgba(0, 0, 0, 0)'
    },
    header: {
        flex: 1,
        width: null,
        height: null
    },
    backgroundContainer: {
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
    },
    backgroundImage: {
        flex: 7,
        width: null,
        height: null
    },
    sectionContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        height: 100,
        borderStyle: 'solid',
        borderWidth: 2,
        borderColor: '#DCDCDC'
    },
    sectionHeader: {
        fontSize: 30,
        fontWeight: 'bold',
        textAlign: 'center',
        color: '#EA4B6C'
    },
    text: {
        fontSize: 14,
        color: 'rgba(0,0,0,1)',
    }
});