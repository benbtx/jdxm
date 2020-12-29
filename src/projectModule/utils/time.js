/**
 * Created by liao on 2018/10/29.
 */

// 获取时间 yyyy-mm-dd
export function getDay (date) {
  var time = new Date(date)
  var strYear = time.getFullYear()
  var strMonth = time.getMonth() + 1
  var strDay = time.getDate()
  if (strMonth < 10) {
    strMonth = '0' + strMonth
  }
  if (strDay < 10) {
    strDay = '0' + strDay
  }
  var str = strYear + '-' + strMonth + '-' + strDay
  return str
}
// 获取时间 yyyy-mm-dd 00:00:00
export function getTime (date) {
  var time = new Date(date)
  var strYear = time.getFullYear()
  var strMonth = time.getMonth() + 1
  var strDay = time.getDate()
  var strHours = time.getHours()
  var strMinutes = time.getMinutes()
  var strSeconds = time.getSeconds()
  if (strMonth < 10) {
    strMonth = '0' + strMonth
  }
  if (strDay < 10) {
    strDay = '0' + strDay
  }
  if (strHours < 10) {
    strHours = '0' + strHours
  }
  if (strMinutes < 10) {
    strMinutes = '0' + strMinutes
  }
  if (strSeconds < 10) {
    strSeconds = '0' + strSeconds
  }
  var str =
        strYear +
        '-' +
        strMonth +
        '-' +
        strDay +
        ' ' +
        strHours +
        ':' +
        strMinutes +
        ':' +
        strSeconds
  return str
}
// 获取一天的时间
export function getYestoday (date) {
  var yesterday = new Date()
  yesterday.setTime(date.getTime() - 1000 * 60 * 60 * 24)
  return [new Date(yesterday), date]
}
// 获取一周的时间
export function getWeek (date) {
  var yesterday = new Date()
  yesterday.setTime(date.getTime() - 1000 * 60 * 60 * 24 * 7)
  return [new Date(yesterday), date]
}
// 获得上个月在昨天这一天的日期
export function getLastMonthYestdy (date) {
  var daysInMonth = [[0],
    [31],
    [28],
    [31],
    [30],
    [31],
    [30],
    [31],
    [31],
    [30],
    [31],
    [30],
    [31]]

  var strYear = date.getFullYear()
  var strDay = date.getDate()
  var strMonth = date.getMonth() + 1
  if (strYear % 4 === 0 && strYear % 100 !== 0) {
    daysInMonth[2] = 29
  }
  if (strMonth - 1 === 0) {
    strYear -= 1
    strMonth = 12
  } else {
    strMonth -= 1
  }
  strDay = daysInMonth[strMonth] >= strDay ? strDay : daysInMonth[strMonth]
  if (strMonth < 10) {
    strMonth = '0' + strMonth
  }
  if (strDay < 10) {
    strDay = '0' + strDay
  }
  var datastr =
        strYear +
        '-' +
        strMonth +
        '-' +
        strDay +
        ' ' +
        date.getHours() +
        ':' +
        date.getMinutes() +
        ':' +
        date.getSeconds()
  return [new Date(datastr), date]
}
// 获得三月前在昨天这一天的日期
export function getLastThreeMonthYestdy (date) {
  var daysInMonth = [
    [0],
    [31],
    [28],
    [31],
    [30],
    [31],
    [30],
    [31],
    [31],
    [30],
    [31],
    [30],
    [31]
  ]
  var strYear = date.getFullYear()
  var strDay = date.getDate()
  var strMonth = date.getMonth() + 1
  if (strYear % 4 === 0 && strYear % 100 !== 0) {
    daysInMonth[2] = 29
  }
  if (strMonth - 3 === 0) {
    strYear -= 3
    strMonth = 12
  } else {
    strMonth -= 3
  }
  strDay = daysInMonth[strMonth] >= strDay ? strDay : daysInMonth[strMonth]
  if (strMonth < 10) {
    strMonth = '0' + strMonth
  }
  if (strDay < 10) {
    strDay = '0' + strDay
  }
  var datastr =
        strYear +
        '-' +
        strMonth +
        '-' +
        strDay +
        ' ' +
        date.getHours() +
        ':' +
        date.getMinutes() +
        ':' +
        date.getSeconds()
  return [new Date(datastr), date]
}

// 获得三月前在昨天这一天的日期
export function getLastSixMonthYestdy (date) {
  var daysInMonth = [
    [0],
    [31],
    [28],
    [31],
    [30],
    [31],
    [30],
    [31],
    [31],
    [30],
    [31],
    [30],
    [31]
  ]
  var strYear = date.getFullYear()
  var strDay = date.getDate()
  var strMonth = date.getMonth() + 1
  if (strYear % 4 === 0 && strYear % 100 !== 0) {
    daysInMonth[2] = 29
  }
  if (strMonth - 6 === 0) {
    strYear -= 6
    strMonth = 12
  } else {
    strMonth -= 6
  }
  strDay = daysInMonth[strMonth] >= strDay ? strDay : daysInMonth[strMonth]
  if (strMonth < 10) {
    strMonth = '0' + strMonth
  }
  if (strDay < 10) {
    strDay = '0' + strDay
  }
  var datastr =
        strYear +
        '-' +
        strMonth +
        '-' +
        strDay +
        ' ' +
        date.getHours() +
        ':' +
        date.getMinutes() +
        ':' +
        date.getSeconds()
  return [date, new Date(datastr)]
}

// 获得上一年在昨天这一天的日期
export function getLastYearYestdy (date) {
  var strYear = date.getFullYear() - 1
  var strDay = date.getDate()
  var strMonth = date.getMonth() + 1
  if (strMonth < 10) {
    strMonth = '0' + strMonth
  }
  if (strDay < 10) {
    strDay = '0' + strDay
  }
  var datastr =
        strYear +
        '-' +
        strMonth +
        '-' +
        strDay +
        ' ' +
        date.getHours() +
        ':' +
        date.getMinutes() +
        ':' +
        date.getSeconds()
  return [new Date(datastr), date]
}

export function getDayOfWeek (date) {
  // getDay() 返回表示星期的某一天
  var _date = new Date(date)
  var num = _date.getDay(_date)
  var week
  switch (num) {
    case 0:
      week = '周日'
      break
    case 1:
      week = '周一'
      break
    case 2:
      week = '周二'
      break
    case 3:
      week = '周三'
      break
    case 4:
      week = '周四'
      break
    case 5:
      week = '周五'
      break
    case 6:
      week = '周六'
      break
    default:
      break
  }
  return week
}
