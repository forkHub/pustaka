let str = "ASCII printable characters are the 95 characters in the ASCII character set that can be displayed on screen or printed on paper. They include letters, numbers, symbols, and punctuation marks, and are represented by codes 32 to 126. These characters are used to create written text and other visual content.";
let ls: string[] = [];
let ls2: string[] = [];
let min = 0;
let max = 255;
let lsGroup: string[][] = []
let expandCtr = 0;

const fileInput = document.createElement('input');
fileInput.type = 'file';
document.body.appendChild(fileInput);

for (let i = min; i <= max; i++) {
	ls.push(String.fromCharCode(i));
}
lsGroup.push(ls);

//test
// str = "aaaabbbb";
// console.log(jmlAda2("bbbb", str));

// check().then(() => {
// 	console.log("ok");
// })
// console.log(lsGroup);

fileInput.addEventListener('change', function () {
	const file = fileInput.files[0];
	if (!file) {
		console.log("no file selected");
		// output.textContent = 'No file selected.';
		return;
	}

	const reader = new FileReader();

	reader.onload = function (e) {
		str = e.target.result.toString();
		console.log("start");
		check().then(() => {
			console.log("end");
		})
		// output.textContent = e.target.result;
	};

	reader.onerror = function () {
		console.log("error reading file");
		// output.textContent = 'Error reading file.';
	};

	reader.readAsText(file); // You can change this to readAsDataURL or readAsArrayBuffer
});

async function check() {
	while (true) {
		console.log("expand start: " + expandCtr);
		let nextLs = await expandLs(lsGroup[lsGroup.length - 1]);
		if (nextLs.length > 0) {
			lsGroup.push(nextLs);
		}
		else {
			break;
		}

		expandCtr++;
		console.log("expand end");
	}
	console.log(lsGroup);
	console.log(btoa(lsGroup[lsGroup.length - 1][0]));
}

async function expandLs(ls: string[]): Promise<string[]> {
	let nextLs: string[] = [];

	ls.forEach(async (char) => {
		await expand(char, nextLs);
	})
	return nextLs;
}

async function expand(char: string, lst: string[]): Promise<void> {
	// console.group("expand " + char);
	for (let i = min; i <= max; i++) {
		let char2 = char + String.fromCharCode(i);
		if (char2 == "aa") {
			// debugger;
		}
		if (jmlAda(char2, str) > 1) {
			// console.log("expand sukses " + char2)
			lst.push(char2);
		}
		// if ((i % 100) == 0) {
		// 	console.log("i " + i);
		// }
	}
	// console.groupEnd();
}

function jmlAda(char: string, str: string, idx: number = 0, depth = 0): number {
	if (depth > 2) {
		// debugger;
		return 0
	}

	let idx2 = str.indexOf(char, idx);
	if (idx2 < 0) {
		return 0;
	}

	return jmlAda(char, str, idx2 + char.length, depth + 1) + 1;
}

function jmlAda2(char: string, str: string): number {
	let idx = 0;
	let hasil = 0;

	while (true) {
		// console.log("search idx " + idx);
		let idx2 = str.indexOf(char, idx);
		if (idx2 < 0) {
			return hasil;
		}
		else {
			hasil++;
			idx = idx2 + char.length;
			// console.log("idx " + idx);
		}
	}
}