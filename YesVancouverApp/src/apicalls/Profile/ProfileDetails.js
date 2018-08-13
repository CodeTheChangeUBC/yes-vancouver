import { ClientSecrets } from '../../../config/config'


/**
 * Returns details for the currently logged in contact
 *
 * @param Bearer Token retrieved after contact authentication
 * @returns Contact's details if successful, otherwise return null
 */
async function getCurrentContactDetails(bearerToken){
    try {
        let getUrl = "https://api.wildapricot.org/publicview/v1/accounts/" + ClientSecrets.ACCOUNT_NUM + "/contacts/me?includeDetails=true";

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
 * Gets the upcoming event registrations for a given contact
 *
 * @param Bearer Token
 * @param contactId
 * @returns the upcoming event registrations for a contact if successful,
 *          otherwise returns null
 */
async function getEventRegistrationList(bearerToken, contactId){
    try {
        let getUrl = 'https://api.wildapricot.org/v2/Accounts/'
                    + ClientSecrets.ACCOUNT_NUM
                    + '/EventRegistrations?contactId='
                    + contactId.toString();

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


export { getCurrentContactDetails, getEventRegistrationList }
