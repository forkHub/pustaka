///<reference path="./Route.ts"/>

const InputHit = Basik.Input.InputHit;
const InputX = Basik.Input.InputX;
const InputY = Basik.Input.InputY;
const InputIsDown = Basik.Input.Pencet;

// //extended
const FlushInput = Basik.Input.FlushInput;

const InputDragX = Basik.Input.GeserX;
const InputDragY = Basik.Input.GeserY;
const InputIsDragged = Basik.Input.Geser;
const InputType = Basik.Input.InputType;
const InputTapCount = Basik.Input.JmlTap;
const InputDragStartCount = Basik.Input.JmlDragMulai;
const InputDragEndCount = Basik.Input.JmlDragSelesai;
const InputDragStartX = Basik.Input.InputXAwal;
const InputDragStartY = Basik.Input.InputYAwal;

//TODO: input id


// // const FlushKeys = () => {
// // 	// Basik.input.flushByInput(Basik.input.keybGlobal);
// // 	Basik.input.flushByType('keyb');
// // }

// // const GetKey = (): string => {
// // 	return Basik.input.keybGlobal.key;
// // }

// // const KeybDiPencet = (key: string = ''): boolean => {
// // 	if ("" == key) {
// // 		return Basik.input.keybGlobal.isDown;
// // 	}
// // 	else {
// // 		let input: IInput = Basik.input.getInput(key, 'keyb');
// // 		if (input) {
// // 			return input.isDown;
// // 		}

// // 		return false;
// // 	}
// // }

// // const KeybHit = (key: string = ''): number => {
// // 	if ("" == key) {
// // 		let n: number = Basik.input.keybGlobal.hit;
// // 		Basik.input.keybGlobal.hit = 0;
// // 		return (n);
// // 	}
// // 	else {
// // 		let input: IInput = Basik.input.getInput(key, 'keyb');
// // 		let n: number = 0;

// // 		if (input) {
// // 			n = input.hit;
// // 			input.hit = 0;
// // 		}

// // 		return n;
// // 	}
// // }
