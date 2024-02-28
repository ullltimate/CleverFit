import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, Layout, Row } from 'antd';
import { useAppSelector } from '@hooks/typed-react-redux-hooks';
import { Header } from '@components/header/header';
import { SiderBar } from '@components/siderBar/siderBar';
import { Footer } from '@components/footer/footer';
import { ContentCard } from '@components/content-main-page/card';
import { contentCards } from '@constants/main-content-cards';
import { PATHS } from '@constants/paths';
import { ICardInfo } from '@tstypes/types';

import './main-page.css';
import { CustomBreadcrumb } from '@components/breadcrumb/CustomBreadcrumb';

const { Content } = Layout;

export const MainPage: React.FC = () => {
    const { user } = useAppSelector(state => state.userReducer);
    const navigate = useNavigate();

    console.log(user)

    useEffect(() => {
        (user.email === '' && !localStorage.getItem('token')) ? navigate(PATHS.AUTH) : '';
    },[navigate, user.email])

    return (
        <>
            <div className='main-wrapper wrapper'>
                <Layout>
                    <SiderBar />
                    <Layout className='site-layout'>
                        <CustomBreadcrumb />
                        <Header />
                        <Content style={{ margin: 24 }}>
                            <Card bordered={false} className='content-discription'>
                                <p className='content-text'>
                                    С CleverFit ты сможешь: <br />
                                    — планировать свои тренировки на календаре, выбирая тип и
                                    уровень нагрузки;
                                    <br />
                                    — отслеживать свои достижения в разделе статистики, сравнивая
                                    свои результаты с нормами и рекордами;
                                    <br />
                                    — создавать свой профиль, где ты можешь загружать свои фото,
                                    видео и отзывы о тренировках;
                                    <br />— выполнять расписанные тренировки для разных частей тела,
                                    следуя подробным инструкциям и советам профессиональных
                                    тренеров.
                                </p>
                            </Card>
                            <Card bordered={false} className='content-discription'>
                                <h4 className='content-subtitle'>
                                    CleverFit — это не просто приложение, а твой личный помощник в
                                    мире фитнеса. Не откладывай на завтра — начни тренироваться уже
                                    сегодня!
                                </h4>
                            </Card>
                            <div className='cards-wrapper'>
                                <Row gutter={16} className='wrap'>
                                    {contentCards.map(
                                        (e: ICardInfo, i: number): React.ReactNode => (
                                            <ContentCard
                                                key={i}
                                                title={e.title}
                                                btnText={e.btnText}
                                                btnIcon={e.btnIcon}
                                            />
                                        ),
                                    )}
                                </Row>
                            </div>
                        </Content>
                        <Footer />
                    </Layout>
                </Layout>
            </div>
        </>
    );
};
