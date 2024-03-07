import React from 'react';
import { Col, Card, Button } from 'antd';
import { CardInfo } from '@tstypes/types';

import './card.css';
import { Link } from 'react-router-dom';

export const ContentCard: React.FC<CardInfo> = ({ title, btnText, btnIcon, path, dataTest }) => (
    <Col flex='auto' className='card-wrap'>
        <Card
            bordered={false}
            actions={[
                <Link to={path}>
                    <Button type='link' data-test-id={dataTest}>
                        {btnIcon}
                        {btnText}
                    </Button>
                </Link>,
            ]}
        >
            <p>{title}</p>
        </Card>
    </Col>
);
