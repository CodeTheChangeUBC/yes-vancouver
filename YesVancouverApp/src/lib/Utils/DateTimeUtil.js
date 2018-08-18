class DateTimeUtil {
    constructor(){}

    static monthsAbbrevUpperCase(){
        return ([
            "JAN",
            "FEB",
            "MAR",
            "APR",
            "MAY",
            "JUN",
            "JUL",
            "AUG",
            "SEP",
            "OCT",
            "NOV",
            "DEC"
        ])
    }
    
    static monthsAbbrevMixedCase(){
        return([
            "Jan.",
            "Feb.",
            "Mar.",
            "Apr.",
            "May",
            "June",
            "July",
            "Aug.",
            "Sep.",
            "Oct.",
            "Nov.",
            "Dec."
        ])
    }

    /**
     * https://stackoverflow.com/questions/8888491/how-do-you-display-javascript-datetime-in-12-hour-am-pm-format
     * Formats the time of a date object like the following:
     *  10:15 AM
     *  11:25 PM
     */
     static formatAMPM(date) {
        var hours = date.getHours()
        var minutes = date.getMinutes()
        var ampm = hours >= 12 ? 'PM' : 'AM'
        hours = hours % 12
        hours = hours ? hours : 12 // the hour '0' should be '12'
        minutes = minutes < 10 ? '0'+minutes : minutes
        var strTime = hours + ':' + minutes + ' ' + ampm
        return strTime
    }

    /**
     *  If start date is same as end date, example:
     *     Sep. 5, 10:30 AM - 12:30 PM
     *  If start date and end date are different, example:
     *     Sep. 5, 10:30 AM -
     *     Sep. 8, 10:30 PM
     */
    static formatDateTime(startDate, endDate) {
        let formattedDateTime = ''
        if(startDate.toLocaleDateString() == endDate.toLocaleDateString()){
            formattedDateTime = this.monthsAbbrevMixedCase()[startDate.getMonth()] + ' ' + startDate.getDate() + ', '
            formattedDateTime += this.formatAMPM(startDate) + ' — ' + this.formatAMPM(endDate)
        }
        else {
            formattedDateTime = this.monthsAbbrevMixedCase()[startDate.getMonth()] + ' ' + startDate.getDate() + ', '
            formattedDateTime += this.formatAMPM(startDate) 
            formattedDateTime += ' — \n'
            formattedDateTime += this.monthsAbbrevMixedCase()[endDate.getMonth()] + ' ' + endDate.getDate() + ', '
            formattedDateTime += this.formatAMPM(endDate)
        }
        return formattedDateTime
    }

    /**
     * Formats a Date object to string
     * 
     *  @param Date object
     *  @returns string formatted like Aug. 12, 2018
     */
    static formatDate(dateObj){
        try {
            return this.monthsAbbrevMixedCase()[dateObj.getMonth()]
                + " " + dateObj.getDate().toString()
                + ", " + dateObj.getFullYear().toString()
        }
        catch(err){
            return null
        }
    }
}

export { DateTimeUtil }
