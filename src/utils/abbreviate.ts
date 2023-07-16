export function abbreviate(num: number): string {
	if (num < 1000) { // Less than 1k
		return num.toString()
	} else if (num < 10000) { // Less than 10k
		return (num / 1000).toFixed(1) + 'k'
	} else if (num < 1000000) { // Less than 1m
		return Math.round(num / 1000) + 'k'
	} else { // Over 1m
		return (num / 1000000).toFixed(1) + 'm'
	}
}