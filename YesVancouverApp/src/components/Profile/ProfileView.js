import React, { Component } from 'react';
import { StyleSheet, Text, View, Image, ScrollView, Button, ToastAndroid, FlatList} from 'react-native';

export default class ProfileView extends Component {

    static navigationOptions = {
        tabBarLabel: 'ProfileView',
        tabBarIcon: ({ focused, tintColor }) => focused ?
        ( <Image 
            source={require('../../images/NavBar/Profile-icon-white@3x.png')}
            size={50}/> 
        ) :
        ( <Image 
            source={require('../../images/NavBar/Profile-icon-orange@3x.png')}
            size={50}/>
        )
    };

    setString(){
        var xmlHttp = new XMLHttpRequest();
        xmlHttp.open("POST", 'https://oauth.wildapricot.org/auth/token', true);
        xmlHttp.open("GET", "https://yvsuper.wildapricot.org/admin/contacts/", true);
        console.log(xmlHttp.responseText);
        return xmlHttp.responseText.length;
        //return 5
    }

    render() {
        return (
            <ScrollView contentContainerStyle={styles.container}>
                <Image
                    style={styles.profileLogo}
                    source={require('../../images/Login-Signup/Profile-Pic-Cropped.png')}/>
                <Text style={styles.nameFont}>Camilla White</Text>
                <Text style={styles.subHeading}>
                    <Image
                        style={styles.imageLogo}
                        source={require('../../images/Login-Signup/YES-logo.png')}/>
                        YES! Vancouver Member
                </Text>
                <Text style={styles.paragraphWithMargin}>First joined on June 23, 2004</Text>
                <Text style={styles.paragraph}>Current Membership</Text>
                <Text style={styles.paragraph}>July 04, 2016 - July 04, 2017</Text>
                <View style={styles.buttonView}>
                    <Button color="#ED4969" title="Extend membership" onPress={
                        ()=> ToastAndroid.show("Extended membership" ,ToastAndroid.SHORT)
                    }/>
                </View>

                <Text style={styles.nameFont}>{this.setString()} accounts</Text>

                <Text style={styles.nameFont}>My contact information</Text>
                <Text style={styles.contactInfo}>
                    <Image
                        style={styles.imageLogo}
                        source={require('../../images/Settings/iconmonstr-email-4.png')}/>
                       |     camilla.white@gmail.com
                </Text>
                <Text style={styles.contactInfo}>
                    <Image
                        style={styles.imageLogo}
                        source={require('../../images/Settings/iconmonstr-phone-1.png')}/>
                    |     604.123.4567
                </Text>
                <Text style={styles.contactInfo}>
                    <Image
                        style={styles.imageLogo}
                        source={require('../../images/Settings/iconmonstr-linkedin-1.png')}/>
                   |     linkedin.com/in/camillawhite
                </Text>
                <Text style={styles.dropDown}>
                    <Image
                        style={styles.imageLogo}
                        source={require('../../images/Settings/Arrow-open.png')}/>
                    My events
                </Text>
                <FlatList
                    data={[{key: 'May 1 | Game Changers'}]}
                    renderItem={({item}) => <Text>{item.key}</Text>}
                />
                <Text style={styles.dropDown}>
                    <Image
                        style={styles.imageLogo}
                        source={require('../../images/Settings/Arrow-open.png')}/>
                    My past events
                </Text>
                <FlatList
                    data={[{key: 'February 19 | Event 1'},
                        {key: 'March 24 | Event 2'},
                        {key: 'April 20 | Event 3'}]}
                    renderItem={({item}) => <Text>{item.key}</Text>}
                />
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    profileLogo:{
        alignContent:'center',
        justifyContent: 'center'
    },
    imageLogo:{
        width:30,
        height:30,
        marginRight : 30
    },
    nameFont:{
        fontSize:25,
        fontWeight:'bold'
    },
    subHeading:{
        fontSize:28
    },
    paragraph:{
        fontSize:16
    },
    paragraphWithMargin:{
        fontSize:16,
        marginBottom: 15
    },
    buttonView:{
        marginBottom: 30,
        marginTop: 20
    },
    contactInfo:{
        fontSize:18
    },
    dropDown:{
        fontSize: 22,
        fontWeight:"bold",
        marginTop: 16,
        marginBottom:10
    },
    imageButtonView:{
        marginRight:30
    }
});