let kotak = muatGambar("kotak.png");
kotak.ubin = true;

function update() {
	bersihkanLayar();
	stempel(kotak);
}
