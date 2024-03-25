import React, { Dispatch, SetStateAction, useEffect, useMemo, useState } from 'react';
import { PlusOutlined } from '@ant-design/icons';
import { endpointsAPI, urlAPI, urlForImage } from '@constants/api';
import { useAppDispatch, useAppSelector } from '@hooks/typed-react-redux-hooks';
import { tokenSelector } from '@redux/reducers/token-slice';
import { saveImage, userFullSelector } from '@redux/reducers/user-full-slice';
import { Form, Upload } from 'antd';
import type { UploadProps } from 'antd/es/upload';
import type { UploadFile } from 'antd/es/upload/interface';

type CustomUploadProps = {
    modalError: (isErrorSave: boolean) => void,
    setDisabledSave: Dispatch<SetStateAction<boolean>>;
}
export const CustomUpload: React.FC<CustomUploadProps> = ({modalError, setDisabledSave}) => {
    const { token } = useAppSelector(tokenSelector);
    const tokenForHeader = localStorage.getItem('token') || token;
    const {imgSrc} = useAppSelector(userFullSelector);
    //const dispatch = useAppDispatch();
    console.log(imgSrc)
    const initialFile = useMemo(() => ({
        uid: '1',
        name: 'image.png',
        url: imgSrc,
    }),[imgSrc])
    const [fileList, setFileList] = useState<UploadFile[]>((imgSrc === '' || !imgSrc) ? [] : [initialFile]);

    useEffect(() => {
        if(imgSrc) setFileList([initialFile])
    },[imgSrc, initialFile])

    const uploadButton = (
        <div>
            <PlusOutlined />
            <div
                style={{
                    marginTop: 8,
                }}
            >Загрузить фото профиля</div>
        </div>
    );


    const handleChange: UploadProps['onChange'] = ({fileList: newFileList}) => {

        setFileList(newFileList)
        const newFile = newFileList[0];
        console.log(newFile)

        if (newFile) {
            if (newFile.status === 'error') {
                modalError(false)
                setDisabledSave(true);
            }
            if(newFile.response){
                console.log(newFile.response)
                if(newFile.response.url){
                    setFileList([{...initialFile, name: newFile.response.name, url: `${urlForImage}${newFile.response.url}`}]);
                    //dispatch(saveImage(`${urlForImage}${newFile.response.url}`));
                } else {
                    setFileList([{...initialFile, url: '', name: newFile.name, status: 'error'}])
                }
            }
        }
    };
    const onRemove = (file: UploadFile) => {
        const files: UploadFile[] = [];

        //dispatch(saveImage(''));
        if(file) setFileList(files);
      };

    return (
        <Form.Item data-test-id='profile-avatar' name='imgSrc'>
            <Upload
                action={`${urlAPI}${endpointsAPI.upload}`}
                headers={{ Authorization: `Bearer ${tokenForHeader}` }}
                maxCount={1}
                listType='picture-card'
                fileList={fileList}
                onPreview={() => {}}
                onChange={handleChange}
                onRemove={onRemove}
                progress={{ strokeWidth: 2, showInfo: false ,strokeColor:'#108ee9'}}
            >
                {fileList.length < 1 && uploadButton}
            </Upload>
        </Form.Item>
    );
};
