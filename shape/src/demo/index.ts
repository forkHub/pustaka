function logError(msg: string) {
    throw new Error(msg);
}

window.onload = () => {
    let canvas: HTMLCanvasElement = document.createElement("canvas") as HTMLCanvasElement;
    canvas.width = 400;
    canvas.height = 400;

    let s = shape
        .segment(50, 50)
        .position(new shape.Point(50, 0))

    shape.addShape(
        s.addShape(
            shape
                .segment(50, 0)
                .position(new shape.Point(50, 50)))
    );

    let ctx: CanvasRenderingContext2D = canvas.getContext("2d") ?? (() => { throw new Error("Failed to get 2D context"); })();

    document.body.appendChild(canvas);

    shape.update();
    shape.render(ctx);

    s.scale(new shape.Point(2, 2));
    s.rotation(10)
    shape.update();
    shape.render(ctx);

    // shape.root.trans.scale.x = 2;
    // render(0);
}