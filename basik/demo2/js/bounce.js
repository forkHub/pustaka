Graphics(320, 240);

let box = LoadImage("./imgs/box.png");
let velX = 4;
let velY = 4;

function Update() {
    box.y += velY;
    box.x += velX;

    if (box.y + 32 > 240) {
        box.y = 240 - 32;
        velY = -4;
    }

    if (box.y < 0) {
        box.y = 0;
        velY = 4;
    }

    if (box.x + 32 > 320) {
        box.x = 320 - 32;
        velX = -4;
    }

    if (box.x < 0) {
        box.x = 0;
        velX = 4;
    }

    Cls();
    DrawAllImage();
}