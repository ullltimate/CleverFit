import { DataForPieDiagram, DataForPlot } from './achievements-week-healper';

export const splitMonthIntoWeeks = (monthLoad: DataForPlot[], dayInWeek: number) => {
    const copyMonthLoad = [...monthLoad]
    const data = [];

    while (copyMonthLoad.length){
        data.push(copyMonthLoad.splice(0,dayInWeek))
    }

    return(data)
}

export const getMaxExerc = (dataList: DataForPieDiagram[], dayOfWeek: string) => {
    const data = dataList.filter(day => day.date === dayOfWeek);
    const maxValue = Math.max.apply(null, data.map(e => e.count ? e.count : 0));
    const maxData = data.filter(day => day.count === maxValue);

    return maxData[0] || []
}

export const createDataForListMonthExerc = (dataList: DataForPieDiagram[]) => {
    const daysOfWeek = ['Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота', 'Воскресенье'];
    
    return daysOfWeek.map(day => getMaxExerc(dataList, day)).flat();
}

