import { Card, Layout, Row } from 'antd';
import React from 'react';
import './main-page.css';
import { Header } from '@components/header/header';
import { SiderBar } from '@components/siderBar/siderBar';
import { Footer } from '@components/footer/footer';
import { ICardInfo } from '@tstypes/types';
import { ContentCard } from '@components/content-main-page/card';
import { contentCards } from '@constants/main-content-cards';

const { Content } = Layout;

export const MainPage: React.FC = () => {

    return (
        <>
            <div className='main-wrapper wrapper'>
                <Layout>
                    <SiderBar />
                    <Layout className='site-layout'>
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
