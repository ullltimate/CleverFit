import React, { useEffect, useState } from 'react';
import { Column , Pie } from '@ant-design/plots';
import { formatDateDDMM } from '@constants/calendar';
import { TrainingList } from '@services/catalogs';
import { Training } from '@services/trainings';
import {
    createDataForList,
    createDataForPlot,
    DataForPlot,
    filteredTrainings,
    generalLoadForPeriod,
    getMostReapetedTrain,
    getTotalApproaches,
    getTotalReplays,
    getTrainingForPeriod,
} from '@utils/achievements-week-healper';
import { Badge, Card, List, Tag } from 'antd';
import classNames from 'classnames';
import moment from 'moment';

import { NotFoundTrain } from './not-found-train-in-week/not-found-train';

import './week-achievements.css';

type WeekAchievementsProps = {
    trainings?: Training[];
    trainingList?: TrainingList[];
};

export const WeekAchievements: React.FC<WeekAchievementsProps> = ({ trainings, trainingList }) => {
    const [filterValue, setFilterValue] = useState('Все');
    const [filterOptions, setFilterOptions] = useState([filterValue]);
    const [filteredTrainForWeek, setFilteredTrainForWeek] = useState<Training[]>([]);
    const [dataForPlot, setDataForPlot] = useState<DataForPlot[]>([]);
    const [dataForList, setDataForList] = useState<DataForPlot[]>([]);
    const daysInWeek = 7;

    useEffect(() => {
        if (trainingList)
            setFilterOptions((options) =>
                options.length > 1 ? [...options] : options.concat(trainingList.map((e) => e.name)),
            );
    }, [trainingList]);

    useEffect(() => {
        const startDate = moment().subtract(6, 'days');
        const endDate = moment();

        if (trainings) {
            const trainForWeek = getTrainingForPeriod(trainings, startDate, endDate);

            if (trainForWeek) {
                const filteredTrain = filteredTrainings(trainForWeek, filterValue);

                setFilteredTrainForWeek(filteredTrain);
                setDataForPlot(createDataForPlot(startDate, endDate, filteredTrain));
            }
        }
    }, [trainings, filterValue]);

    useEffect(() => {
        setDataForList(createDataForList(dataForPlot));
    }, [dataForPlot]);

    // console.log(dataForList);
    console.log(filteredTrainForWeek);
    console.log(getMostReapetedTrain(filteredTrainForWeek));

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
        width: 520,
        height: 375,
    };

    const configPie = {
        data: [
          { type: '分类一', value: 1 },
          { type: '分类二', value: 25 },
          { type: '分类三', value: 18 },
          { type: '分类四', value: 15 },
          { type: '分类五', value: 3 },
          { type: '其他', value: 5 },
        ],
        angleField: 'value',
        colorField: 'type',
        paddingRight: 80,
        innerRadius: 0.8,
        label: {
          text: 'type',
          position: 'outside',
          connector: false,
          style: {
            fontWeight: 'bold',
          },
        },
        scale: { color: { palette: 'rainbow' } },
        legend: false,
        annotations: [
          {
            type: 'text',
            style: {
              text: '',
              x: '50%',
              y: '50%',
              textAlign: 'center',
              fontSize: 40,
              fontStyle: 'bold',
            },
          },
        ],
        width: 300,
        height: 335,
      };

    return (
        <React.Fragment>
            <div>
                <span className='achiev-filter-title'>Тип тренировки :</span>
                {filterOptions &&
                    filterOptions?.map((e) => (
                        <Tag
                            key={e}
                            color={e === filterValue ? 'blue' : 'default'}
                            onClick={() => setFilterValue(e)}
                        >
                            {e}
                        </Tag>
                    ))}
            </div>
            {filteredTrainForWeek?.length ? (
                <React.Fragment>
                    <div className='graphics-wrapper'>
                        <Column {...config} />
                        <div className='graphic-list-wrapper'>
                            <p className='graphic-list__title'>Средняя нагрузка по дням недели</p>
                            <List
                                dataSource={dataForList}
                                renderItem={(item, index) => (
                                    <List.Item className='graphic-list-item'>
                                        <Badge
                                            count={index + 1}
                                            className={classNames({
                                                'has-load': item.load,
                                                'hasnt-load': !item.load,
                                            })}
                                        />
                                        <span className=''>{item.date}</span>
                                        <span>{item.load ? `${item.load} кг` : ''}</span>
                                    </List.Item>
                                )}
                            />
                        </div>
                    </div>
                    <div style={{display: 'flex'}}>
                        <Card>
                            <p>{generalLoadForPeriod(filteredTrainForWeek)}</p>
                            <p>Общая нагрузка, кг</p>
                        </Card>
                        <Card>
                            <p>{(generalLoadForPeriod(filteredTrainForWeek) / daysInWeek).toFixed(1)}
                            </p>
                            <p>Нагрузка в день, кг</p>
                        </Card>
                        <Card>
                            <p>{getTotalReplays(filteredTrainForWeek)}</p>
                            <p>Количество повторений, раз</p>
                        </Card>
                        <Card>
                            <p>{getTotalApproaches(filteredTrainForWeek)}</p>
                            <p>Подходы, раз</p>
                        </Card>
                    </div>
                    <div>
                        {filterValue === 'Все' && (
                            <div>
                                <span>Самая частая тренировка </span>
                                <span>
                                    {getMostReapetedTrain(filteredTrainForWeek)?.toLocaleLowerCase()}
                                </span>
                            </div>
                        )}
                        <div>
                            <span>Самое частое упражнение </span>
                            <span>
                                {}
                            </span>
                        </div>
                        <div>
                            <Pie {...configPie} />
                        </div>
                    </div>
                </React.Fragment>
            ) : (
                <NotFoundTrain />
            )}
        </React.Fragment>
    );
};
