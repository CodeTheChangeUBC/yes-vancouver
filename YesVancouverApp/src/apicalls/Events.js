import ApiUtils from '../utils/ApiUtils'
import { ClientSecrets } from '../../config/config'
import { getBearerToken } from './AuthToken'

export async function getEventDetails(bearerToken, eventId) {
    try {
        bearerToken = await getBearerToken()
        if(!bearerToken) {
            console.error("Failed to get bearer token")
            return
        }

        let requestAuthTokenBody = {
            'grant_type': 'client_credentials',
            'scope': 'contacts finances events'
        }
        
        let getUrl = 'https://api.wildapricot.org/v2/Accounts/' + ClientSecrets.ACCOUNT_NUM + '/Events/' + eventId
        let response = await fetch(getUrl, 
        {
            method: 'GET',
            headers: {
                'Authorization': 'Bearer ' + bearerToken
            }
        })
        
        if(response.status != 200) {
            console.log(response.status)
            return null
        }
        return response.json()

    } catch(error) {
        console.error(error)
        return null
    }
}
