import { getEventsList } from '../../apicalls/Events/EventsList'
import { DateTimeUtil } from '../Utils/DateTimeUtil'


class EventEntry {
    constructor(id, name, month, date, time, location) {
        this.id = id
        this.title = name
        this.month = month
        this.date = date
        this.time = time
        this.location = location
    }
}

class EventsListObj {
    constructor() {
        this.datasource = null
    }

    // Default datasource to be displayed when events list cannot be fetched
    getDatasourceFailed() {
        return (
            [
                {
                    key: 'Upcoming',
                    data: [ new EventEntry(null, 'Failed to retrieve events', '', null, '', '') ]
                },
                {   
                    key: 'Past Events',
                    data: [ new EventEntry(null, 'Failed to retrieve events', '', null, '', '') ]
                }
            ]
        )
    }

    async getDataSource() {
        eventsListResponse = await getEventsList()

        let eventsList = null
        try {
            eventsList = eventsListResponse.Events
        } catch (error) {
            console.log("Failed to get events property")
            return null
        }
            
        let upcomingEvents = []
        let pastEvents = []
        let currentDateInMs = Date.now()
    
        for (i = 0; i < eventsList.length; i++) { 
            if(eventsList[i].AccessLevel != "Public") {
                continue
            }
    
            let startDate = new Date(Date.parse(eventsList[i].StartDate))
            let endDate = new Date(Date.parse(eventsList[i].EndDate))
            let eventTime = null
    
            // If multi-day event, just display startDate's month, day and time
            if(startDate.toLocaleDateString() != endDate.toLocaleDateString()) {
                eventTime = DateTimeUtil.formatAMPM(startDate)
            }
            else {
                // If start time and end time same, just display one
                if(startDate.toLocaleTimeString() == endDate.toLocaleTimeString()) {
                    eventTime = DateTimeUtil.formatAMPM(startDate)
                }
                else {
                    eventTime = DateTimeUtil.formatAMPM(startDate) + ' - ' + DateTimeUtil.formatAMPM(endDate)
                }
            }
    
            var entry = new EventEntry (
                eventsList[i].Id,
                eventsList[i].Name,
                DateTimeUtil.monthsAbbrevUpperCase()[startDate.getMonth()],
                startDate.getDate(),
                eventTime,
                eventsList[i].Location
            )
    
            console.log(entry)
            if(startDate.getTime() < currentDateInMs) {
                pastEvents.push(entry)
            }
            else {
                upcomingEvents.push(entry)
            }
        }
    
        if(upcomingEvents.length == 0) {
            upcomingEvents.push(new EventEntry(null, 'No upcoming events', '', null, '', ''))
        }
    
        if(pastEvents.length == 0) {
            pastEvents.push(new EventEntry(null, 'No past events', '', null, '', ''))
        }
    
        datasource = [
            {
                key: 'Upcoming',
                data: upcomingEvents
            },
            {   
                key: 'Past Events',
                data: pastEvents
            }
        ]
        return datasource
    }    
}

export { EventsListObj }
