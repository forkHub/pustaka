let bintang = muatGambar("bintang.png");

function mouseDitekan() {
	bintang.x = mouseX();
	bintang.y = mouseY();
	stempel(bintang);
}