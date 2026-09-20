import { DBLayout, ELayout, tambah } from "./dbLyout";
import { store } from "./store";
import { Button, Div, Span } from "./ui/html";

function renderLayout(l: DBLayout, cont: HTMLElement) {
	Div(cont, (el) => {
		el.classList.add('disp-flex');
		Span(l.nama, el);

		Button(":", el, (tbl) => {
			tbl.onclick = (e) => {
				e.stopPropagation();
				//menu click
			}
		})
	});

}

export function render(l: DBLayout, cont: HTMLElement) {
	if (l.type == ELayout.layout) {
		renderLayout(l, cont);
	}
	else if (l.type == ELayout.tombol) {
		throw Error("todo");
	}

	else {
		throw ("invalid type");
	}
}

let r = tambah("root", ELayout.layout, 0);
tambah("Simpan", ELayout.tombol, r.id);
tambah("Muat", ELayout.tombol, r.id);
tambah("Jalankan", ELayout.tombol, r.id);

store.aktifLayoutId = r.id;
