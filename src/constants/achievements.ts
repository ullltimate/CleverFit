export const axisConfigPlot = {
    x: {
        title: 'Нагрузка, кг',
        titleSpacing: 16,
        titlePosition: 'bottom',
        titleFontSize: 14,
        tick: false,
        labelSpacing: 16,
    },
    y: {
        labelFormatter: (value: number) => `${value} кг`,
        tick: false,
        labelSpacing: 16,
    },
}

export const styleConfigPlot = {
    fill: '#85A5FFFF',
}