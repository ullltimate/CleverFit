import React from 'react';
import { Pie } from '@ant-design/plots';
import { DataForPieDiagram } from '@utils/achievements-week-healper';


type PieDiagramProps = {
    dataForPieDiagram: DataForPieDiagram[],
}


export const PieDiagram: React.FC<PieDiagramProps> = ({ dataForPieDiagram }) => {

    const data = dataForPieDiagram.filter(e => e.count).map(e => ({type: e.type, count: e.count}));

    const config = {
        data,
        angleField: 'count',
        colorField: 'type',
        margin: 80,
        innerRadius: 0.75,
        label: {
          text: 'type',
          position: 'outside',
          formatter: (text: string) => text,
          connector: false,
          style: {
            fontWeight: 'bold',
          },
        },
        scale: { color: { palette: 'rainbow' } },
        legend: false,
        width: 520,
        height: 335,
    };

    return (
            <Pie {...config} />
    );
};
