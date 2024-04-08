import { TrainingList, TrainingPals } from '@services/catalogs';
import { Training } from '@services/trainings';

export const choiceFavoriteTrainType = (trains: Training[], trainList: TrainingList[]) => {
    const resultTrain: Record<string, number> = {};

    trains.map((e) => 
        e.exercises.forEach((el) => {
            resultTrain[e.name] = el.replays * el.weight * el.approaches;
        }));
    const maxValue = Math.max(...Object.keys(resultTrain).map(key => resultTrain[key]));
    const maxName = Object.keys(resultTrain).find(key => resultTrain[key] === maxValue);

    const maxTraining = trainList.find(({ name }) => name === maxName)?.key;

    return maxTraining
}

export const sortAndFilterUserList = (list: TrainingPals[], searchStr: string) => {
    const filtered = [...list].sort((a, b) => a.name.localeCompare(b.name)).filter((e) => e.name.toLowerCase().includes(searchStr.toLowerCase()))

   return filtered
}

export const createTypeTrainString = (str: string) => {
    let newStr = '';

    switch(str){
        case 'Силовая':
            newStr = 'силовых тренировок';
            break;
        case 'Грудь':
            newStr = 'тренировок на грудь';
            break;
        case 'Спина':
            newStr = 'тренировок на спину';
            break;
        case 'Ноги':
            newStr = 'тренировок на ноги';
            break;
        case 'Руки':
            newStr = 'тренировок на руки';
            break;
    }

    return newStr
}