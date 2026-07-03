mulai();
let roket = muatGambar("roket");
roket.x = 400;
roket.y = 300;
roket.tipeDrag = 1;

function update() {
	bersihkanLayar();
	stempel(roket);
	debugMouse();
}

function debugMouse() {
	posisiTeks(10, 20);
	tulis("Gerakkan kotak dengan cara menggesernya dengan mouse");
	tulis("");
	tulis("Gambar ditekan: " + roket.ditekan);
	tulis("Gambar di drag: " + roket.diDrag);
	tulis("Gambar x " + roket.x);
	tulis("Gambar y " + roket.y);
}
