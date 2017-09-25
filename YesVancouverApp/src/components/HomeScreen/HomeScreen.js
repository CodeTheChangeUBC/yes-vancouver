/**
 * Created by joycheng on 2017-08-24.
 */
import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
const util = require('util');

export default class HomeScreen extends React.Component {
    static navigationOptions = {
        title:"HomeScreen",
    };

    render(){
        var {navigate} = this.props.navigation;
        return(
            <View>
                <Text>This is homescreen</Text>
                <Button
                    onPress={
                        ()=> navigate("Second",{})
                    }
                    title="Go to Login"
                />
            </View>
        )
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

