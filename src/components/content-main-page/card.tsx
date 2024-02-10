import React from 'react';
import './card.css';
import { Col, Card, Button } from 'antd';
import { ICardInfo } from '../../types/types';


export const ContentCard: React.FC<ICardInfo> = ({title, btnText, btnIcon}) => {

    return (
        <>
            <Col span={8} className='card-wrap'>
                <Card title={title} bordered={false}>
                    <Button type="link">{btnIcon}{btnText}</Button>
                </Card>
            </Col>
        </>
    );
};
