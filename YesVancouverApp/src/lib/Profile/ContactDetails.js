import { getBearerToken } from "../../apicalls/Authentication/AuthToken"
import { getEventRegistrationList } from "../../apicalls/Profile/ProfileDetails"


class ContactDetailsObj {
    constructor(ContactDetailsJson) {
        let customContactFields = ContactDetailsObj.createCustomFieldDict(ContactDetailsJson)

        this.id = ContactDetailsJson["Id"]
        this.firstName = ContactDetailsJson["FirstName"]
        this.lastName = ContactDetailsJson["LastName"]
        this.email = ContactDetailsJson["Email"]
        this.phone = ContactDetailsJson["Phone"]

        this.memberSince = ContactDetailsJson["MemberSince"]
        this.membershipLevel = ContactDetailsObj.getMembershipLevel(ContactDetailsJson)
        this.renewalDue = ContactDetailsJson["RenewalDue"]

        this.company = ContactDetailsObj.getCustomField(customContactFields, "Company")
        this.otherInfo = ContactDetailsObj.getCustomField(customContactFields, "OtherInfo")
        this.facebook = ContactDetailsObj.getCustomField(customContactFields, "Facebook")
        this.twitter = ContactDetailsObj.getCustomField(customContactFields, "Twitter")
        this.instagram = ContactDetailsObj.getCustomField(customContactFields, "Instagram")
        this.linkedIn = ContactDetailsObj.getCustomField(customContactFields, "LinkedIn")
        this.profilePhoto = ContactDetailsObj.getProfilePic(customContactFields)

        this.eventsList = []
    }

    static createCustomFieldDict(ContactDetailsJson){
        let profileDictionary = {};
        ContactDetailsJson["FieldValues"].forEach(function (miniObject) {
            profileDictionary[miniObject["FieldName"].toString()] = miniObject["Value"]
        });
        return profileDictionary;
    }
    
    static getCustomField(dictionary, key){
        if (dictionary[key] === undefined){
            return "No Value";
        }
        return dictionary[key];
    }

    static getMembershipLevel(ContactDetailsJson){
        if(ContactDetailsJson["MembershipLevel"])
            return ContactDetailsJson["MembershipLevel"]["Name"]
        return "No membership"
    }

    static getProfilePic(customContactFields){
        if(customContactFields["ProfilePhoto"])
            return customContactFields["ProfilePhoto"]["Url"]
        return "No profile pic"
    }

    /**
     * Returns the upcoming event registration data for a given contact
     * in a FlatList readable format
     *
     * @returns {Promise.<*>}
     */
    async getContactEventRegistrationList(){
        let bearerToken = await getBearerToken();
        if(!bearerToken) {
            console.log("Failed to get bearer token");
            this.setState({isEventListLoading: false});
            return
        }
        let eventRegistrationList = await getEventRegistrationList(bearerToken, this.id);
        let upcomingEventsList = await this.getUpcomingEvents(eventRegistrationList);
        return upcomingEventsList;
    }

    /**
     * Parses the data for the upcoming events for a contact
     * into a FlatList readable format
     *
     * @param upcomingEventsList
     * @returns {Promise.<Array>}
     */
    async getUpcomingEvents(upcomingEventsList){
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
}


export { ContactDetailsObj }
