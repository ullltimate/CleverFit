import React, { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { CustomBreadcrumb } from '@components/breadcrumb/custom-breadcrumb';
import { SiderBar } from '@components/sider-bar/sider-bar';
import { PATHS } from '@constants/paths';
import { useAppSelector } from '@hooks/typed-react-redux-hooks';
import { tokenSelector } from '@redux/reducers/token-slice';
import { Layout } from 'antd';

export const MainLayout: React.FC = () => {
    const { token } = useAppSelector(tokenSelector);
    const navigate = useNavigate();

    useEffect(() => {
        if(token === '' && !localStorage.getItem('token')) navigate(PATHS.AUTH);
    }, [navigate, token]);

    return (
        <div className='main-wrapper wrapper'>
            <Layout>
                <SiderBar />
                <Layout className='site-layout'>
                    <CustomBreadcrumb />
                    <Outlet />
                </Layout>
            </Layout>
        </div>
    );
};
