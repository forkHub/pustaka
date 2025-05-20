Graphics(320, 240);
let brush = LoadImage("../imgs/brush.png");
Cls();

function MouseDownEvent() {
    brush.x = MouseX();
    brush.y = MouseY();
    DrawImage(brush);
}  
