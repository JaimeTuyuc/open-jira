import { formatDistanceToNow } from 'date-fns'
import { es, enUS } from 'date-fns/locale'

export const getFormatDistanceToNow = (date: number) => {
    const fromNow = formatDistanceToNow(date, { locale: enUS})

    return `${fromNow} ago`
}

export const getFormatDistanceToNowMoreOptions = (date: number) => {
    const fromNow = formatDistanceToNow(date, { locale: es})

    return fromNow
}