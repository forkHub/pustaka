///<reference path="./Route.ts"/>

function posisiKamera(x:number, y:number):void {
    Basik.Camera.x = x;
    Basik.Camera.y = y;
}

function KameraX() {
    return Basik.Camera.x;
}

function KameraY() {
    return Basik.Camera.y;
}