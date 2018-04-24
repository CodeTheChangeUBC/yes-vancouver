import { ClientSecrets } from '../../../config/config'
import ApiUtils from '../../utils/ApiUtils'

/*
async function authenticateContactLogin(username, password){
    try {
        let base64 = require('base-64');
        basicAuthHeaderValue = 'Basic ' + base64.encode(username + ":" + password);
        let requestAuthTokenBody = {
            'grant_type': 'password',
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
        return responseJson;
        //return responseJson['access_token']
    } catch(error) {
        console.error(error);
        return null
    }
}
*/

/**
 * Retrieves an authentication token based on the API details that are listed in the
 * config.js file
 *
 * @returns {Promise.<*>}
 */
async function getBearerToken() {
    try {
        let base64 = require('base-64');
        let username = ClientSecrets.API_USERNAME;
        let password = ClientSecrets.API_PASSWORD;
        let basicAuthHeaderValue = 'Basic ' + base64.encode(username + ":" + password);
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

// Contacts Data Retrieval
// ------------------------------------------------------------------------------

/**
 * Retrieves data for all contacts stored in the contact database for
 * the current email address provided
 *
 * @param userEmail: The email address to search for
 * @returns {Promise.<*>}
 */

async function getIndividualContactsList(userEmail){
    let bearerToken = await getBearerToken();
    if(!bearerToken) {
        console.log("Failed to get bearer token");
        this.setState({isEventListLoading: false});
        return
    }
    let resultURLObject = await getResultURL(bearerToken, userEmail);
    let resultURLString = resultURLObject["ResultUrl"];
    let contactsList = await getContactsList(bearerToken, resultURLString);
    return contactsList["Contacts"];
}

/**
 * Retrieves the Result URL for contacts access for the current account number
 * This will be used to further query data from the contacts table
 *
 * @param bearerToken: The authentication token
 * @returns {Promise.<*>}
 */
async function getResultURL(bearerToken, userEmail) {
    try {
        //let getUrl = 'https://api.wildapricot.org/v2/Accounts/' + ClientSecrets.ACCOUNT_NUM + '/Contacts';
        let getUrl = 'https://api.wildapricot.org/v2/Accounts/' + ClientSecrets.ACCOUNT_NUM +
            '/Contacts?$filter=Email eq ' + userEmail;
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

/**
 *
 * @param bearerToken: The authentication token
 * @param resultURL: The Result URL for accessing data from the contacts table
 * @returns {Promise.<*>}
 */
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

/**
 *
 * Updates new contact details for a given contact ID given a bearer
 * token
 *
 * @param contactId
 * @param newContactDetails
 * @returns {Promise.<*>}
 */
async function updateContactDetails(contactId, newContactDetails){
    let bearerToken = await getBearerToken();
    try {
        let response = await fetch('https://api.wildapricot.org/v2/Accounts/' +
            ClientSecrets.ACCOUNT_NUM + '/Contacts/' + contactId.toString(),
            {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'Authorization': 'Bearer ' + bearerToken
                },
                body: ApiUtils.constructFormUrlEncodedBody(newContactDetails)
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

// Events Data Retrieval
// ------------------------------------------------------------------------------

/**
 * Returns the upcoming event registration data for a given contact
 * in a FlatList readable format
 *
 * @param contactId
 * @returns {Promise.<*>}
 */
async function getContactEventRegistrationList(contactId){
    let bearerToken = await getBearerToken();
    if(!bearerToken) {
        console.log("Failed to get bearer token");
        this.setState({isEventListLoading: false});
        return
    }
    let eventRegistrationList = await getEventRegistrationList(bearerToken, contactId);
    let upcomingEventsList = await getUpcomingEvents(eventRegistrationList);
    return upcomingEventsList;
}

/**
 * Performs an API GET request to query the upcoming event registrations for
 * a given contact
 *
 * @param bearerToken: Authentication token
 * @param contactId
 * @returns {Promise.<*>}
 */
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

/**
 * Parses the data for the upcoming events for a contact
 * into a FlatList readable format
 *
 * @param upcomingEventsList
 * @returns {Promise.<Array>}
 */
async function getUpcomingEvents(upcomingEventsList){
    let upcomingEventsDictionaryList = [];
    await upcomingEventsList.forEach(function (value) {
        upcomingEventsDictionaryList.push(
            {key: value["Id"], // ["Event"]["Id"]
             name: value["Event"]["Name"],
             date: value["Event"]["StartDate"].substring(0, 10)}
        );
    });
    return upcomingEventsDictionaryList;
}

// ------------------------------------------------------------------------------

export {getBearerToken, getResultURL, getContactsList,
    getIndividualContactsList, getContactEventRegistrationList, getUpcomingEvents, updateContactDetails};