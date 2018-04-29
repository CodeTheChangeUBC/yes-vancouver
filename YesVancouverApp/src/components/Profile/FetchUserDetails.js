import { ClientSecrets } from '../../../config/config'
import ApiUtils from '../../utils/ApiUtils'

/**
 * Takes in the users entered email address and password on the login screen
 * and checks for authentication in the members database
 *
 * @param username: The users entered email address
 * @param password: The users entered password
 * @returns {Promise.<*>}
 */
async function authenticateContactLogin(username, password){
    try {
        let base64 = require('base-64');
        let basicAuthHeaderValue = 'Basic ' +
            base64.encode(ClientSecrets.CLIENT_ID + ":" + ClientSecrets.CLIENT_SECRET);
        let requestAuthTokenBody = {
            'grant_type': 'password',
            'username': username,
            'password': password,
            'scope': 'auto'
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
        if (response.status !== 200){
            return null;
        }
        let responseJson = await response.json();
        return responseJson['access_token'];
    } catch(error) {
        console.error(error);
        return null
    }
}

/**
 * Retrieves an authentication token based on the API details that are listed in the
 * config.js file (NOT THE USER LOGIN TOKEN, AS IT'S SCOPE ISN'T AS WIDE AS THE GENERAL
 * API ONE)
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
 * Returns details for the currently logged in contact
 *
 * @param bearerToken: Token retrieved after contact authentication
 * @returns {Promise.<*>}
 */
async function retrieveCurrentContactDetails(bearerToken){
    try {
        let getUrl = "https://api.wildapricot.org/v2/Accounts/" + ClientSecrets.ACCOUNT_NUM +
            "/Contacts/me/";
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
 * Retrieves data for all contacts stored in the contact database for
 * the ID provided
 *
 * @param userID: The user ID to search for
 * @returns {Promise.<*>}
 */

async function getIndividualContactsList(userID){
    let bearerToken = await getBearerToken();
    if(!bearerToken) {
        console.log("Failed to get bearer token");
        this.setState({isEventListLoading: false});
        return
    }
    let resultURLObject = await getResultURL(bearerToken, userID);
    let resultURLString = resultURLObject["ResultUrl"];
    let contactsList = await getContactsList(bearerToken, resultURLString);
    return contactsList["Contacts"];
}

/**
 * Retrieves the Result URL for contacts access for the current account number
 * This will be used to further query data from the contacts table
 *
 * @param bearerToken: The authentication token
 * @param userId: The user ID for which to retrieve the Result URL for
 * @returns {Promise.<*>}
 */
async function getResultURL(bearerToken, userId) {
    try {
        let getUrl = 'https://api.wildapricot.org/v2.1/Accounts/' + ClientSecrets.ACCOUNT_NUM +
            '/Contacts?$filter=Id eq ' + userId;
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
 * Retrieves data from the contacts table for a specified contact
 * whose details will be composed in the resultURL. This returns
 * ALL details for the user, for display on the Profile Screen
 *
 * @param bearerToken: The authentication token
 * @param resultURL: The Result URL constructed for accessing data from the contacts table
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
 * Updates new contact details for a given contact ID given the ID and its
 * new contact details
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
            {key: value["Id"],
             name: value["Event"]["Name"],
             date: value["Event"]["StartDate"].substring(0, 10)}
        );
    });
    return upcomingEventsDictionaryList;
}

// ------------------------------------------------------------------------------

export {getBearerToken, getResultURL, getContactsList,
    getIndividualContactsList, getContactEventRegistrationList, getUpcomingEvents, updateContactDetails,
    authenticateContactLogin, retrieveCurrentContactDetails};