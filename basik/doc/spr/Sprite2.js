"use strict";
var Basik;
(function (Basik) {
    let TypeDrag;
    (function (TypeDrag) {
        TypeDrag[TypeDrag["drag"] = 1] = "drag";
        TypeDrag[TypeDrag["rotasi"] = 2] = "rotasi";
        TypeDrag[TypeDrag["remoteDrag"] = 3] = "remoteDrag";
        TypeDrag[TypeDrag["remoteRotation"] = 4] = "remoteRotation";
    })(TypeDrag || (TypeDrag = {}));
    //Sprite interactivity
    class ImgIntHandler {
        init() {
            Basik.Event.addEventListener(Basik.Evt.MOUSE_DOWN, () => {
                // this.down();
                this.inputDown({
                    x: Basik.Input.global.x,
                    y: Basik.Input.global.y
                }, Basik.Input.global.id);
            });
            Basik.Event.addEventListener(Basik.Evt.MOUSE_MOVE, () => {
                this.inputMove({
                    x: Basik.Input.global.x,
                    y: Basik.Input.global.y
                }, Basik.Input.global.id);
            });
            Basik.Event.addEventListener(Basik.Evt.MOUSE_UP, () => {
                console.log("clear image mouse status");
                Basik.Ip.daftar.forEach((img) => {
                    img.down = false;
                    img.dragged = false;
                });
            });
        }
        down(img, posCanvas, id) {
            let posAbs = {
                x: posCanvas.x - Basik.Camera.x,
                y: posCanvas.y - Basik.Camera.y
            };
            img.down = true;
            img.drgStartX = posAbs.x - img.x;
            img.drgStartY = posAbs.y - img.y;
            img.inputId = id;
            img.sudutTekanAwal = Basik.Tf.sudut(posAbs.x - img.x, posAbs.y - img.y);
            img.sudutAwal = img.rotation;
        }
        //TODO: call event
        inputDown(posCanvas, id) {
            console.group('input down');
            let posAbs = {
                x: posCanvas.x - Basik.Camera.x,
                y: posCanvas.y - Basik.Camera.y
            };
            let lastIdx = -1;
            let lastSprite = null;
            for (let i = Basik.Ip.daftar.length - 1; i >= 0; i--) {
                let img;
                img = Basik.Ip.daftar[i];
                if (Basik.Ip.dotInsideImage(img, img.x, img.y, posAbs.x, posAbs.y)) {
                    if (img.ctrIdx > lastIdx) {
                        lastIdx = img.ctrIdx;
                        lastSprite = img;
                    }
                }
                else {
                    //remote drag
                    if (img.tipeDrag == 3 || img.tipeDrag == 4) {
                        this.down(img, posCanvas, id);
                    }
                }
            }
            //
            if (lastSprite) {
                console.log("img pressed, id: " + id);
                this.down(lastSprite, posCanvas, id);
            }
            else {
                console.log("no image pressed");
            }
            //
            console.groupEnd();
        }
        inputMove(posCanvas, inputId) {
            let posAbs = {
                x: posCanvas.x - Basik.Camera.x,
                y: posCanvas.y - Basik.Camera.y
            };
            Basik.Ip.daftar.forEach((img) => {
                if (img.down && (img.tipeDrag != 0) && (img.inputId == inputId)) {
                    img.dragged = true;
                    if (img.tipeDrag == TypeDrag.drag || (img.tipeDrag == TypeDrag.remoteDrag)) {
                        img.x = posAbs.x - img.drgStartX;
                        img.y = posAbs.y - img.drgStartY;
                        console.debug('item drag move');
                    }
                    else if (img.tipeDrag == TypeDrag.rotasi || (img.tipeDrag == TypeDrag.remoteRotation)) {
                        let sudut2 = Basik.Tf.sudut(posAbs.x - img.x, posAbs.y - img.y);
                        let perbedaan = sudut2 - img.sudutTekanAwal;
                        img.rotation = img.sudutAwal + perbedaan;
                    }
                    else {
                    }
                }
            });
        }
    }
    Basik.sprInt = new ImgIntHandler();
})(Basik || (Basik = {}));
