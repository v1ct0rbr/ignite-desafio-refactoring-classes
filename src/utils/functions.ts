export function toNumber(value: string | undefined): number {
	const newNumber = typeof value != 'undefined' ? Number(value.replaceAll(',', '.')) : 0;
	return newNumber;
}

export function convertCurrentToString(value: number | undefined): string {
	let newValue = `${value}`.replaceAll('R$', '').replaceAll(',', '.');

	return newValue;
}
