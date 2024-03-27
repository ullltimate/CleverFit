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
    const windowSize = useResize();
    const initialFile = useMemo(
        () => ({
            uid: '1',
            name: `${windowSize.windowSize < 370 ? '' : 'image.png'}`,
            url: imgSrc,
        }),
        [imgSrc, windowSize.windowSize],
    );
    const [fileList, setFileList] = useState<UploadFile[]>(
        imgSrc === '' || !imgSrc ? [] : [initialFile],
    );

    useEffect(() => {
        if (imgSrc) setFileList([initialFile]);
    }, [imgSrc, initialFile]);

    const uploadButton = (
        <div>
            <PlusOutlined />
            <div
                style={{
                    marginTop: 8,
                    maxWidth: 70,
                    color: 'var(--color-disabled)',
                }}
            >
                Загрузить фото профиля
            </div>
        </div>
    );
    const uploudButtonMobile = <Button icon={<UploadOutlined />}>Загрузить</Button>;

    const handleChange: UploadProps['onChange'] = ({ fileList: newFileList }) => {
        setFileList(newFileList);
        const newFile = newFileList[0];

        if (newFile) {
            if (newFile.status === 'error') {
                modalError(false);
                setDisabledSave(true);
            }
            if (newFile.response) {
                if (newFile.response.url) {
                    setFileList([
                        {
                            ...initialFile,
                            name: `${windowSize.windowSize < 370 ? '' : newFile.response.name}`,
                            url: `${urlForImage}${newFile.response.url}`,
                        },
                    ]);
                    setDisabledSave(false);
                } else {
                    setFileList([
                        {
                            ...initialFile,
                            url: '',
                            name: `${windowSize.windowSize < 370 ? '' : newFile.name}`,
                            status: 'error',
                        },
                    ]);
                }
            }
        }
    };
    const onRemove = (file: UploadFile) => {
        const files: UploadFile[] = [];

        if (file) setFileList(files);
    };

    return (
        <Form.Item>
            {windowSize.windowSize < 370 && fileList.length < 1 && (
                <p className='profile-avatar__subtitle'>Загрузить фото профиля:</p>
            )}
            <Form.Item data-test-id='profile-avatar' name='imgSrc'>
                <Upload
                    action={`${urlAPI}${endpointsAPI.upload}`}
                    headers={{ Authorization: `Bearer ${tokenForHeader}` }}
                    maxCount={1}
                    listType={`${windowSize.windowSize < 370 ? 'picture' : 'picture-card'}`}
                    fileList={fileList}
                    onPreview={() => {}}
                    onChange={handleChange}
                    onRemove={onRemove}
                    progress={{ strokeWidth: 2, showInfo: false, strokeColor: '#108ee9' }}
                >
                    {fileList.length < 1 &&
                        (windowSize.windowSize < 370 ? uploudButtonMobile : uploadButton)}
                </Upload>
            </Form.Item>
        </Form.Item>
    );
};
