"use strict";
var Basik;
(function (Basik) {
    let TypeDrag;
    (function (TypeDrag) {
        TypeDrag[TypeDrag["drag"] = 1] = "drag";
        TypeDrag[TypeDrag["rotasi"] = 2] = "rotasi";
    })(TypeDrag || (TypeDrag = {}));
    //Sprite interactivity
    class SprInt {
        spriteDown(img, pos, id) {
            img.down = true;
            img.drgStartX = pos.x - img.x;
            img.drgStartY = pos.y - img.y;
            img.button = id;
            img.sudutTekanAwal = Basik.Tf.sudut(pos.x - img.x, pos.y - img.y);
            img.sudutAwal = img.rotasi;
            // console.group('sprite down event handler');
            // console.log("sudut tekan awal", s.sudutTekanAwal);
            // console.log("sudut awal", s.sudutAwal);
            // console.groupEnd();
        }
        inputDown(pos, button) {
            console.group('input down');
            let lastIdx = -1;
            let lastSprite = null;
            for (let i = Basik.Ip.daftar.length - 1; i >= 0; i--) {
                let img;
                img = Basik.Ip.daftar[i];
                if (Basik.Ip.dotInsideImage(img, img.x, img.y, pos.x, pos.y)) {
                    if (img.ctrIdx > lastIdx) {
                        lastIdx = img.ctrIdx;
                        lastSprite = img;
                    }
                }
                else {
                    if (img.tipeDrag == 3 || img.tipeDrag == 4) {
                        this.spriteDown(img, pos, button);
                    }
                }
            }
            //
            if (lastSprite) {
                this.spriteDown(lastSprite, pos, button);
            }
            //
            console.groupEnd();
        }
        inputMove(pos, button) {
            Basik.Ip.daftar.forEach((item) => {
                if (item.down && item.dragable && (item.button == button)) {
                    item.dragged = true;
                    if (item.tipeDrag == TypeDrag.drag || (item.tipeDrag == 3)) {
                        item.x = pos.x - item.drgStartX;
                        item.y = pos.y - item.drgStartY;
                        // console.debug('item drag move');
                    }
                    else if (item.tipeDrag == TypeDrag.rotasi || (item.tipeDrag == 4)) {
                        let sudut2 = Basik.Tf.sudut(pos.x - item.x, pos.y - item.y);
                        let perbedaan = sudut2 - item.sudutTekanAwal;
                        item.rotasi = item.sudutAwal + perbedaan;
                        // console.group();
                        // console.log("sudut", sudut2);
                        // console.log("beda", perbedaan);
                        // console.log("sudut tekan awal", item.sudutTekanAwal);
                        // console.log("sudut awal", item.sudutAwal);
                        // console.log("rotasi", item.rotasi);
                        // console.log("posisi", item.x, item.y);
                        // console.groupEnd();
                    }
                    else {
                    }
                }
            });
        }
    }
    Basik.sprInt = new SprInt();
})(Basik || (Basik = {}));
