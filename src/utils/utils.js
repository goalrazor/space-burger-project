import dayjs from "dayjs";

export const formatDate = (date) => {
    let result = dayjs(date).format('HH:mm Z')
    const now = dayjs()

    const getDiffString = (diffDate) => {
        switch (diffDate) {
            case 0 :
                return 'Сегодня'
            case 1 :
                return 'Вчера'
            default :
                return `${diffDate} дня назад`
        }
    }

    result = `${getDiffString(now.diff(date, 'day'))}, ${result} i-GMT`;
    return result
}
