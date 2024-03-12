import React from 'react';
import { Form, InputNumber, Space } from 'antd';

import './drawer-form.css';

export const DrawerForm: React.FC = () => {

    return (
        <Form className='drawer-form'>
        <Space direction='horizontal'>
            <Form.Item className='item-approaches'>
                <div className='form-label'>Подходы</div>
                <InputNumber addonBefore="+" />
            </Form.Item>
            <Form.Item className='item-weight'>
                <div className='form-label'>Вес, кг</div>
                <InputNumber />
            </Form.Item>
            <Form.Item className='item-separator'>x</Form.Item>
            <Form.Item className='item-count'>
                <div className='form-label'>Количество</div>
                <InputNumber />
            </Form.Item>
        </Space>
    </Form>
    );
};