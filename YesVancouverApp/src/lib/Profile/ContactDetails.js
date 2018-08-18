import { getBearerToken } from "../../apicalls/Authentication/AuthToken"
import { getEventRegistrationList } from "../../apicalls/Profile/ProfileDetails"
import { DateTimeUtil } from "../../lib/Utils/DateTimeUtil"


class ContactDetailsObj {
    constructor(ContactDetailsJson, ContactPassword) {
        let customContactFields = ContactDetailsObj.createCustomFieldDict(ContactDetailsJson)

        this.id = ContactDetailsJson["Id"]
        this.firstName = ContactDetailsJson["FirstName"]
        this.lastName = ContactDetailsJson["LastName"]
        this.email = ContactDetailsJson["Email"]
        this.phone = ContactDetailsJson["Phone"]
        this.password = ContactPassword

        this.membershipLevel = ContactDetailsObj.getMembershipLevel(ContactDetailsJson)
        this.memberSince = ContactDetailsObj.getDate(ContactDetailsJson["MemberSince"]) 
        this.memberStatus = ContactDetailsJson["Status"]
        this.renewalDue = ContactDetailsObj.getDate(ContactDetailsJson["RenewalDue"])

        this.company = ContactDetailsObj.getCustomField(customContactFields, "Company")
        this.jobTitle = ContactDetailsObj.getCustomField(customContactFields, "JobTitle")

        this.linkedIn = ContactDetailsObj.getCustomField(customContactFields, "LinkedIn")
        this.facebook = ContactDetailsObj.getCustomField(customContactFields, "Facebook")
        this.instagram = ContactDetailsObj.getCustomField(customContactFields, "Instagram")
        this.twitter = ContactDetailsObj.getCustomField(customContactFields, "Twitter")
        this.website = ContactDetailsObj.getCustomField(customContactFields, "Website")

        this.otherInfo = ContactDetailsObj.getCustomField(customContactFields, "OtherInfo")
        this.profilePhoto = ContactDetailsObj.getProfilePic(customContactFields)
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

    static getDate(dateString){
        try {
            let dateObj = new Date(Date.parse(dateString))
            return DateTimeUtil.formatDate(dateObj)
        }
        catch(err){
            return null
        }
    }

    /**
     * Returns the upcoming event registration data for a given contact
     * in a FlatList readable format
     */
    async getContactEventRegistrationList(){
        let bearerToken = await getBearerToken();
        if(!bearerToken) {
            console.log("Failed to get bearer token");
            this.setState({isEventListLoading: false});
            return null
        }
        let eventRegistrationList = await getEventRegistrationList(bearerToken, this.id);
        let upcomingEventsList = await this.getUpcomingEvents(eventRegistrationList);
        return upcomingEventsList;
    }

    /**
     * Parses the data for the registered events for a contact
     * into a FlatList readable format
     *
     * @param the registered events of a contact
     * @returns an object with the pastEvents property containing
     *      the past registered events and the upcomingEvents property
     *      containing the upcoming registered events
     */
    async getUpcomingEvents(registeredEventsList){
        let upcomingEventsList = [];
        let pastEventsList = [];
        let currentDate = Date.now();

        await registeredEventsList.forEach(function (value) {
            let startDateObj = new Date(Date.parse(value["Event"]["StartDate"]))
            let startDateStr = DateTimeUtil.formatDate(startDateObj)
            if(startDateObj.getTime() < currentDate) {
                pastEventsList.push({
                    key: value["Id"],
                    name: value["Event"]["Name"],
                    date: startDateStr
                })
            }
            else {
                upcomingEventsList.push({
                    key: value["Id"],
                    name: value["Event"]["Name"],
                    date: startDateStr
                });
            }
        });

        return {
            pastEvents: pastEventsList,
            upcomingEvents: upcomingEventsList
        };
    }
}


export { ContactDetailsObj }
