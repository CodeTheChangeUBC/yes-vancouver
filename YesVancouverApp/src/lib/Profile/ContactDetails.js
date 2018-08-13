class ContactDetailsObj {
    constructor(ContactDetailsJson) {
        let customContactFields = ContactDetailsObj.createCustomFieldDict(ContactDetailsJson)

        this.id = ContactDetailsJson["Id"]
        this.firstName = ContactDetailsJson["FirstName"]
        this.lastName = ContactDetailsJson["LastName"]
        this.email = ContactDetailsJson["Email"]
        this.phone = ContactDetailsJson["Phone"]
        this.memberSince = ContactDetailsJson["MemberSince"]
        this.membershipLevel = ContactDetailsJson["MembershipLevel"]
        this.renewalDue = ContactDetailsJson["RenewalDue"]

        this.company = ContactDetailsObj.getCustomField(customContactFields, "Company")
        this.otherInfo = ContactDetailsObj.getCustomField(customContactFields, "OtherInfo")
        this.facebook = ContactDetailsObj.getCustomField(customContactFields, "Facebook")
        this.twitter = ContactDetailsObj.getCustomField(customContactFields, "Twitter")
        this.instagram = ContactDetailsObj.getCustomField(customContactFields, "Instagram")
        this.linkedIn = ContactDetailsObj.getCustomField(customContactFields, "LinkedIn")
        this.profilePhoto = ContactDetailsObj.getCustomField(customContactFields, "ProfilePhoto")["Url"]

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
}

export { ContactDetailsObj }
