window.onload = () => {
	let box = LoadImage("./imgs/box.png");
	box.width = 32;
	box.height = 32;
	box.y = 32;
	box.x = 32;
	console.log(box);

	for (let b = 0; b < 10; b++) {
		let img = LoadImage("./imgs/box.png");
		img.x = b * 2;
		img.y = 0;
		img.width = 32;
		img.height = 32;
		if (ImageCollide(box, img)) {
			console.log('collide, ', img);
		}
		console.log()
	}


}