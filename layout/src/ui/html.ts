export function Div(cont: HTMLElement, onCreate?: (div: HTMLDivElement) => void): HTMLDivElement {
	let div = document.createElement('div');
	cont.appendChild(div);

	onCreate && onCreate(div);

	return div;
}

export function Button(label: string, cont: HTMLElement, onCreate?: (tbl: HTMLButtonElement) => void): HTMLButtonElement {
	let tbl: HTMLButtonElement = document.createElement('button');

	tbl.innerText = label;

	onCreate && onCreate(tbl);

	cont.appendChild(tbl);

	return tbl;
}

export function H1(title: string, cont: HTMLElement) {
	let h = document.createElement('h1');
	h.innerText = title;
	cont.appendChild(h);
}

export function Span(title: string, cont: HTMLElement, onCreate?: (el: HTMLSpanElement) => void): HTMLSpanElement {
	let h = document.createElement('span');
	h.innerText = title;
	cont.appendChild(h);
	onCreate && onCreate(h);
	return h;
}