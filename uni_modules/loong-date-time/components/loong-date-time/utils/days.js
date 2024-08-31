

export const getLastDayOfMonth = (year, month) => {
    return new Date(year, month + 1, 0).getDate();
}

export const getTimeStamp = (year = 0, month = 0, day = 0) => {
    return new Date(year, month, day).getTime();
}

export const getItemModel = (year = 0, month = 0, day = 0, extra = {}) => {
    const timeValue = getTimeStamp(year, month, day);
    const monthStr = month + 1 < 10 ? `0${month + 1}` : month + 1;
    const formatValue = `${year}-${monthStr}-${day}`;
    return { label: day, value: timeValue, disabled: false, isPre: true, formatValue, ...extra };
}

export const getDays = () => {

    // 获取当前月的时间列表
    const now = new Date();
    let year = now.getFullYear();
    const month = now.getMonth();
    const days = getLastDayOfMonth(year, month);
    let preYear = year;
    console.log('month', month);
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
        dayList.unshift(getItemModel(preYear, preMonth, preValue));
        preValue--;
    }

    for (let i = 1; i <= days; i++) {
        dayList.push(getItemModel(year, month, i));
    }

    const diffNextDay = 42 - dayList.length
    for (let i = 1; i <= diffNextDay; i++) {
        dayList.push(getItemModel(nextYear, nextMonth, i));
    }


    return dayList;

}


export const getLayoutDays = () => {
    const dayList = getDays()
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
