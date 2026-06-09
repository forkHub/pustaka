
let box = muatGambar("kotak.png");
box.x = 400;
box.y = 300;
box.tipeDrag = 3;

function update() {
	bersihkanLayar();
	stempel(box);
	debugMouse();
}

function debugMouse() {
	posisiTeks(10, 20);
	tulis("Gerakkan kotak dengan cara menggeser mouse di mana saja");
	tulis("");
	tulis("Gambar ditekan: " + box.ditekan);
	tulis("Gambar di drag: " + box.diDrag);
	tulis("Gambar x " + box.x);
	tulis("Gambar y " + box.y);
}
