import { ClientSecrets } from '../../../config/config'
import ApiUtils from '../../utils/ApiUtils'

async function getBearerToken() {
    try {
        let base64 = require('base-64');
        username = ClientSecrets.API_USERNAME;
        password = ClientSecrets.API_PASSWORD;
        basicAuthHeaderValue = 'Basic ' + base64.encode(username + ":" + password);
        let requestAuthTokenBody = {
            'grant_type': 'client_credentials',
            'scope': 'contacts finances events event_registrations_view'
        };
        let response = await fetch('https://oauth.wildapricot.org/auth/token',
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'Authorization': basicAuthHeaderValue
                },
                body: ApiUtils.constructFormUrlEncodedBody(requestAuthTokenBody)
            });
        let responseJson = await response.json();
        return responseJson['access_token']
    } catch(error) {
        console.error(error);
        return null
    }
}

async function getResultURL(bearerToken) {
    try {
        let getUrl = 'https://api.wildapricot.org/v2/Accounts/' + ClientSecrets.ACCOUNT_NUM + '/Contacts';
        let response = await fetch(getUrl,
            {
                method: 'GET',
                headers: {
                    'Authorization': 'Bearer ' + bearerToken
                }
            });

        if(response.status !== 200) {
            console.log(response.status);
            return null
        }
        return response.json();

    } catch(error) {
        console.error(error);
        return null
    }
}

async function getContactsList(bearerToken, resultURL) {
    try {
        let response = await fetch(resultURL,
            {
                method: 'GET',
                headers: {
                    'Authorization': 'Bearer ' + bearerToken
                }
            });

        if(response.status !== 200) {
            console.log(response.status);
            return null
        }
        return response.json();

    } catch(error) {
        console.error(error);
        return null
    }
}

async function getIndividualContactsList(){
    let bearerToken = await getBearerToken();
    if(!bearerToken) {
        console.log("Failed to get bearer token");
        this.setState({isEventListLoading: false});
        return
    }
    let resultURLObject = await getResultURL(bearerToken);
    let resultURLString = resultURLObject["ResultUrl"];
    let contactsList = await getContactsList(bearerToken, resultURLString);
    return contactsList["Contacts"];
}

async function getEventRegistrationList(bearerToken, contactId){
    try {
        let getUrl = 'https://api.wildapricot.org/v2/Accounts/' + ClientSecrets.ACCOUNT_NUM +
            '/EventRegistrations?contactId=' + contactId.toString();
        let response = await fetch(getUrl,
            {
                method: 'GET',
                headers: {
                    'Authorization': 'Bearer ' + bearerToken
                }
            });

        if(response.status !== 200) {
            console.log("Failed to get registration list");
            return null
        }
        return response.json();

    } catch(error) {
        console.error(error);
        return null
    }
}

async function getContactEventRegistrationList(contactId){
    let bearerToken = await getBearerToken();
    if(!bearerToken) {
        console.log("Failed to get bearer token");
        this.setState({isEventListLoading: false});
        return
    }
    let eventRegistrationList = await getEventRegistrationList(bearerToken, contactId);
    return eventRegistrationList;
}

export {getBearerToken, getResultURL, getContactsList, getIndividualContactsList, getContactEventRegistrationList};