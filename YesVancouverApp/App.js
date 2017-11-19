import React from 'react';
import Navigation from './src/components/Navigation/Navigation';
import { Font } from 'expo';

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
            <Navigation />
        );
    }
}
