import { ClientSecrets } from '../../config/config'
import ApiUtils from '../utils/ApiUtils'

export async function getBearerToken() {
    try {
        let base64 = require('base-64')
        username = ClientSecrets.API_USERNAME
        password = ClientSecrets.API_PASSWORD
        basicAuthHeaderValue = 'Basic ' + base64.encode(username + ":" + password)
        console.log(basicAuthHeaderValue)

        let requestAuthTokenBody = {
            'grant_type': 'client_credentials',
            'scope': 'contacts finances events'
        }

        let response = await fetch('https://oauth.wildapricot.org/auth/token', 
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Authorization': basicAuthHeaderValue
            },
            body: ApiUtils.constructFormUrlEncodedBody(requestAuthTokenBody)
        })
        let responseJson = await response.json()
        return responseJson['access_token']
    } catch(error) {
        console.error(error)
        return null
    }
}
