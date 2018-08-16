import { StyleSheet } from 'react-native'

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
    editProfileContainer: {
        backgroundColor: '#fff'
    },
    internalView: {
        width: '100%',
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center'
    },
    profileLogo: {
        alignContent:'center',
        justifyContent: 'center',
        borderRadius: 40
    },
    editTextTitles: {
        textAlign: 'center',
        fontSize: 20
    },
    imageLogo: {
        width: 50,
        height: 50
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
        textAlign: 'center',
        fontSize: 25,
        fontWeight: 'bold',
        fontFamily: 'alternate-gothic-no3-d-regular'
    },
    subHeading: {
        textAlign: 'center',
        fontSize: 28,
        fontWeight: 'bold',
        fontFamily: 'alternate-gothic-no3-d-regular'
    },
    paragraph: {
        fontSize: 16,
        fontFamily: 'source-sans-pro-regular'
    },
    buttonContainer: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    button: {
        backgroundColor: '#EA4B6C',
        paddingVertical: 10,
        alignItems: 'center',
        flex: 0.6
    },
    buttonText: {
        fontFamily: 'alternate-gothic-no3-d-regular',
        fontSize: 24,
        color: 'white'
    },
    buttonSpacer: {
        flex: 0.2
    },
    contactInfoRow: {
        flexDirection: 'row',
        marginVertical: 5
    },
    contactInfoRowImage: {
        width: 20,
        height: 20
    },
    contactInfoRowSpacer: {
        marginRight: 15
    },
    eventsAccordianContainer: {
        flexDirection:'column',
        justifyContent:'flex-start'
    },
    eventsHeaderContainer: {
        flexDirection: 'row',
        justifyContent:'flex-start',
        marginVertical: 10
    },
    eventsHeaderIcon: {
        width:20,
        height: 20
    }
})
