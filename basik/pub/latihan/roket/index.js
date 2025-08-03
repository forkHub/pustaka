let bg = muatImage("bg_bintang.jpg");
let matahari = muatImage("matahari.png");
let roket = muatImage("roket.png");

matahari.x = 142;
matahari.y = 142;
matahari.panjang = 128;
matahari.lebar = 128;
matahari.pusatX = 64;
matahari.pusatY = 64;

roket.pusatX = 32;
roket.pusatY = 46;

function update() {
	roket.x = mouseX();
	roket.y = mouseY();

	matahari.rotasi++;

	gambarImage(bg);
	gambarImage(matahari);
	gambarImage(roket);
}
