Graphics(320, 240);

let box = LoadImage("./imgs/box.png");
let velX = 4;
let velY = 0;
let accY = .1;

function Update() {

    velY += accY;
    box.y += velY;
    box.x += velX;

    if (box.y + 32 > 240) {
        box.y = 240 - 32;
        velY = -5;
    }

    if (box.x + 32 > 320) {
        box.x = 320 - 32;
        velX *= -1;
    }

    if (box.x < 0) {
        box.x = 0;
        velX *= -1;
    }

    Cls();
    Write("TEST");
    DrawAllImage();
}