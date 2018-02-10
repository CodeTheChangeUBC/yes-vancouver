import React from 'react';
import { Text, View } from 'react-native'
import Navigation from './src/components/Navigation/Navigation';
import { Font } from 'expo';
import ProfileSetupWork from './src/components/Profile/ProfileSetupWork'
import ProfileSetupSocial from './src/components/Profile/ProfileSetupSocial'
import ProfileSetupPhoto from './src/components/Profile/ProfileSetupPhoto'
// =========================================================================
import ApiUtils from './src/utils/ApiUtils'
import { ClientSecrets } from './config/config'
// =========================================================================

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


        // =========================================================================
        let base64 = require('base-64')
        username = ClientSecrets.API_USERNAME;
        password = ClientSecrets.API_PASSWORD;
        basicAuthHeaderValue = 'Basic ' + base64.encode(username + ":" + password)
        console.log(basicAuthHeaderValue)

        var requestAuthTokenBody = {
            'grant_type': 'client_credentials',
            'scope': 'contacts finances events'
        };
        
        fetch('https://oauth.wildapricot.org/auth/token', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization': basicAuthHeaderValue
          },
          body: ApiUtils.constructFormUrlEncodedBody(requestAuthTokenBody)
        })
        .then(response => response.json())
        .then(responseJson => console.log(responseJson))
        .catch((error) => {
            console.error(error);
        });

        console.log("DONE")
        // =========================================================================
    }
    
    render() {
        if (!this.state.fontLoaded) {
            return <Expo.AppLoading />
        }
        return (
            <Navigation />         
            //<ProfileSetupWork/>
            //<ProfileSetupSocial/>
            //<ProfileSetupPhoto/>
        );
    }

    
}
