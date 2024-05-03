import React from 'react';
import { DownOutlined } from '@ant-design/icons';
import { formatDate, formatDateDDMM } from '@constants/calendar';
import { DataForPlot } from '@utils/achievements-week-healper';
import { Badge, Collapse, List } from 'antd';
import classNames from 'classnames';
import moment from 'moment';

type CollapsedLoadListProps = {
    dataForList: DataForPlot[][];
};

const { Panel } = Collapse;

export const CollapsedLoadList: React.FC<CollapsedLoadListProps> = ({ dataForList }) => (
        <Collapse expandIconPosition='end' ghost={true} expandIcon={(panelProps) => <DownOutlined rotate={panelProps.isActive ? 180 : 0} />}>
            {dataForList.map((e, i) => (
                <Panel
                    header={`Неделя ${moment(e[0].date).format(formatDateDDMM)}-${moment(e[e.length - 1].date).format(formatDateDDMM)}`}
                    key={i}
                >
                    <div className='graphic-list-wrapper'>
                        <List
                            dataSource={e}
                            renderItem={(item, index) => (
                                <List.Item className='graphic-list-item'>
                                    <Badge
                                        count={index + 1}
                                        className={classNames({
                                            'has-load': item.load,
                                            'hasnt-load': !item.load,
                                        })}
                                    />
                                    <span className=''>{moment(item.date).format(formatDate)}</span>
                                    <span>{item.load ? `${item.load} кг` : ''}</span>
                                </List.Item>
                            )}
                        />
                    </div>
                </Panel>
            ))}
        </Collapse>
    );
