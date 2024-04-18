import React from 'react';
import { Pie } from '@ant-design/plots';
import { useResize } from '@hooks/use-resize';
import { DataForPieDiagram, filterDataForPieDiagram } from '@utils/achievements-week-healper';


type PieDiagramProps = {
    dataForPieDiagram: DataForPieDiagram[],
}


export const PieDiagram: React.FC<PieDiagramProps> = ({ dataForPieDiagram }) => {
	const {windowSize} = useResize();
    const data = filterDataForPieDiagram(dataForPieDiagram);

    const config = {
        data,
        angleField: 'count',
        colorField: 'type',
        innerRadius: 0.37,
        radius: 0.5,
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
        width: windowSize<830 ? 330 : 520,
        height: windowSize<830 ? 210 : 340
    };

    return <Pie {...config} />
};
