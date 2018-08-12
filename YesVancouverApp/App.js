import React from 'react'
import { StatusBar, StyleSheet, View } from 'react-native'
import Navigation from './src/components/Navigation/Navigation'
import Expo, { Font } from 'expo'
import ProfileSetupWork from './src/components/Profile/Old Views/ProfileSetupWork'
import ProfileSetupSocial from './src/components/Profile/Old Views/ProfileSetupSocial'
import ProfileSetupPhoto from './src/components/Profile/Old Views/ProfileSetupPhoto'


export default class App extends React.Component {
    state = {
        fontLoaded: false,
    };

    async componentDidMount() {
        await Font.loadAsync({
            'source-sans-pro-regular' : require('./src/fonts/source-sans-pro-regular.ttf'),
            'source-sans-pro-semibold' : require('./src/fonts/source-sans-pro-semibold.ttf'),
            'source-sans-pro-bold' : require('./src/fonts/source-sans-pro-bold.ttf'),
            'alternate-gothic-no3-d-regular' : require('./src/fonts/alternate-gothic-no3-d-regular.ttf')
        });
        this.setState({ fontLoaded: true });
    }
    
    render() {
        if (!this.state.fontLoaded) {
            return <Expo.AppLoading />
        }
        return (
            <View style={styles.MainContainer}>
                <StatusBar 
                    barStyle="dark-content" 
                    hidden={false}
                    translucent={true}
                    backgroundColor='white'
                    networkActivityIndicatorVisible={true}
                />
                <Navigation />      
            </View>
            //<ProfileSetupWork/>
            //<ProfileSetupSocial/>
            //<ProfileSetupPhoto/>
        );
    } 
}

const styles = StyleSheet.create({
    MainContainer: {
        marginTop: Expo.Constants.statusBarHeight,
        justifyContent: 'center',
        flex: 1
    }
})
