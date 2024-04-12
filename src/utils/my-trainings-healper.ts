export const createPeriodString = (day: number | null): string => {
    let periodString = '';

    switch (day) {
        case 1:
            periodString = `Через ${day} день`;
            break;
        case 2:
        case 3:
        case 4:
            periodString = `Через ${day} дня`;
            break;
        case 5:
        case 6:
            periodString = `Через ${day} дней`;
            break;
        case 7:
            periodString = '1 раз в неделю';
            break;
    }

    return periodString;
};