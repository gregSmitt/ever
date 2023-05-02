export interface IDatePartsArray {
	[k: string]: number;
	year: number
	month: number
	day: number
	hours: number
	minutes: number
	seconds: number
	milliseconds: number
}
export function dateFromTimestamp(time: number): IDatePartsArray {
	const date = new Date(time)
	return {
		year: date.getFullYear(),
		month: date.getMonth() + 1,
		day: date.getDate(),
		hours: date.getHours(),
		minutes: date.getMinutes(),
		seconds: date.getSeconds(),
		milliseconds: date.getMilliseconds()
	}
}


export function twoSymbolsDateValue(value: string | number) {
	if (`${value}`.length >= 2) return `${value}`
	return `0${value}`
}

export function getDateString(value: number | null): string {
	if (value === null) return ''
	const date = { ...dateFromTimestamp(value) }
	const newDate: {
		[k: string]: string;
	} = {}
	for (const key in date) {
		newDate[key] = twoSymbolsDateValue(date[key])
	}
	return `${newDate.day}/${newDate.month}/${newDate.year} ${newDate.hours}:${newDate.minutes}:${newDate.seconds}`
}

export function getHHMMSSString(value: number | null): string {
	if (value === null) return ''
	const date = { ...dateFromTimestamp(value) }
	const newDate: {
		[k: string]: string;
	} = {}
	for (const key in date) {
		newDate[key] = twoSymbolsDateValue(date[key])
	}
	return `${newDate.hours}:${newDate.minutes}:${newDate.seconds}`
}