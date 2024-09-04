

export const getLastDayOfMonth = (year, month) => {
    return new Date(year, month + 1, 0).getDate();
}

export const getTimeStamp = (year = 0, month = 0, day = 0) => {
    return new Date(year, month, day).getTime();
}

export const getItemModel = (year = 0, month = 0, day = 0, extra = {}) => {
    const timeValue = getTimeStamp(year, month, day);
    const monthStr = month + 1 < 10 ? `0${month + 1}` : month + 1;
    const dayStr = day < 10 ? `0${day}` : day
    const formatValue = `${year}-${monthStr}-${dayStr}`;
    return { label: day, value: timeValue, isPre: false, isCur: false, isNext: false, formatValue, ...extra };
}

export const getDays = (now = new Date()) => {

    // 获取当前月的时间列表
    let year = now.getFullYear();
    const month = now.getMonth();
    const days = getLastDayOfMonth(year, month);
    let preYear = year;
    let preMonth = month - 1;

    if (preMonth < 0) {
        preMonth = 11;
        preYear = year - 1;
    }

    let nextYear = year;
    let nextMonth = month + 1;

    if (nextMonth > 11) {
        nextMonth = 0;
        nextYear = year + 1;
    }

    // 获取当前月第一天的星期
    const firstDay = new Date(year, month, 1).getDay();
    // 获取上个月最后一天
    const preMonthDay = getLastDayOfMonth(preMonth, preMonth)
    // 获取当前月的天数列表
    const dayList = [];

    let preValue = preMonthDay
    for (let i = firstDay; i > 0; i--) {
        dayList.unshift(getItemModel(preYear, preMonth, preValue, { isPre: true }));
        preValue--;
    }

    for (let i = 1; i <= days; i++) {
        dayList.push(getItemModel(year, month, i, { isCur: true }));
    }

    const diffNextDay = 42 - dayList.length
    for (let i = 1; i <= diffNextDay; i++) {
        dayList.push(getItemModel(nextYear, nextMonth, i, { isNext: true }));
    }


    return dayList;

}


// 判断是否是日期对象
export const isDate = (date) => {
    return Object.prototype.toString.call(date) === '[object Date]';
}


export const getLayoutDays = (now = new Date(), setDisabledValueCall = () => false) => {

    if (!isDate(now)) {
        console.error('输入不是日期对象')
        return []
    }


    const dayList = getDays(now)

    dayList.forEach((item, index) => {
        item.disabled = setDisabledValueCall(item)
    })

    const matrixDays = []
    let row = []
    dayList.forEach((fi = 0, index = 0) => {
        let curIndex = index + 1
        row.push(fi)
        if (curIndex % 7 === 0) {
            matrixDays.push(row)
            row = []
        }
    })
    return matrixDays

}


export const getCurrentYearMonth = (now = new Date()) => {
    const year = now.getFullYear()
    const month = now.getMonth() + 1
    return { year, month }
}



export const formatDate = (date = '', format = 'YYYY-MM-DD') => {

    if (!date) {
        return ''
    }


    let dateObject = date

    if (!isDate(date)) {
        dateObject = new Date(date)
    }

    const year = dateObject.getFullYear()
    const month = dateObject.getMonth() + 1
    const day = dateObject.getDate()
    const hours = dateObject.getHours()
    const minutes = dateObject.getMinutes()
    const seconds = dateObject.getSeconds()


    const monthStr = month < 10 ? `0${month}` : month
    const dayStr = day < 10 ? `0${day}` : day

    const formatValue = format.replace('YYYY', year)
        .replace('MM', monthStr)
        .replace('DD', dayStr)
        .replace('HH', hours)
        .replace('mm', minutes)
        .replace('ss', seconds)


    return formatValue


}

export const getYears = (start = 1900, end = new Date().getFullYear() + 100) => {
    const years = []
    for (let i = start; i <= end; i++) {
        years.push(i)
    }
    return years
}
