import { getBearerToken } from "../../apicalls/Authentication/AuthToken"
import { getEventRegistrationList, updateContactDetails } from "../../apicalls/Profile/ProfileDetails"
import { DateTimeUtil } from "../../lib/Utils/DateTimeUtil"


class ContactDetailsObj {
    constructor() {
        this.customContactFields = {}
        this.customContactFieldsSystemCode = {}

        this.id = ""
        this.firstName = ""
        this.lastName = ""
        this.email = ""
        this.phone = ""
        this.password = ""

        this.membershipLevel = ""
        this.memberSince = ""
        this.memberStatus = ""
        this.renewalDue = ""

        this.company = ""
        this.jobTitle = ""

        this.linkedIn = ""
        this.facebook = ""
        this.instagram = ""
        this.twitter = ""
        this.website = ""

        this.otherInfo = ""
        this.profilePhoto = ""
    }

    setCustomFields(ContactDetailsJson){
        let customFields = ContactDetailsObj.createCustomFieldDict(ContactDetailsJson)
        this.customContactFields = customFields.fieldValues
        this.customContactFieldsSystemCode = customFields.fieldSystemCodes

        this.id = ContactDetailsJson["Id"]
        this.firstName = ContactDetailsJson["FirstName"]
        this.lastName = ContactDetailsJson["LastName"]
        this.email = ContactDetailsJson["Email"]
        this.phone = ContactDetailsJson["Phone"]

        this.membershipLevel = ContactDetailsObj.getMembershipLevel(ContactDetailsJson)
        this.memberSince = ContactDetailsObj.getDate(ContactDetailsJson["MemberSince"]) 
        this.memberStatus = ContactDetailsJson["Status"]
        this.renewalDue = ContactDetailsObj.getDate(ContactDetailsJson["RenewalDue"])

        this.company = ContactDetailsObj.getCustomField(this.customContactFields, "Company")
        this.jobTitle = ContactDetailsObj.getCustomField(this.customContactFields, "JobTitle")

        this.linkedIn = ContactDetailsObj.getCustomField(this.customContactFields, "LinkedIn")
        this.facebook = ContactDetailsObj.getCustomField(this.customContactFields, "Facebook")
        this.instagram = ContactDetailsObj.getCustomField(this.customContactFields, "Instagram")
        this.twitter = ContactDetailsObj.getCustomField(this.customContactFields, "Twitter")
        this.website = ContactDetailsObj.getCustomField(this.customContactFields, "Website")

        this.otherInfo = ContactDetailsObj.getCustomField(this.customContactFields, "OtherInfo")
        this.profilePhoto = ContactDetailsObj.getProfilePic(this.customContactFields)
    }

    setPassword(ContactPassword){
        this.password = ContactPassword
    }

    clone(){
        let newContactDetailsObj = new ContactDetailsObj()

        newContactDetailsObj.customContactFields = this.customContactFields
        newContactDetailsObj.customContactFieldsSystemCode = this.customContactFieldsSystemCode

        newContactDetailsObj.id = this.id
        newContactDetailsObj.firstName = this.firstName
        newContactDetailsObj.lastName = this.lastName
        newContactDetailsObj.email = this.email
        newContactDetailsObj.phone = this.phone

        newContactDetailsObj.membershipLevel = this.membershipLevel
        newContactDetailsObj.memberSince = this.memberSince
        newContactDetailsObj.memberStatus = this.memberStatus
        newContactDetailsObj.renewalDue = this.renewalDue

        newContactDetailsObj.company = this.company
        newContactDetailsObj.jobTitle = this.jobTitle

        newContactDetailsObj.linkedIn = this.linkedIn
        newContactDetailsObj.facebook = this.facebook
        newContactDetailsObj.instagram = this.instagram
        newContactDetailsObj.twitter = this.twitter
        newContactDetailsObj.website = this.website

        newContactDetailsObj.otherInfo = this.otherInfo
        newContactDetailsObj.profilePhoto = this.profilePhoto

        return newContactDetailsObj
    }

    static createCustomFieldDict(ContactDetailsJson){
        let customFieldValueDict = {}
        let customFieldSystemCodeDict = {}
        ContactDetailsJson["FieldValues"].forEach(function (miniObject) {
            customFieldValueDict[miniObject["FieldName"].toString()] = miniObject["Value"]
            customFieldSystemCodeDict[miniObject["FieldName"].toString()] = miniObject["SystemCode"]
        });
        return {
            fieldValues: customFieldValueDict, 
            fieldSystemCodes: customFieldSystemCodeDict
        }
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
                    key: value["Id"].toString(),
                    name: value["Event"]["Name"],
                    date: startDateStr
                })
            }
            else {
                upcomingEventsList.push({
                    key: value["Id"].toString(),
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

    /**
     * Update contact details
     * 
     * @returns The update contact details in JSON format if successful,
     *          otherwise returns null
     */
    async updateContactDetails(){
        let bearerToken = await getBearerToken();
        if(!bearerToken) {
            console.log("Failed to get bearer token")
            return null
        }

        let updateResult = await updateContactDetails(bearerToken, this)
        return updateResult
    }
}


export { ContactDetailsObj }
