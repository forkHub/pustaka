let kotak = muatImage("kotak.png");
kotak.panjang = 92;
kotak.lebar = 92;
kotak.rotasi = 45;
kotak.x = 160;
kotak.y = 120;
kotak.pusatX = 46;
kotak.pusatY = 46;

function update() {
	bersihkanLayar();
	gambarImage(kotak);
}
