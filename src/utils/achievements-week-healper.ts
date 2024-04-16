import { formatDayOfWeek, invalideFormatDate } from '@constants/calendar';
import { Training } from '@services/trainings';
import moment, { Moment } from 'moment';

export type DataForPlot = {
	date: string,
	load?: number
}

export type DataForPieDiagram = {
    date: string,
    type?: string,
    count?: number,
}

export const getTrainingForPeriod = (trainings: Training[], startDate: Moment, endDate: Moment) =>
    trainings?.filter(
        (e) =>
            moment(e.date).isSameOrBefore(endDate, 'day') &&
            moment(e.date).isSameOrAfter(startDate, 'day'),
    );

export const filteredTrainings = (trainings: Training[], filter: string) => {
    if (filter !== 'Все' && trainings) {
        return trainings.filter((e) => e.name === filter);
    }

    return trainings;
};

export const filteredTrainingsForDay = (day: string, trainings: Training[]) =>
    trainings.filter((e) => moment(e.date).format(invalideFormatDate) === day);

export const generalLoadForPeriod = (trainings: Training[]) => {
    const allExercicesForDay = trainings.map((e) => e.exercises).flat();
    let totalLoad = 0;

    if (trainings.length) {
        totalLoad = allExercicesForDay.reduce(
            (acc, curr) => acc + (curr.approaches || 0) * (curr.weight || 0) * (curr.replays || 0),
            0,
        );
    }

    return totalLoad
}

export const averageLoad = (trainings: Training[]) => {
    const allExercicesForDay = trainings.map((e) => e.exercises).flat();
    let totalLoad = 0;
    let averLoad = 0;

    if (trainings.length) {
        totalLoad = allExercicesForDay.reduce(
            (acc, curr) => acc + (curr.approaches || 0) * (curr.weight || 0) * (curr.replays || 0),
            0,
        );
        averLoad = totalLoad / allExercicesForDay.length;
    }

    return Math.round(averLoad);
};

export const createDataForPlot = (startDate: Moment, endDate: Moment, trainings: Training[]) => {
    const data = [];

    while (startDate.isSameOrBefore(endDate, 'day')) {
        const date = startDate.format(invalideFormatDate);

        data.push({ date, load: averageLoad(filteredTrainingsForDay(date, trainings)) });

        startDate.add(1, 'day');
    }

    return data;
};

export const changeNameDayOfWeek = (name: string) => {
    let nameDay = name;

    switch(name){
        case 'Monday':
            nameDay = 'Понедельник';
            break;
        case 'Tuesday':
            nameDay = 'Вторник';
            break;
        case 'Wednesday':
            nameDay = 'Среда';
            break;
        case 'Thursday':
            nameDay = 'Четверг';
            break;
        case 'Friday':
            nameDay = 'Пятница';
            break;
        case 'Saturday':
            nameDay = 'Суббота';
            break;
        case 'Sunday':
            nameDay = 'Воскресенье';
            break;
    }

    return nameDay
}

export const createDataForList = (dataLoad?: DataForPlot[], dataExerc?: DataForPieDiagram[]) => {
    const daysOfWeek = ['Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота', 'Воскресенье'];
    const data = dataLoad || dataExerc;

    if(data){
        const dataForDayOfWeek = data.map(e => ({...e, date: changeNameDayOfWeek(moment(e.date).format(formatDayOfWeek))}));
        const sortedDataForDayOfWeek = [...dataForDayOfWeek].sort((a,b) => daysOfWeek.indexOf(a.date) - daysOfWeek.indexOf(b.date));
    
        return sortedDataForDayOfWeek;   
    }

    return []
}

export const getTotalReplays = (trainings: Training[]) => {
    const allExercicesForPeriod = trainings.map((e) => e.exercises).flat();
    let totalReplays = 0;

    if (trainings.length) {
        totalReplays = allExercicesForPeriod.reduce(
            (acc, curr) => acc + (curr.replays || 0),
            0,
        );
    }

    return totalReplays

}

export const getTotalApproaches = (trainings: Training[]) => {
    const allExercicesForPeriod = trainings.map((e) => e.exercises).flat();
    let totalReplays = 0;

    if (trainings.length) {
        totalReplays = allExercicesForPeriod.reduce(
            (acc, curr) => acc + (curr.approaches || 0),
            0,
        );
    }

    return totalReplays

}

export const getMostReapetedTrain = (trainings: Training[]) => {
    const namesTrain = trainings.map(e => e.name);
    const names: Record<string, number> = {};

    namesTrain.forEach((item) => {
      names[item] = (names[item] || 0) + 1;
    });

    const maxValue = Math.max(...Object.keys(names).map(key => names[key]));
    const maxName = Object.keys(names).find(key => names[key] === maxValue);

    return maxName;
}

export const getMostRepitedExercise = (trainings: Training[]) => {
    const allExercicesForDay = trainings.map(e => e.exercises).flat().map(e => e.name).flat();
    const names: Record<string, number> = {};
    let maxName = '';
    let maxValue = 0

    if(allExercicesForDay.length){
        allExercicesForDay.forEach((item) => {
          names[item] = (names[item] || 0) + 1;
        });
        maxValue = Math.max(...Object.keys(names).map(key => names[key]));
        maxName = Object.keys(names).find(key => names[key] === maxValue) || '';
    }
    
    return {type: maxName, count: maxValue}
}

export const createDataForPieDiagram = (startDate: Moment, endDate: Moment, trainings: Training[]) => {
    const data = [];
    
    while (startDate.isSameOrBefore(endDate, 'day')) {
        const date = startDate.format(invalideFormatDate);
        const mostRepietedExercise = getMostRepitedExercise(filteredTrainingsForDay(date, trainings))

        data.push({ date, type: mostRepietedExercise.type, count: mostRepietedExercise.count });

        startDate.add(1, 'day');
    }

    return data;
};