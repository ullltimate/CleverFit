import React, { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { TrainingList } from '@services/catalogs';
import { Tag } from 'antd';

import './filters-panel-achievements.css';

type FilterPanelAchievementsProps = {
    filterValue: string;
    setFilterValue: Dispatch<SetStateAction<string>>;
    trainingList?: TrainingList[];
};

export const FilterPanelAchievements: React.FC<FilterPanelAchievementsProps> = ({
    trainingList,
    filterValue,
    setFilterValue,
}) => {
    const [filterOptions, setFilterOptions] = useState([filterValue]);

    useEffect(() => {
        if (trainingList)
            setFilterOptions((options) =>
                options.length > 1 ? [...options] : options.concat(trainingList.map((e) => e.name)),
            );
    }, [trainingList]);

    return (
        <div className='achiev-filter-wrapper'>
            <p className='achiev-filter-title'>Тип тренировки :</p>
            <div className='tags-wrapper'>
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
        </div>
    );
};
