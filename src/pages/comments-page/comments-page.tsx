import React from "react";
import { Layout } from "antd";
import { Content } from "antd/lib/layout/layout";
import { SiderBar } from "@components/siderBar/siderBar";
import { CustomBreadcrumb } from "@components/breadcrumb/CustomBreadcrumb";

import './comments-page.css';

export const CommentsPage: React.FC = () => {

    return (
        <>
            <div className='main-wrapper wrapper'>
                <Layout>
                    <SiderBar />
                    <Layout className='site-layout'>
                        <CustomBreadcrumb />
                        <Content style={{ margin: 24 }}>
                                gggg
                        </Content>
                    </Layout>
                </Layout>
            </div>
        </>
    );
};
