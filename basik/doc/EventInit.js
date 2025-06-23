"use strict";
///<reference path="Route.ts"/>
//init event listener
//should be positioned last in the lib
AddEventListener(Basik.Evt.KEYB_DOWN, () => {
    let f = window["KeybDownEvent"];
    if (typeof f == "function") {
        f();
    }
});
AddEventListener(Basik.Evt.KEYB_UP, () => {
    let f = window["KeybUpEvent"];
    if (typeof f == "function") {
        f();
    }
});
AddEventListener(Basik.Evt.MOUSE_DOWN, () => {
    let f = window["MouseDownEvent"];
    if (typeof f == "function") {
        f();
    }
});
AddEventListener(Basik.Evt.MOUSE_UP, () => {
    let f = window["MouseUpEvent"];
    if (typeof f == "function") {
        f();
    }
});
AddEventListener(Basik.Evt.MOUSE_TAP, () => {
    let f = window["MouseTapEvent"];
    if (typeof f == "function") {
        f();
    }
});
AddEventListener(Basik.Evt.MOUSE_MOVE, () => {
    let f = window["MouseMoveEvent"];
    if (typeof f == "function") {
        f();
    }
});
AddEventListener(Basik.Evt.MOUSE_START_DRAG, () => {
    let f = window["MouseStartDragEvent"];
    if (typeof f == "function") {
        f();
    }
});
AddEventListener(Basik.Evt.MOUSE_END_DRAG, () => {
    let f = window["MouseEndDragEvent"];
    if (typeof f == "function") {
        f();
    }
});
