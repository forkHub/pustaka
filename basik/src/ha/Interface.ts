namespace Basik {
	export interface IInput {
		xStart: number;
		yStart: number;
		xDrag: number;
		yDrag: number;
		x: number;
		y: number;
		isDrag: boolean;
		isDown: boolean;
		isTap: boolean;
		// hit: number;
		key: number;
		// type: EInput;
		timerStart: number;
		timerEnd: number;
		// id: number;	//TODO: mungkin bisa dihapus
		// dragJml: number;
		// dragSelesaiJml: number;
		// tapJml: number;
		// upJml: number;
	}

	// interface ISprImgObj {
	// 	//share-ble
	// 	img: HTMLImageElement;
	// 	canvas: HTMLCanvasElement;
	// 	ctx: CanvasRenderingContext2D;

	// 	x: number;
	// 	y: number;
	// 	frameW: number;
	// 	frameH: number;
	// 	rotasi: number;
	// 	alpha: number;
	// 	isAnim: boolean;
	// 	rect: Ikt;
	// 	ctrIdx: number;		//index counter buat drawing
	// 	panjang: number;
	// 	lebar: number;
	// 	handleX: number;	//dipakai cuman pas saat gambar, dan perhitungan geometri, posisi tetap pakai x
	// 	handleY: number;	//dipakai cuman pas saat gambar
	// 	load: boolean;

	// 	//status internal
	// 	panjangDiSet: boolean;
	// 	lebarDiSet: boolean;

	// 	ratioX?: number,	//buat canvas buffer saat window resize
	// 	ratioY?: number
	// }

	//geom
	export interface IV2D {
		x: number,
		y: number
	}

	export interface IAudio {
		src: string;
		loaded: boolean;
		sound: HTMLAudioElement;
		playedCount: number;
	}

	// interface ISprObj {
	// 	buff: ISprImgObj,
	// 	dragable: boolean
	// 	dragged: boolean
	// 	down: boolean

	// 	//TODO:
	// 	jmlHit?: number,
	// 	jmlup?: number,
	// 	jmlStartDrag?: number,
	// 	jmlEndDrag?: number,

	// 	drgStartX: number
	// 	drgStartY: number
	// 	url: string

	// 	//
	// 	tipeDrag: number; //1 drag, 2 rotasi, 3 skew (todo)
	// 	sudutTekanAwal: number
	// 	sudutAwal: number
	// 	inputId: number
	// }
}