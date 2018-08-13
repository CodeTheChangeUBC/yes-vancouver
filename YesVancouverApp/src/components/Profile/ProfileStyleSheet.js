import {StyleSheet} from 'react-native'

export const styles = StyleSheet.create({
    activityIndicator: {
        flex: 1,
        justifyContent: 'center',
        flexDirection: 'row',
        justifyContent: 'space-around',
        padding: 10
    },
    container: {
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center'
    },
    editProfileContainer:{
        backgroundColor: '#fff'
    },
    internalView:{
        width: '100%',
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center'
    },
    profileLogo:{
        alignContent:'center',
        justifyContent: 'center'
    },
    editTextTitles:{
        textAlign: 'center',
        fontSize: 20
    },
    imageLogo:{
        width:30,
        height:30,
        marginRight : 30
    },
    input: {
        height: 30,
        marginTop : 20,
        backgroundColor: 'rgba(255,255,255,0.7)',
        marginBottom: 20,
        borderBottomWidth: 1,
        marginLeft : 10,
        marginRight: 10
    },
    nameFont:{
        marginTop : 20,
        marginBottom: 15,
        fontSize:25,
        fontWeight:'bold'
    },
    subHeading:{
        fontSize:28,
        textAlign: 'center',
        marginBottom: 20
    },
    paragraph:{
        fontSize:16
    },
    paragraphWithMargin:{
        fontSize:16,
        marginBottom: 15
    },
    extendMembershipButtonView:{
        marginBottom: 30,
        marginTop: 20
    },
    buttonView:{
        marginBottom: 30,
        marginTop: 10
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
    },
    flatList:{
        marginBottom: 20
    }
});