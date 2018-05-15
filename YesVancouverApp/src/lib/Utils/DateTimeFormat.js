var monthsAbbrevUpperCase = [
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
]

var monthsMixedCaseAbbrev = [
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
]

// https://stackoverflow.com/questions/8888491/how-do-you-display-javascript-datetime-in-12-hour-am-pm-format
function formatAMPM(date) {
    var hours = date.getHours()
    var minutes = date.getMinutes()
    var ampm = hours >= 12 ? 'PM' : 'AM'
    hours = hours % 12
    hours = hours ? hours : 12 // the hour '0' should be '12'
    minutes = minutes < 10 ? '0'+minutes : minutes
    var strTime = hours + ':' + minutes + ' ' + ampm
    return strTime
}

function formatDateTime(startDate, endDate) {
    let formattedDateTime = ''
    if(startDate.toLocaleDateString() == endDate.toLocaleDateString()){
        formattedDateTime = monthsMixedCaseAbbrev[startDate.getMonth()] + ' ' + startDate.getDate() + ', '
        formattedDateTime += formatAMPM(startDate) + ' — ' + formatAMPM(endDate)
    }
    else {
        formattedDateTime = monthsMixedCaseAbbrev[startDate.getMonth()] + ' ' + startDate.getDate() + ', '
        formattedDateTime += formatAMPM(startDate) 
        formattedDateTime += ' — \n'
        formattedDateTime += monthsMixedCaseAbbrev[endDate.getMonth()] + ' ' + endDate.getDate() + ', '
        formattedDateTime += formatAMPM(endDate)
    }
    return formattedDateTime
}

export { monthsAbbrevUpperCase, formatAMPM, formatDateTime }
