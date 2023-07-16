export function filler(length: number): number[] {
	return Array.from({ length }, () => 0).map((_, i) => i)
}