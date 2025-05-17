Graphics(320, 240);

let brush = LoadImage("./imgs/brush.png");
brush.handleX = 8;
brush.handleY = 8;

Cls();
function Update() {
    ClearArea(0, 0, 320, 30)
    Write("Drag to draw");
    if (InputIsDown()) {
        brush.x = InputX();
        brush.y = InputY();
        DrawAllImage();
    }
}
