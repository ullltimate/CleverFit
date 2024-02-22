import React, { useEffect, useState } from 'react';
import './confirm-email.css'
import { ExclamationCircleFilled } from '@ant-design/icons';
import VerificationInput from "react-verification-input";
import { Typography } from 'antd';
import { useAppSelector } from '@hooks/typed-react-redux-hooks';
import { useLocation, useNavigate } from 'react-router-dom';
import { PATHS } from '@constants/paths';
import { useConfirmEmailMutation } from '@services/auth';
import { Loader } from '@components/loader/Loader';

const { Title, Text } = Typography;

export const ConfirmEmail: React.FC = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { user } = useAppSelector(state => state.userReducer);
    const [ confirm, {isLoading} ] = useConfirmEmailMutation();
    const [borderStyle, setBorderStyle] = useState('character');
    const [value, setValue] = useState('')

    const onComplete = (value: string) => {
        confirm({email: user.email, code: value})
        .unwrap()
        .then(() => {
            navigate(PATHS.CHANGE_PASSWORD, {state: PATHS.CONFIRM_EMAIL})
        }).catch(() => {setBorderStyle('character-error'), setValue('')})
        console.log({email: user.email, code: value})
    }

    useEffect(() => {
        location.state != PATHS.AUTH ? navigate(PATHS.AUTH) : '';
    },[location.state, navigate])

    return (
        <>
            {isLoading && <Loader/>}
            <div className='confirm-email'>
                <ExclamationCircleFilled className='confirm-email__icon'/>
                <Title level={3}>Введите код для восстановления аккауанта</Title>
                <Text disabled>Мы отправили вам на e-mail victorbyden@gmail.com шестизначный код. Введите его в поле ниже.</Text>
                <VerificationInput 
                    value={value}
                    placeholder='' 
                    inputProps={{"data-test-id": 'verification-input'}}
                    classNames={{
                        container: "container",
                        character: `${borderStyle}`,
                        characterInactive: "character__inactive",
                        characterSelected: "character__selected",
                        characterFilled: "character__filled",
                    }}
                    onChange={(value) => setValue(value)}
                    onComplete={onComplete}
                />
                <Text disabled>Не пришло письмо? Проверьте папку Спам.</Text>
            </div>
        </>
    );
};
