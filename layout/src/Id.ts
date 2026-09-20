let idx: number = Date.now();

export function getId(): number {
	idx++;
	return idx;
}