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
 *
 * Updates the contact details for a contact given its
 * new contact details
 *
 * @param Bearer Token (with 'contacts_edit' privileges)
 * @param newContactDetails object containing the contact's new info
 * @returns The updated contact details in JSON format if successful,
 *          otherwise returns null
 */
async function updateContactDetails(bearerToken, newContactDetails){
    try {
        let putUrl = 'https://api.wildapricot.org/v2/Accounts/' 
            + ClientSecrets.ACCOUNT_NUM
            + '/Contacts/' + newContactDetails.id.toString()

        let requestBody = {
            "Id" : newContactDetails.id,
            "FirstName": newContactDetails.firstName,
            "LastName": newContactDetails.lastName,
            "Email": newContactDetails.email,
            "FieldValues": [
                {
                    "FieldName": "Phone",
                    "Value": newContactDetails.phone,
                    "SystemCode": newContactDetails.customContactFieldsSystemCode["Phone"]
                },
                {
                    "FieldName": "Company",
                    "Value": newContactDetails.company,
                    "SystemCode": newContactDetails.customContactFieldsSystemCode["Company"]
                },
                {
                    "FieldName": "JobTitle",
                    "Value": newContactDetails.jobTitle,
                    "SystemCode": newContactDetails.customContactFieldsSystemCode["JobTitle"]
                },
                {
                    "FieldName": "Linkedin",
                    "Value": newContactDetails.linkedIn,
                    "SystemCode": newContactDetails.customContactFieldsSystemCode["LinkedIn"]
                },
                {
                    "FieldName": "Facebook",
                    "Value": newContactDetails.facebook,
                    "SystemCode": newContactDetails.customContactFieldsSystemCode["Facebook"]
                },
                {
                    "FieldName": "Instagram",
                    "Value": newContactDetails.instagram,
                    "SystemCode": newContactDetails.customContactFieldsSystemCode["Instagram"]
                },
                {
                    "FieldName": "Twitter",
                    "Value": newContactDetails.twitter,
                    "SystemCode": newContactDetails.customContactFieldsSystemCode["Twitter"]
                },
                {
                    "FieldName": "Website",
                    "Value": newContactDetails.website,
                    "SystemCode": newContactDetails.customContactFieldsSystemCode["Website"]
                },
                {
                    "FieldName": "OtherInfo",
                    "Value": newContactDetails.otherInfo,
                    "SystemCode": newContactDetails.customContactFieldsSystemCode["OtherInfo"]
                }
            ]
        }

        let response = await fetch(putUrl,
            {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + bearerToken
                },
                body: JSON.stringify(requestBody)
            }
        )
        
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


export { getCurrentContactDetails, updateContactDetails, getEventRegistrationList }
