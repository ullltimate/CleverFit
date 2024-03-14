import React from 'react';
import { Checkbox, Form, Input, InputNumber, Space } from 'antd';

import './drawer-form.css';

type DrawerProps = {
    name: string;
    approaches: number;
    replays: number;
    weight: number;
}

export const DrawerForm: React.FC<DrawerProps> = ({name, approaches, replays, weight}) => {
    const onValuesChange = (changeValue: DrawerProps, allValues: DrawerProps) => {
        console.log(changeValue,allValues);
    }
    //console.log({name, approaches, replays, weight})
    return (
        <Form className='drawer-form'
            onValuesChange={onValuesChange}
            initialValues={{name, approaches, replays, weight}}
        >
            <Form.Item name='name'>
                <Input placeholder='Упражнение' addonAfter={(<Checkbox />)}/>
            </Form.Item>
        <Space direction='horizontal'>
            <Form.Item className='item-approaches'>
                <div className='form-label'>Подходы</div>
                <Form.Item name='approaches'><InputNumber addonBefore="+"/></Form.Item>
            </Form.Item>
            <Form.Item className='item-weight'>
                <div className='form-label'>Вес, кг</div>
                <Form.Item name='weight'><InputNumber/></Form.Item>
            </Form.Item>
            <Form.Item className='item-separator'>x</Form.Item>
            <Form.Item className='item-count'>
                <div className='form-label'>Количество</div>
                <Form.Item name='replays'><InputNumber /></Form.Item>
            </Form.Item>
        </Space>
    </Form>
    );
};