import React from 'react';
import { Checkbox, Form, Input, InputNumber, Space } from 'antd';

import './drawer-form.css';
import { useAppDispatch } from '@hooks/typed-react-redux-hooks';
import { editExercises } from '@redux/reducers/training-slice';

type DrawerProps = {
    index: number;
    name: string;
    approaches: number;
    replays: number;
    weight: number;
    isEditTraining: boolean;
}

export const DrawerForm: React.FC<DrawerProps> = ({name, approaches, replays, weight, isEditTraining, index}) => {
    const dispatch = useAppDispatch();
    
    //const onValuesChange = (changeValue: DrawerProps, allValues: DrawerProps) => {
    //    console.log(changeValue,allValues);
    //}

    const onChangeName = (event: React.ChangeEvent<HTMLInputElement>) => {
        dispatch(editExercises({ name: event.target.value as string, index }))
    }
    const onChangeAproaches = (value: number | null) => {
        dispatch(editExercises({ approaches: value as number, index }))
    }
    const onChangeWeight = (value: number | null) => {
        dispatch(editExercises({ weight: value as number, index }))
    }    
    const onChangeReplays = (value: number | null) => {
        dispatch(editExercises({ replays: value as number, index }))
    }
    //console.log({name, approaches, replays, weight})
    return (
        <Form className='drawer-form'
            //onValuesChange={onValuesChange}
            initialValues={{name, approaches, replays, weight}}
        >
            <Form.Item name='name'>
                <Input placeholder='Упражнение' onChange={onChangeName} data-test-id={`modal-drawer-right-input-exercise${index}`} addonAfter={(isEditTraining ? <Checkbox data-test-id={`modal-drawer-right-checkbox-exercise${index}`} /> : '')}/>
            </Form.Item>
        <Space direction='horizontal'>
            <Form.Item className='item-approaches'>
                <div className='form-label'>Подходы</div>
                <Form.Item name='approaches'>
                    <InputNumber addonBefore="+" onChange={onChangeAproaches} data-test-id={`modal-drawer-right-input-approach${index}`}/>
                </Form.Item>
            </Form.Item>
            <Form.Item className='item-weight'>
                <div className='form-label'>Вес, кг</div>
                <Form.Item name='weight'>
                    <InputNumber onChange={onChangeWeight} data-test-id={`modal-drawer-right-input-weight${index}`}/>
                </Form.Item>
            </Form.Item>
            <Form.Item className='item-separator'>x</Form.Item>
            <Form.Item className='item-count'>
                <div className='form-label'>Количество</div>
                <Form.Item name='replays'>
                    <InputNumber onChange={onChangeReplays} data-test-id={`modal-drawer-right-input-quantity${index}`}/>
                </Form.Item>
            </Form.Item>
        </Space>
    </Form>
    );
};