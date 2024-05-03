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
        marginTop: windowSize<370 ? -200 : 0,
        innerRadius: 0.37,
        radius: 0.5,
        label: {
          text: 'type',
          position: 'outside',
          formatter: (text: string) => text,
          connector: false,
          style: {
            style: {
              fontSize: 12,
              fontFamily: "'Inter', 'sans-serif'",
              fontWeight: 400,
              color: '#000000',
          },
          },
        },
        interaction: { tooltip: false },
        scale: { color: { palette: 'rainbow' } },
        legend: false,
        width: windowSize<830 ? 320 : 520,
    };

    return <Pie {...config} />
};
