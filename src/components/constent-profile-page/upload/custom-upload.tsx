import React, { Dispatch, SetStateAction, useEffect, useMemo, useState } from 'react';
import { PlusOutlined, UploadOutlined } from '@ant-design/icons';
import { endpointsAPI, urlAPI, urlForImage } from '@constants/api';
import { useAppSelector } from '@hooks/typed-react-redux-hooks';
import { useResize } from '@hooks/use-resize';
import { tokenSelector } from '@redux/reducers/token-slice';
import { userFullSelector } from '@redux/reducers/user-full-slice';
import { Button, Form, Upload } from 'antd';
import type { UploadProps } from 'antd/es/upload';
import type { UploadFile } from 'antd/es/upload/interface';

type CustomUploadProps = {
    modalError: (isErrorSave: boolean) => void;
    setDisabledSave: Dispatch<SetStateAction<boolean>>;
};
export const CustomUpload: React.FC<CustomUploadProps> = ({ modalError, setDisabledSave }) => {
    const { token } = useAppSelector(tokenSelector);
    const tokenForHeader = localStorage.getItem('token') || token;
    const { imgSrc } = useAppSelector(userFullSelector);
    const mobileSize = 370;
    const {windowSize} = useResize();
    const initialFile = useMemo(
        () => ({
            uid: '1',
            name: `${windowSize < mobileSize ? '' : 'image.png'}`,
            url: imgSrc,
        }),
        [imgSrc, windowSize],
    );
    const [fileList, setFileList] = useState<UploadFile[]>(
        imgSrc === '' || !imgSrc ? [] : [initialFile],
    );

    useEffect(() => {
        if (imgSrc) setFileList([initialFile]);
    }, [imgSrc, initialFile]);

    const uploadButton = () => {
        if (windowSize < mobileSize) {
            return <Button icon={<UploadOutlined />}>Загрузить</Button>;
        }

        return (
            <div>
                <PlusOutlined />
                <div className='upload-block'>
                    Загрузить фото профиля
                </div>
            </div>
        );
    };

    const handleChange: UploadProps['onChange'] = ({ fileList: newFileList }) => {
        setFileList(newFileList);
        const newFile = newFileList[0];

        if (newFile && newFile.status === 'error') {
            setFileList([
                {
                    ...initialFile,
                    url: '',
                    name: `${windowSize < mobileSize ? '' : newFile.name}`,
                    status: 'error',
                },
            ]);
            modalError(false);
            setDisabledSave(true);
        } else if (newFile?.response?.url) {
            setFileList([
                {
                    ...initialFile,
                    name: `${windowSize < mobileSize ? '' : newFile.response.name}`,
                    url: `${urlForImage}${newFile.response.url}`,
                },
            ]);
            setDisabledSave(false);
        }
    };
    const onRemove = (file: UploadFile) => {
        if (file) setFileList([]);
    };

    return (
        <Form.Item>
            {windowSize < mobileSize && fileList.length < 1 && (
                <p className='profile-avatar__subtitle'>Загрузить фото профиля:</p>
            )}
            <Form.Item data-test-id='profile-avatar' name='imgSrc'>
                <Upload
                    action={`${urlAPI}${endpointsAPI.upload}`}
                    headers={{ Authorization: `Bearer ${tokenForHeader}` }}
                    maxCount={1}
                    listType={`${windowSize < mobileSize ? 'picture' : 'picture-card'}`}
                    fileList={fileList}
                    onPreview={() => {}}
                    onChange={handleChange}
                    onRemove={onRemove}
                    progress={{ strokeWidth: 2, showInfo: false, strokeColor: '#108ee9' }}
                >
                    {fileList.length < 1 && uploadButton()}
                </Upload>
            </Form.Item>
        </Form.Item>
    );
};
