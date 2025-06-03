///<reference path="./Char.ts"/>
///<reference path="./Map.ts"/>

Graphics(320, 240);

const char = new Char("./imgs/bulan.png");
char.width = 32;
char.height = 32;

const gMap = new GameMap();
let txtLn: number = 10;

FillColor(0, 0, 0, 100);
let data: string[] = [
	"111111111111111111111111111111111111",
	"1         4441                     1",
	"1         4441                     1",
	"1      1111111          11111     11",
	"1            1         1        1111",
	"1            1         1        1111",
	"1111111      1                     1",
	"1      111   1   11111             1",
	"14           1                     1",
	"14          11                     1",
	"14          11                     1",
	"14   1131111111111   11131111111   1",
	"14     2                2          1",
	"14     2                2          1",
	"14     2113111          2 111111  11",
	"14        2      444    2 1        1",
	"14        2             2 1        1",
	"1         2   1111111111111    11111",
	"11111111  2              44444444441",
	"1         2   44444                1",
	"1         2   44444                1",
	"1         2   44444     111111111111",
	"1         2                        1",
	"1         2                        1",
	"1    11111111111111111111111111    1",
	"1                  4444            1",
	"1                  4444            1",
	"111111111111111111111111111111111111",
]
gMap.fromArray2(data);


AddListener("keydown", () => {
	// char.keyDown();
	char.onKeyPress(KeyboardEventObj().key);
})

AddListener("keyup", () => {

})

AddListener("update", () => {
	char.update();
	coin();


	//render
	Cls();
	gMap.render();
	DrawImage(char);
	debug();
});

function coin() {
	gMap.tiles.forEach((item: Tile) => {
		if (item.active && (item.type == Tile.TY_COIN)) {
			if (collideDot2(item, char.x + 16, char.y + 16)) {
				item.active = false;
			}
		}
	})
}

function debug() {
	txtLn = 10;
	write("char.grid x " + gridPos(char.x) + "/char x " + char.x);
	write("char.grid y " + gridPos(char.y) + "/char y " + char.y);
	write("char ladder: " + char.ladder);
	write("char on floor: " + char.onFloor);
}

function write(str: string) {
	let ctx = MainCanvas().getContext('2d');
	txtLn += 12;
	ctx.fillText(str, 10, txtLn);
}

function gridPos(x: number): number {
	return Math.floor(x / 32);
}

// function collideDot(img: Basik.Image, x: number, y: number): boolean {
// 	if (gridPos(img.x) != gridPos(x)) return false;
// 	if (gridPos(img.y) != gridPos(y)) return false;
// 	return true;
// }

function collideDot2(img: Basik.Image, x: number, y: number): boolean {
	if (x >= img.width + img.x) return false;
	if (y >= img.height + img.y) return false;
	if (x < img.x) return false;
	if (y < img.y) return false;

	return true;
}

// function collide(img: Basik.Image, img2: Basik.Image): boolean {
// 	if (gridPos(img.x) != gridPos(img2.x)) return false;
// 	if (gridPos(img.y) != gridPos(img2.y)) return false;
// 	return true;
// }

function getCollidedTile(): Basik.Image[] {
	let t: Basik.Image[] = [];
	gMap.tiles.forEach((tile) => {
		if (ImageCollide(char, tile)) {
			t.push(tile);
		}
	})
	return t;
}