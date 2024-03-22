import React, { useState } from 'react';
import { PlusOutlined } from '@ant-design/icons';
import { endpointsAPI, urlAPI, urlForImage } from '@constants/api';
import { useAppSelector } from '@hooks/typed-react-redux-hooks';
import { tokenSelector } from '@redux/reducers/token-slice';
import { userFullSelector } from '@redux/reducers/user-full-slice';
import { Upload } from 'antd';
import type { UploadProps } from 'antd/es/upload';
import type { UploadChangeParam, UploadFile } from 'antd/es/upload/interface';

type CustomUploadProps = {
    modalError: (isErrorSave: boolean) => void
}
export const CustomUpload: React.FC<CustomUploadProps> = ({modalError}) => {
    const { token } = useAppSelector(tokenSelector);
    const tokenForHeader = localStorage.getItem('token') || token;
    const {imgSrc} = useAppSelector(userFullSelector);
    console.log(imgSrc)
    const initialFile = {
        uid: '1',
        name: 'image.png',
        url: imgSrc,
    }
    const [fileList, setFileList] = useState<UploadFile[]>((imgSrc === '' || !imgSrc) ? [] : [initialFile]);

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
    const handleChange: UploadProps['onChange'] = (info: UploadChangeParam<UploadFile>) => {
        const {file, fileList: newFileList} = info

        setFileList(newFileList)
        const newFile = newFileList[0];
        console.log(newFile)

        if (newFile) {
            if(newFile.response){
                console.log(newFile.response)
                if(newFile.response.url){
                    setFileList([{...initialFile, name: newFile.response.name, url: `${urlForImage}${newFile.response.url}`}])
                } else {
                    setFileList([{...initialFile, url: '', name: newFile.name, status: 'error'}])
                    if (newFile.response.statusCode === 409) {
                        modalError(false)
                    }
                }
            }
        }
    };

    return (
        <Upload
            action={`${urlAPI}${endpointsAPI.upload}`}
            headers={{ Authorization: `Bearer ${tokenForHeader}` }}
            maxCount={1}
            listType='picture-card'
            fileList={fileList}
            onPreview={() => {}}
            onChange={handleChange}
            progress={{ strokeWidth: 2, showInfo: false ,strokeColor:'#108ee9'}}
        >
            {fileList.length < 1 && uploadButton}
        </Upload>
    );
};
