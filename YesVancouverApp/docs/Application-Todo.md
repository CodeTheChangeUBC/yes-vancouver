# Todo Items For Application

## Table of Contents
- [To do](#to-do)
- [Maintenance](#maintenance)
- [Suggestions](#suggestions)

## To do
- Events
    - Sort the events list by date.
    - Need some sort of refresh mechanism for the events list.
    - Display default banner image if banner image is not specified in event details.
    - Discussion Board - currently not implemented. May need separate database in order to do this.
    - When user clicks on the register button, they are navigated to the event registration webpage on Wild Apricot. On this page, they need to login again. Investigate if there is a way make the user already signed in.
    - Share icons currently just put the event registration link on clipboard. Investigate trying to share event details to Twitter, Facebook, and Email.

- Perks
    - Currently list of sponsors are static. Need to find way to store sponsors on Wild Apricot (or on separate database) and fetch them from there.
    - Need to implement functionality to sort the sponsor alphabetically and categorically and favorite them.
    - PerksDetails also static. Need to find way to store and fetch them from the server.

- Newsfeed
    - Currently just static images and text. Need to discuss with Yes Vancouver on what to display on this screen.

- Profile
    - Membership renewal.
    - Profile picture upload and change.
    - Password change - visual layout is there but the API calls to change the password are not. These API calls are similar to the ones made in EditProfile. Password needs to be validated.
    - Logout needs to be implemented.
    - Forgot Password needs to be implemented.
    - Sign up screens where user enters additional details about themselves (work, social media, photo) needs to make API calls to store that information in Wild Apricot.

- Push notifications
    - None are implemented currently.


## Maintenance
- Upgrade Expo SDK in the app once in a while. The Client app updates once in a while and drops support for old SDKs. So need to update Expo SDK in project to continue development of the app.
- Refactor activity loading screen, and custom buttons into their own components (custom button is used since the default React Button component looks different on iOS and Android)

## Suggestions
- [Redux](#https://redux.js.org/) - helps manage state.
- Separate database - may be needed for storing sponsors and sponsor offers. Try looking into [Firebase](https://firebase.google.com/).
- Refresh mechanism for the bearer token - Currently a new authentication token is requested for every API call. This token is valid for a certain amount of time and can be re-used. To improve performance, try caching this token to avoid the extra API call and only requesting a new token when the old token has expired.
- Write test cases - Currently there are no tests, perhaps look into [Jest](https://jestjs.io/).
