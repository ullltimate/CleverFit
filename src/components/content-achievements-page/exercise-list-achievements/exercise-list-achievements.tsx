import React from 'react';
import { DataForPieDiagram } from '@utils/achievements-week-healper';
import { Badge, List } from 'antd';
import classNames from 'classnames';

type ExerciseListAchievementsProps = {
    dataForListExerc: DataForPieDiagram[];
    isMonth?: boolean;
};

export const ExerciseListAchievements: React.FC<ExerciseListAchievementsProps> = ({
    dataForListExerc,
    isMonth,
}) => (
    <div className='graphic-list-wrapper exerc-list__margin'>
        <p className='graphic-list__title'>Самые частые упражнения по дням недели {isMonth && <span>за месяц</span>}</p>
        <List
            dataSource={dataForListExerc}
            renderItem={(item, index) => (
                <List.Item className='graphic-list-item'>
                    <Badge
                        count={index + 1}
                        className={classNames('has-type', {
                            'hasnt-type': !item.type,
                        })}
                    />
                    <span className=''>{item.date}</span>
                    <span>{item.type}</span>
                </List.Item>
            )}
        />
    </div>
);
