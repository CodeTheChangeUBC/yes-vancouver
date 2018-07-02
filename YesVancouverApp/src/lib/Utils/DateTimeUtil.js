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

    // https://stackoverflow.com/questions/8888491/how-do-you-display-javascript-datetime-in-12-hour-am-pm-format
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
}

export { DateTimeUtil }
