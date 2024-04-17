import React, { useEffect, useState } from 'react';
import { Column } from '@ant-design/plots';
import { formatDate, formatDateDDMM } from '@constants/calendar';
import { TrainingList } from '@services/catalogs';
import { Training } from '@services/trainings';
import { createDataForListMonthExerc, splitMonthIntoWeeks } from '@utils/achievements-month-healper';
import {
    createDataForList,
    createDataForPieDiagram,
    createDataForPlot,
    DataForPieDiagram,
    DataForPlot,
    filteredTrainings,
    generalLoadForPeriod,
    getMostReapetedTrain,
    getMostRepitedExercise,
    getTotalApproaches,
    getTotalReplays,
    getTrainingForPeriod,
} from '@utils/achievements-week-healper';
import { Badge, Card, List, Space } from 'antd';
import classNames from 'classnames';
import moment from 'moment';

import { FilterPanelAchievements } from '../filters-panel-achievements/filters-panel-achievements';
import { NotFoundTrain } from '../week-achievements/not-found-train-in-week/not-found-train';
import { PieDiagram } from '../week-achievements/pie-diagram/pie-diagram';

import './month-achievements.css';

type WeekAchievementsProps = {
    trainings?: Training[];
    trainingList?: TrainingList[];
};

export const MonthAchievements: React.FC<WeekAchievementsProps> = ({ trainings, trainingList }) => {
    const [filterValue, setFilterValue] = useState('Все');
    const [filteredTrainForMonth, setFilteredTrainForWeek] = useState<Training[]>([]);
    const [dataForPlot, setDataForPlot] = useState<DataForPlot[]>([]);
    const [dataForList, setDataForList] = useState<DataForPlot[][]>([]);
    const daysInWeek = 7;
    const [dataForPieDiagram, setDataForPieDiagram] = useState<DataForPieDiagram[]>([]);
    const [dataExercForDayOfWeek, setDataExercForDayOfWeek] = useState<DataForPieDiagram[]>([]);
    const [dataForListExerc, setDataForListExerc] = useState<DataForPieDiagram[]>([]);

    useEffect(() => {
        const endDate = moment().endOf('isoWeek');
        const startDate = moment(endDate).subtract(27, 'days');

        if (trainings) {
            const trainForMonth = getTrainingForPeriod(trainings, startDate, endDate);

            if (trainForMonth) {
                const filteredTrain = filteredTrainings(trainForMonth, filterValue);

                setFilteredTrainForWeek(filteredTrain);
                setDataForPlot(createDataForPlot(startDate, endDate, filteredTrain));
            }
        }
    }, [trainings, filterValue]);

    useEffect(() => {
        setDataForList(splitMonthIntoWeeks(dataForPlot, daysInWeek));
    }, [dataForPlot]);

    useEffect(() => {
        const endDate = moment().endOf('isoWeek');
        const startDate = moment(endDate).subtract(27, 'days');

        setDataForPieDiagram(createDataForPieDiagram(startDate, endDate, filteredTrainForMonth));
    },[filteredTrainForMonth])
    
    useEffect(() => {
        setDataExercForDayOfWeek(createDataForList(dataForPieDiagram))
    },[dataForPieDiagram]);

    useEffect(() => {
        setDataForListExerc(createDataForListMonthExerc(dataExercForDayOfWeek));
    },[dataExercForDayOfWeek])


    console.log(dataForPlot);
    console.log(dataForPieDiagram);
    console.log(dataExercForDayOfWeek);
    console.log(dataForListExerc)


    const data = dataForPlot.map((e) => ({
        date: moment(e.date).format(formatDateDDMM),
        load: e.load,
    }));

    const config = {
        data,
        xField: 'date',
        yField: 'load',
        axis: {
            x: {
                title: 'Нагрузка, кг',
                titleSpacing: 16,
                titlePosition: 'bottom',
                titleFontSize: 14,
                tick: false,
                labelSpacing: 16,
            },
            y: {
                labelFormatter: (value: number) => `${value} кг`,
                tick: false,
                labelSpacing: 16,
            },
        },
        style: {
            fill: '#85A5FFFF',
        },
        sizeField: 25,
        scrollbar: { x: { ratio: 0.5, value: 1 } },
    };

    return (
        <React.Fragment>
            <FilterPanelAchievements
                trainingList={trainingList}
                filterValue={filterValue}
                setFilterValue={setFilterValue}
            />
            {filteredTrainForMonth?.length ? (
                <React.Fragment>
                    <div>
                        <Column {...config} />
                    </div>
                    <Space>
                        {dataForList.map((e) => (
                            <div>
                                <p className='graphic-list__title'>Неделя {moment(e[0].date).format(formatDateDDMM)}-{moment(e[e.length-1].date).format(formatDateDDMM)}</p>
                                <List
                                    dataSource={e}
                                    renderItem={(item, index) => (
                                        <List.Item className='graphic-list-item'>
                                            <Badge
                                                count={index + 1}
                                                className={classNames({
                                                    'has-load': item.load,
                                                    'hasnt-load': !item.load,
                                                })}
                                            />
                                            <span className=''>{moment(item.date).format(formatDate)}</span>
                                            <span>{item.load ? `${item.load} кг` : ''}</span>
                                        </List.Item>
                                    )}
                                />
                            </div>
                        ))}
                    </Space>
                    <div style={{display: 'flex'}}>
                        <Card>
                            <p>{generalLoadForPeriod(filteredTrainForMonth)}</p>
                            <p>Общая нагрузка, кг</p>
                        </Card>
                        <Card>
                            <p>{(generalLoadForPeriod(filteredTrainForMonth) / daysInWeek).toFixed(1)}
                            </p>
                            <p>Нагрузка в день, кг</p>
                        </Card>
                        <Card>
                            <p>{getTotalReplays(filteredTrainForMonth)}</p>
                            <p>Количество повторений, раз</p>
                        </Card>
                        <Card>
                            <p>{getTotalApproaches(filteredTrainForMonth)}</p>
                            <p>Подходы, раз</p>
                        </Card>
                    </div>
                    <div>
                        {filterValue === 'Все' && (
                            <div>
                                <span>Самая частая тренировка </span>
                                <span>
                                    {getMostReapetedTrain(filteredTrainForMonth)?.toLocaleLowerCase()}
                                </span>
                            </div>
                        )}
                        <div>
                            <span>Самое частое упражнение </span>
                            <span>
                                {getMostRepitedExercise(filteredTrainForMonth).type}
                            </span>
                        </div>
                    </div>
                    <div style={{display: 'flex'}}>
                            <PieDiagram dataForPieDiagram={dataForPieDiagram}/>
                            <div className='graphic-list-wrapper'>
                                <p className='graphic-list__title'>Самые частые  упражнения по дням недели</p>
                                <List
                                    dataSource={dataForListExerc}
                                    renderItem={(item, index) => (
                                        <List.Item className='graphic-list-item'>
                                            <Badge
                                                count={index + 1}
                                                className={classNames({
                                                    'hasnt-type': !item.type,
                                                })}
                                            />
                                            <span className=''>{item.date}</span>
                                            <span>{item.type}</span>
                                        </List.Item>
                                    )}
                                />
                            </div>
                    </div>
                </React.Fragment>
            ) : (
                <NotFoundTrain />
            )}
        </React.Fragment>
    );
};
