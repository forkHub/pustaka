"use strict";
window.onload = () => {
    let canvas = new HTMLCanvasElement();
    let s = new shape.Segment();
    s.render(canvas.getContext("2d"));
    document.body.appendChild(canvas);
};
