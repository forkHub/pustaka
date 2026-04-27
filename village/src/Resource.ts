export const resourceType = {
	WOOD: 'wood',
	TREE: 'tree',
	PLANK: 'plank'
} as const;

export type resourceType = typeof resourceType[keyof typeof resourceType];

export interface resourceCountByType {
	resType: resourceType;
	amount: number;
}
