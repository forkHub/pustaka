"use strict";
const fileInput = document.getElementById("fileInput");
const hasilCont = document.createElement('div');
hasilCont.classList.add('border');
document.body.appendChild(hasilCont);
let lastPixel = {
    x: 0,
    y: 0,
    rgb: {
        r: 0,
        g: 0,
        b: 0,
        a: 0
    }
};
fileInput.addEventListener("change", (e) => {
    const target = e.target;
    const file = target.files?.[0];
    if (!file)
        return;
    const img = new Image();
    img.onload = () => {
        console.log("img on load");
        let canvasDoc = document.createElement('canvas');
        hasilCont.innerHTML = '';
        canvasDoc.width = img.width;
        canvasDoc.height = img.height;
        canvasDoc.getContext('2d').drawImage(img, 0, 0);
        createWrap(canvasDoc, hasilCont);
        editUlang(1, canvasDoc, hasilCont);
    };
    img.src = URL.createObjectURL(file);
});
function log(msg) {
    let p = document.createElement('p');
    p.innerText = msg;
    document.body.appendChild(p);
    console.log(msg);
}
async function delay() {
    // console.log("delay");
    await new Promise(resolve => requestAnimationFrame(resolve));
}
async function editUlang(n, canvasDoc, cont) {
    console.log("edit ulang");
    let wrap = document.createElement('div');
    wrap.classList.add('border');
    cont.appendChild(wrap);
    let p = document.createElement('p');
    wrap.appendChild(p);
    await delay();
    for (let i = 0; i < n; i++) {
        // p.innerText = 'Perulangan: ' + (i + 1);
        log("process 1/4");
        await edit(canvasDoc, 0, wrap);
        await delay();
        log("process 2/4");
        await edit(canvasDoc, 1, wrap);
        await delay();
        log("process 3/4");
        await edit(canvasDoc, 2, wrap);
        await delay();
        log("process 4/4");
        await edit(canvasDoc, 3, wrap);
    }
}
function createWrap(canvas, cont) {
    let div = document.createElement('div');
    div.appendChild(canvas);
    div.classList.add('border');
    cont.appendChild(div);
    return div;
}
async function edit(canvasSrc, mode, cont) {
    const canvas2 = document.createElement('canvas');
    console.log("edit");
    createWrap(canvas2, cont);
    canvas2.width = Math.ceil(canvasSrc.width / 2);
    canvas2.height = Math.ceil(canvasSrc.height / 2);
    const processJ = async (i) => {
        for (let j = 0; j < canvasSrc.height; j += 2) {
            let p = getPixelEx(i, j, canvasSrc);
            if (mode == 1) {
                let px = findMostBlack(p);
                drawFilledRect(canvas2.getContext('2d'), i / 2, j / 2, 1, 1, px.rgb.r, px.rgb.g, px.rgb.b);
            }
            else if (mode == 2) {
                let px = findMostWhite(p);
                drawFilledRect(canvas2.getContext('2d'), i / 2, j / 2, 1, 1, px.rgb.r, px.rgb.g, px.rgb.b);
            }
            else if (mode == 3) {
                let px = averageRGBA(p);
                drawFilledRect(canvas2.getContext('2d'), i / 2, j / 2, 1, 1, px.rgb.r, px.rgb.g, px.rgb.b);
            }
        }
    };
    if (mode == 0) {
        canvas2.getContext('2d').drawImage(canvasSrc, 0, 0, canvas2.width, canvas2.height);
        return canvas2;
    }
    for (let i = 0; i < canvasSrc.width; i += 2) {
        await delay();
        await processJ(i);
    }
    return canvas2;
}
