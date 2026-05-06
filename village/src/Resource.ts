import type { Scalar } from "./Skalar";

export const resourceType = {
	WOOD: 'wood',
	TREE: 'tree',
	PLANK: 'plank',
	WATER: 'water'
} as const;

export type resourceType = typeof resourceType[keyof typeof resourceType];

export interface resourceCountByType {
	resType: resourceType;
	amount: Scalar<number>;
}
