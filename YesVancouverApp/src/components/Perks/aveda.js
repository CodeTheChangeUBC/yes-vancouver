/**
 * Created by joycheng on 2018-02-17.
 */
import React from 'react';
import { StyleSheet, Image, Text, View, Button, StatusBar, ImageBackground } from 'react-native';

export default class Aveda extends React.Component {
    static navigationOptions = {
        title: "Aveda",
    };

    render(){
        let {navigate} = this.props.navigation;
        return(
            <Button color="#ED4969" title="PlaceHolder"/>
    )}



}
/*
<View>
    <Button color="#ED4969" title="backToView" onPress={
        ()=> navigate("PerksView", {})
    }/>
</View>
*/
const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    mainLogo:{
        alignContent:'center',
        justifyContent: 'center',
        marginTop: 90,
        marginBottom: 80
    },
    buttonStyle:{
        alignSelf : 'stretch',
        marginBottom : 30
    }
});