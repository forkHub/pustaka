import { getId } from "./Id";

export enum ELayout {
	layout,
	tombol,
	link
}

export interface DBLayout {
	id: number;
	nama: string;
	type: ELayout;
	induk: number;
}

const list: DBLayout[] = [];

export function tambah(
	nama: string,
	type: ELayout,
	induk: number
): DBLayout {
	let db: DBLayout = {
		id: getId(),
		nama: nama,
		type: type,
		induk: induk
	};

	list.push(db);

	return db;
}

export function queryId(id: number): DBLayout | null {
	for (const el of list) {
		if (el.id === id) return el;
	}

	return null;
}