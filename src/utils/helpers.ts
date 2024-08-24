export const formatDateString = (date: string) => {
	return new Intl.DateTimeFormat('en-US', {
		dateStyle: 'medium'
	}).format(new Date(date))
}

export const valueBetween = (value: number, value1: number, value2: number): boolean => {
	const min = Math.min(value1, value2)
	const max = Math.max(value1, value2)

	return value >= min && value <= max
}
