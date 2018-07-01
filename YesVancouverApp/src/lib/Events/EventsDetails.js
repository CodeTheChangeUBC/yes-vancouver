import { parseString } from 'react-native-xml2js'

import { ClientSecrets } from '../../../config/config'
import { getEventDetails } from '../../apicalls/Events/EventsDetails'
import { DateTimeUtil } from '../Utils/DateTimeUtil'


class EventDetailsObj {
    constructor(id) {
        this.id = id
        this.bannerImage = null
        this.title = null
        this.dateTime = null
        this.location = null
        this.descriptionHTML = null
        this.descriptionText = null
        this.speakers = []
        this.sponsors = []
        this.url = null
    }

    async processEventDetails() {
        let eventDetailsRawData = await getEventDetails(this.id)
        console.log(eventDetailsRawData)

        this.url = ClientSecrets.FQDN + '/event-' + eventDetailsRawData.Id
        this.title = eventDetailsRawData.Name
        this.location = eventDetailsRawData.Location

        let eventStartDateTime = new Date(Date.parse(eventDetailsRawData.StartDate))
        let eventEndDateTime = new Date(Date.parse(eventDetailsRawData.EndDate))
        this.dateTime = DateTimeUtil.formatDateTime(eventStartDateTime, eventEndDateTime)

        this.descriptionHTML = eventDetailsRawData.Details.DescriptionHtml

        let eventAdditionalDetails = this._getEventAdditionalDetails()
        if(eventAdditionalDetails){
            this.bannerImage = eventAdditionalDetails.additionaldetails.eventbannerimageurl[0]
            this.descriptionText = eventAdditionalDetails.additionaldetails.eventdetails
            this.speakers = this._getSpeakersList(eventAdditionalDetails)
            this.sponsors = eventAdditionalDetails.additionaldetails.sponsorimageurl
        }
        else {
            this.bannerImage = null
            this.descriptionText = null
            this.speakers = []
            this.sponsors = []
        }
    }

    /* 
     * Additional details (banner image, event description, speakers, sponsors)
     * specified in the comment at the end of the event DescriptionHtml
     */
    _getEventAdditionalDetails(){
        let openingCommentTag = "<!--"
        let closingCommentTag = '-->'

        let indexOfCommentStart =  this.descriptionHTML.lastIndexOf(openingCommentTag)
        if(indexOfCommentStart == -1) {
            console.log('No additional details recorded for this event')
            return null
        }
        let indexOfXmlStart = indexOfCommentStart + openingCommentTag.length

        let indexOfCommentEnd =  this.descriptionHTML.lastIndexOf(closingCommentTag)
        if(indexOfCommentEnd == -1) {
            console.log('No additional details recorded for this event')
            return null
        }

        let xmlString =  this.descriptionHTML.substring(indexOfXmlStart, indexOfCommentEnd).trim();

        let xmlDoc = null
        parseString(xmlString, {trim: true}, function (err, result) {
            if(!err){
                console.dir(result)
                xmlDoc = result
            }
        })
        return xmlDoc
    }

    _getSpeakersList(eventAdditionalDetails) {
        if(!eventAdditionalDetails.additionaldetails) {
            console.log('No additional details found for event')
            return null
        }
        
        if(!eventAdditionalDetails.additionaldetails.speaker) {
            console.log('No speakers found in additional details of event')
            return null
        }
    
        let speakersResult = [] 
        let speakersList = eventAdditionalDetails.additionaldetails.speaker
        for(let i = 0; i < speakersList.length; i++) {
            let firstName = speakersList[i].firstname
            let lastName = speakersList[i].lastname
            let title = speakersList[i].title
            let company = speakersList[i].company
            let role = speakersList[i].role
            let imageurl = speakersList[i].imageurl[0]
            speakersResult.push(new Speaker(firstName, lastName, title, company, role, imageurl))
        }
        return speakersResult
    }
}

class Speaker {
    constructor(firstName, lastName, title, company, role, imageurl) {
        this.firstName = firstName
        this.lastName = lastName
        this.title = title
        this.company = company
        this.role = role
        this.imageurl = imageurl
    }
}

export { EventDetailsObj }