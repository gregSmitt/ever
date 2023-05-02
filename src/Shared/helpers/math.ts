export function devideDefaultPoints(num: number, isRound: boolean = true) {
	return isRound ? Math.round(num / 10 ** 9) : num / 10 ** 9
}

export function splitNumberBySpaces(str: string | number) {
	if (typeof str !== "string") str = '' + str
	let count = 0
	return str
		.split('')
		.reduceRight((str, letter) => {
			count++
			if (count === 3) {
				count = 0
				return ' ' + letter + str
			}
			return letter + str
		}, '')
		.trim()
}