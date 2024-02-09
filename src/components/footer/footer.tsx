
import React from 'react';
import './footer.css';
import { AndroidFilled, AppleFilled } from '@ant-design/icons';
import { Row, Col, Button, Card } from 'antd';

const { Meta } = Card;


export const Footer: React.FC = () => {

    return (
        <>
            <footer style={{margin: '156px 24px 42px'}}>
              <Row justify={'space-between'} wrap={true} align={'bottom'} style={{flexWrap: 'wrap-reverse'}}>
                <Col flex="none">
					<Button type="link">Смотреть отзывы</Button>
				</Col>
                <Col flex="none" className='footer-card'>
					<Card bordered={false}
						actions={[
							<Button type="text"><AndroidFilled />Android OS</Button>,
							<Button type="text"><AppleFilled />Apple iOS</Button>,
						]}
					>
						<Meta title={<a>Скачать на телефон </a>} description="Доступно в PRO-тарифе" />
					</Card>
                </Col>
              </Row>
            </footer>
        </>
    );
};
