import React from 'react';
import { Col, Card, Button } from 'antd';
import { ICardInfo } from '@tstypes/types';

import './card.css';

export const ContentCard: React.FC<ICardInfo> = ({ title, btnText, btnIcon }) => {
    return (
        <>
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
        </>
    );
};
