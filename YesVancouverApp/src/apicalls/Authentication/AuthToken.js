import { ClientSecrets } from '../../../config/config'
import ApiUtils from '../../utils/ApiUtils'

/**
 * Retrieves the general API authentication token
 *
 * @returns the Bearer access token if authentication is successful,
 *          otherwise returns null
 */
export async function getBearerToken() {
    try {
        let base64 = require('base-64');
        let api_username = ClientSecrets.API_USERNAME;
        let api_password = ClientSecrets.API_PASSWORD;
        let basicAuthHeaderValue = 'Basic ' + base64.encode(api_username + ":" + api_password);
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
        return responseJson['access_token'];
    } catch(error) {
        console.error(error);
        return null;
    }
}


/**
 * Takes in the users entered email address and password on the login screen
 * and checks for authentication in the members database
 *
 * @param username: The users entered email address
 * @param password: The users entered password
 * @returns the Bearer access token for the user if authentication is successful,
 *          otherwise return null
 */

export async function authenticateContactLogin(username, password){
    try {
        let base64 = require('base-64');
        let client_id = ClientSecrets.CLIENT_ID;
        let client_secret = ClientSecrets.CLIENT_SECRET;
        let basicAuthHeaderValue = 'Basic ' + base64.encode(client_id + ":" + client_secret);
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
        if (response.status !== 200) {
            return null;
        }
        let responseJson = await response.json();
        return responseJson['access_token'];
    } catch (error) {
        console.error(error);
        return null;
    }
}
