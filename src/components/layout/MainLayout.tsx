import React, { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { Layout } from 'antd';
import { useAppSelector } from '@hooks/typed-react-redux-hooks';
import { CustomBreadcrumb } from '@components/breadcrumb/CustomBreadcrumb';
import { SiderBar } from '@components/siderBar/siderBar';
import { PATHS } from '@constants/paths';

export const MainLayout: React.FC = () => {
    const { user } = useAppSelector((state) => state.userReducer);
    const navigate = useNavigate();

    useEffect(() => {
        user.email === '' && !localStorage.getItem('token') ? navigate(PATHS.AUTH) : '';
    }, [navigate, user.email]);
    
    return (
        <>
            <div className='main-wrapper wrapper'>
                <Layout>
                    <SiderBar />
                    <Layout className='site-layout'>
                        <CustomBreadcrumb />
                        <Outlet />
                    </Layout>
                </Layout>
            </div>
        </>
    );
};
