import React from 'react';
import { Col, Card, Button } from 'antd';
import { CardInfo } from '@tstypes/types';

import './card.css';
import { useNavigate } from 'react-router-dom';
import { useLazyGetTrainingQuery } from '@services/trainings';

export const ContentCard: React.FC<CardInfo> = ({ title, btnText, btnIcon, path, dataTest }) => {
    const [getTrainings] = useLazyGetTrainingQuery();
    const navigate = useNavigate();

    const onClick = async () => {
        switch (btnText){
            case 'Календарь':
            await getTrainings().unwrap().then(() => navigate(path)).catch((error) => console.log(error));
        }
    };

    return (
        <Col flex='auto' className='card-wrap'>
            <Card
                bordered={false}
                actions={[
                    <Button type='link' data-test-id={dataTest} onClick={()=> onClick()}>
                        {btnIcon}
                        {btnText}
                    </Button>,
                ]}
            >
                <p>{title}</p>
            </Card>
        </Col>
    );
};
