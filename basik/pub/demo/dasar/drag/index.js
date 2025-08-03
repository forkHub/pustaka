let kotak = muatImage("kotak.png");
kotak.x = 400;
kotak.y = 300;
kotak.tipeDrag = 1;

function update() {
	bersihkanLayar();
	gambarImage(kotak);
	debugMouse();
}

function debugMouse() {
	posisiTeks(0, 20);
	tulis("Gerakkan kotak dengan cara menggesernya dengan mouse");
	tulis("");
	tulis("Image ditekan: " + kotak.ditekan);
	tulis("Image di drag: " + kotak.didrag);
	tulis("Image drag mulai x " + kotak.dragAwalX + "/drag mulai y " + kotak.dragAwalY);
	tulis("Image x " + kotak.x);
	tulis("Image y " + kotak.y);
}
