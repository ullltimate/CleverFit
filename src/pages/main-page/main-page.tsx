import {
    MenuFoldOutlined,
    MenuUnfoldOutlined,
  } from '@ant-design/icons';
import { Card, Col, Layout, Row } from 'antd';
import React, { useState } from 'react';

import './main-page.css';
import { Header } from '@components/header/header';
import { SiderBar } from '@components/siderBar/siderBar';
import { Footer } from '@components/footer/footer';

const { Content } = Layout;

export const MainPage: React.FC = () => {
    const [collapsed, setCollapsed] = useState(false);

    return (
        <>
            <Layout>
                <SiderBar collapsed={collapsed}/>
                <Layout className="site-layout">
                    <Header />
                    <div className='trapezoid' data-test-id='sider-switch'>
                        {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
                        className: 'trigger',
                        onClick: () => setCollapsed(!collapsed),
                        })}
                    </div>
                    <Content style={{margin: 24}}>
                        <Card bordered={false} className='content-discription'>
                          <p className='content-text'>
                              С CleverFit ты сможешь: <br/>
                              — планировать свои тренировки на календаре, выбирая тип и уровень нагрузки;<br/>
                              — отслеживать свои достижения в разделе статистики, сравнивая свои результаты с нормами и рекордами;<br/>
                              — создавать свой профиль, где ты можешь загружать свои фото, видео и отзывы о тренировках;<br/>
                              — выполнять расписанные тренировки для разных частей тела, следуя подробным инструкциям и советам профессиональных тренеров.
                          </p>
                        </Card>
                        <Card bordered={false} className='content-discription'>
                          <h4 className='content-subtitle'>
                              CleverFit — это не просто приложение, а твой личный помощник в мире фитнеса. Не откладывай на завтра — начни тренироваться уже сегодня!
                          </h4>
                        </Card>
                        <div className="cards-wrapper">
                            <Row gutter={16}>
                              <Col span={8}>
                                <Card title="Расписать тренировки" bordered={false} style={{textAlign: 'center'}}>
                                  Card content
                                </Card>
                              </Col>
                              <Col span={8}>
                                <Card title="Назначить календарь" bordered={false} style={{textAlign: 'center'}}>
                                  Card content
                                </Card>
                              </Col>
                              <Col span={8}>
                                <Card title="Заполнить профиль" bordered={false} style={{textAlign: 'center'}}>
                                  Card content
                                </Card>
                              </Col>
                            </Row>
                        </div>
                    </Content>
					<Footer />
                </Layout>
            </Layout>
        </>
    );
};
