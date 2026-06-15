mulai();
let roket = muatGambar("roket");
roket.tipeDrag = 2;
roket.x = 160;
roket.y = 120;
roket.pusatX = 16;
roket.pusatY = 16;

//game loop
function update() {
	bersihkanLayar();
	stempel(roket);
	posisiTeks(10, 20);
	tulis("Putar kotak dengan mouse");
}