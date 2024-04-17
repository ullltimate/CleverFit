import React from 'react';
import { Pie } from '@ant-design/plots';
import { DataForPieDiagram, filterDataForPieDiagram } from '@utils/achievements-week-healper';


type PieDiagramProps = {
    dataForPieDiagram: DataForPieDiagram[],
}


export const PieDiagram: React.FC<PieDiagramProps> = ({ dataForPieDiagram }) => {

    const data = filterDataForPieDiagram(dataForPieDiagram);

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
        interaction: { tooltip: false },
        scale: { color: { palette: 'rainbow' } },
        legend: false,
    };

    return <Pie {...config} />
};
