import React, { useEffect, useState } from 'react';
import { Column } from '@ant-design/plots';
import { TrainingList } from '@services/catalogs';
import { Training } from '@services/trainings';
import { Tag } from 'antd';
import moment from 'moment';

import './week-achievements.css';

type WeekAchievementsProps = {
    trainings?: Training[];
    trainingList?: TrainingList[];
};

export const WeekAchievements: React.FC<WeekAchievementsProps> = ({ trainings, trainingList }) => {
    const [filterValue, setFilterValue] = useState('Все');
    const [filterOptions, setFilterOptions] = useState([filterValue]);

    useEffect(() => {
        if (trainingList)
            setFilterOptions((options) =>
                options.length > 1 ? [...options] : options.concat(trainingList.map((e) => e.name)),
            );
    }, [trainingList]);

    const currentDay = moment();
    
    const data = [
        { type: '1-3秒', value: 0.16 },
        { type: '4-10秒', value: 0.125 },
        { type: '11-30秒', value: 0.24 },
        { type: '31-60秒', value: 0.19 },
        { type: '1-3分', value: 0.22 },
        { type: '3-10分', value: 0.05 },
        { type: '10-30分', value: 0.01 },
      ];
      const config = {
        data,
        xField: 'type',
        yField: 'value',
        style: {
          fill: ({ type }) => {
            if (type === '10-30分' || type === '30+分') {
              return '#22CBCC';
            }

            return '#2989FF';
          },
        },
        label: {
          text: (originData) => {
            const val = parseFloat(originData.value);

            if (val < 0.05) {
              return `${(val * 100).toFixed(1)  }%`;
            }

            return '';
          },
          offset: 10,
        },
        legend: false,
        width: 520,
        height: 375,
      };

    return (
        <React.Fragment>
            <div>
                <span className='achiev-filter-title'>Тип тренировки :</span>
                {filterOptions.map((e) => (
                    <Tag
                        key={e}
                        color={e === filterValue ? 'blue' : 'default'}
                        onClick={() => setFilterValue(e)}
                    >
                        {e}
                    </Tag>
                ))}
            </div>
            <div style={{ height: 375}}>
                <Column {...config} />
            </div>
        </React.Fragment>
    );
};
