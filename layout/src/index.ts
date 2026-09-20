import { queryId } from "./dbLyout";
import { render } from "./enLayout";
import { store } from "./store";
import { Button, Div, H1 } from "./ui/html";

function kiri(cont: HTMLElement) {
	Div(cont, () => {
		let l = queryId(store.aktifLayoutId);
		if (!l) throw Error("");
		render(l, cont);
	});
}

function kanan(cont: HTMLElement) {
	Button('Simpan', cont, (tbl) => {
		tbl.onclick = (e) => {
			e.stopPropagation();
			console.log('simpan klik');
		};
	});

	Button('Muat', cont, (tbl) => {
		tbl.onclick = (e) => {
			e.stopPropagation();
			console.log('muat klik');
		}
	});

}

function mainCont(c: HTMLElement): void {

	function menuHor(cont: HTMLElement) {
		//menu
		let menu = Div(cont);
		menu.classList.add('disp-flex');

		Button('Simpan', menu, () => {
			console.log('simpan klik');
		});

		Button('Muat', menu, () => {
			console.log('muat klik');
		});

	}

	function wrapHor(cont: HTMLElement) {
		let d = Div(cont);
		d.classList.add('disp-flex');

		kiri(d);
		kanan(d);
	}

	H1("layout", c);
	menuHor(c);
	wrapHor(c);
}

window.onload = () => {
	mainCont(document.body);
}