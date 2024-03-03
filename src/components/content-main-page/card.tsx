import React from 'react';
import { Col, Card, Button } from 'antd';
import { CardInfo } from '@tstypes/types';

import './card.css';

export const ContentCard: React.FC<CardInfo> = ({ title, btnText, btnIcon }) => (
    <Col flex='auto' className='card-wrap'>
        <Card
            bordered={false}
            actions={[
                <Button type='link'>
                    {btnIcon}
                    {btnText}
                </Button>,
            ]}
        >
            <p>{title}</p>
        </Card>
    </Col>
);
