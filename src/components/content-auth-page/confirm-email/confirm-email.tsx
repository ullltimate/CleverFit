import React from 'react';
import './confirm-email.css'
import { ExclamationCircleFilled } from '@ant-design/icons';
import VerificationInput from "react-verification-input";
import { Typography } from 'antd';

const { Title, Text } = Typography;

export const ConfirmEmail: React.FC = () => {

    return (
        <>
            <div className='confirm-email'>
                <ExclamationCircleFilled className='confirm-email__icon'/>
                <Title level={3}>Введите код для восстановления аккауанта</Title>
                <Text disabled>Мы отправили вам на e-mail victorbyden@gmail.com шестизначный код. Введите его в поле ниже.</Text>
                <VerificationInput 
                    placeholder='' 
                    inputProps={{"data-test-id": 'verification-input'}}
                    classNames={{
                        container: "container",
                        character: "character",
                        characterInactive: "character__inactive",
                        characterSelected: "character__selected",
                        characterFilled: "character__filled",
                      }}
                />
                <Text disabled>Не пришло письмо? Проверьте папку Спам.</Text>
            </div>
        </>
    );
};
