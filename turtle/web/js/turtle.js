"use strict";
window.onload = function () {
    var canvas = document.createElement('canvas');
    canvas.width = 640;
    canvas.height = 320;
    document.body.appendChild(canvas);
    var turtle = new Turtle(canvas);
    turtle.fill("#ff0000");
    circle(100, 100);
    turtle.fill("#00ff00");
    circle(150, 100);
    turtle.fill("#0000ff");
    circle(200, 100);
    function circle(x, y) {
        turtle.penDown();
        turtle.position(x, y);
        for (var i = 0; i < 18; i++) {
            turtle.turn(20);
            turtle.line(1);
        }
        turtle.penUp();
    }
};
var Turtle = /** @class */ (function () {
    function Turtle(canvas) {
        var _this = this;
        this._velX = 10;
        this._velY = 10;
        this.commandStroke = [];
        this.commandStrokeBatch = [];
        this.commandColor = [];
        this.lastX = 0;
        this.lastY = 0;
        this.updateColorCtr = 0;
        this.updateColorCtrMax = 0;
        this.angle = 0;
        this._penDown = true;
        this.resultX = 0;
        this.resultY = 0;
        this.DEG2RAD = Math.PI / 180;
        this.canvas = canvas;
        this.ctx = this.canvas.getContext('2d');
        window.requestAnimationFrame(this.update.bind(this));
        this.reset();
        this.commandStroke.push(function () {
            _this.ctx.beginPath();
        });
        this.commandStroke.push(function () {
            _this.ctx.moveTo(_this.lastX, _this.lastY);
        });
    }
    Object.defineProperty(Turtle.prototype, "velX", {
        get: function () {
            return this._velX;
        },
        set: function (value) {
            this._velX = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Turtle.prototype, "velY", {
        get: function () {
            return this._velY;
        },
        set: function (value) {
            this._velY = value;
        },
        enumerable: true,
        configurable: true
    });
    Turtle.prototype.clear = function () {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    };
    Turtle.prototype.fill = function (clr) {
        var _this = this;
        this.commandStroke.push(function () {
            _this.ctx.fillStyle = clr;
        });
        this.commandColor.push(function () {
            _this.ctx.fillStyle = clr;
        });
    };
    Turtle.prototype.rotateRelXY = function (x, y, xt, yt, deg) {
        if (x === void 0) { x = 0; }
        if (y === void 0) { y = 0; }
        if (xt === void 0) { xt = 0; }
        if (yt === void 0) { yt = 0; }
        if (deg === void 0) { deg = 0; }
        var xr = x - xt;
        var yr = y - yt;
        var x1 = 0;
        var y1 = 0;
        deg *= this.DEG2RAD;
        x1 = xr * Math.cos(deg) - yr * Math.sin(deg);
        y1 = xr * Math.sin(deg) + yr * Math.cos(deg);
        this.resultX = x1 + xt;
        this.resultY = y1 + yt;
        this.resultX;
        this.resultY;
    };
    Turtle.prototype.update = function () {
        var f = this.commandStroke.shift();
        if (f) {
            this.commandStrokeBatch.push(f);
            this.drawStrokeBatch();
            if (this._penDown == true) {
                this.ctx.fill();
                this.ctx.stroke();
            }
        }
        // if (this.commandStroke.length > 0) {
        // 	// this.drawColorBatch();
        // 	let f = this.commandStroke.shift();
        // 	if (f) {
        // 		this.commandStrokeBatch.push(f);
        // 	}
        // 	this.drawStrokeBatch();
        // } else {
        // 	// this.drawColorBatch();
        // }
        window.requestAnimationFrame(this.update.bind(this));
    };
    Turtle.prototype.penDown = function () {
        var _this = this;
        this.commandStroke.push(function () {
            if (_this._penDown == false) {
                _this._penDown = true;
                _this.ctx.beginPath();
                _this.ctx.moveTo(_this.lastX, _this.lastY);
                // console.log("pen down stroke");
            }
        });
        this.commandColor.push(function () {
            if (_this._penDown == false) {
                _this._penDown = true;
                _this.ctx.beginPath();
                _this.ctx.moveTo(_this.lastX, _this.lastY);
                // console.log("pen down color");
            }
        });
    };
    Turtle.prototype.penUp = function () {
        var _this = this;
        this.commandStroke.push(function () {
            // console.log("pen up, stroke");
            if (_this._penDown) {
                _this._penDown = false;
                _this.updateColorCtrMax++;
                _this.ctx.stroke();
                _this.ctx.fill();
                // console.group("pen up stroke 2");
            }
        });
        this.commandColor.push(function () {
            // console.log("pen up, color");
            if (_this._penDown) {
                _this._penDown = false;
                _this.ctx.stroke();
                _this.ctx.fill();
                _this.updateColorCtr++;
                // console.log('stroke and fill');
            }
        });
    };
    Turtle.prototype.reset = function () {
        this.lastX = 0;
        this.lastY = 0;
        this.angle = 0;
        this.ctx.lineWidth = 1;
        this._penDown = true;
        this.ctx.fillStyle = '#00ff00';
        this.ctx.strokeStyle = '#0000ff';
    };
    Turtle.prototype.drawColorBatch = function () {
        if (this.updateColorCtrMax <= 0)
            return;
        this.reset();
        this.updateColorCtr = 0;
        for (var i = 0; i < this.commandColor.length; i++) {
            this.commandColor[i]();
            if (this.updateColorCtr >= this.updateColorCtrMax) {
                return;
            }
        }
    };
    Turtle.prototype.drawStrokeBatch = function () {
        var _this = this;
        if (this.commandStrokeBatch.length <= 0)
            return;
        this.reset();
        this.updateColorCtrMax = 0;
        // console.group('draw stroke batch');
        this.commandStrokeBatch.forEach(function (f) {
            // console.log(f);
            _this.drawStrokeSingle(f);
        });
        // console.groupEnd();
    };
    Turtle.prototype.drawStrokeSingle = function (f) {
        if (f)
            f();
    };
    Turtle.prototype.turn = function (angle) {
        var _this = this;
        if (angle === void 0) { angle = 0; }
        this.commandStroke.push(function () {
            _this.angle += angle;
            // console.log("turn stroke", angle);
        });
        this.commandColor.push(function () {
            _this.angle += angle;
            // console.log("turn color", angle);
        });
    };
    Turtle.prototype.position = function (x, y) {
        // console.log("init command position");
        var _this = this;
        this.commandStroke.push(function () {
            _this.lastX = x;
            _this.lastY = y;
            _this.ctx.moveTo(_this.lastX, _this.lastY);
            // console.log("position stroke, last x", this.lastX + "/last y", this.lastY);
        });
        this.commandColor.push(function () {
            _this.lastX = x;
            _this.lastY = y;
            _this.ctx.moveTo(_this.lastX, _this.lastY);
            // console.log("position color, last x", this.lastX + "/last y", this.lastY);
        });
    };
    Turtle.prototype.line = function (l) {
        var _this = this;
        this._lineStroke(l);
        //coloring
        this.commandColor.push(function () {
            var angleDraw = _this.angle;
            angleDraw = angleDraw * (Math.PI / 180);
            var stepX = l * Math.cos(angleDraw) * _this._velX;
            var stepY = l * Math.sin(angleDraw) * _this._velY;
            _this.lastX += stepX;
            _this.lastY += stepY;
            _this.ctx.lineTo(_this.lastX, _this.lastY);
            // console.log("line color");
        });
    };
    Turtle.prototype.curve = function (radius, angleRot) {
        var _this = this;
        var _loop_1 = function (i) {
            this_1.commandStroke.push(function () {
                var xr = _this.lastX + radius;
                var yr = _this.lastY;
                _this.ctx.beginPath();
                _this.ctx.moveTo(_this.lastX, _this.lastY);
                _this.angle += i;
                _this.rotateRelXY(_this.lastX, _this.lastY, xr, yr, _this.angle);
                _this.lastX = _this.resultX;
                _this.lastY = _this.resultY;
                _this.ctx.lineTo(_this.lastX, _this.lastY);
                _this.ctx.stroke();
            });
        };
        var this_1 = this;
        for (var i = 0; i < angleRot; i++) {
            _loop_1(i);
        }
    };
    Turtle.prototype._lineStroke = function (repeat) {
        var _this = this;
        var stepX = 0;
        var stepY = 0;
        for (var i = 0; i < repeat; i++) {
            this.commandStroke.push(function () {
                var angleDraw = _this.angle;
                angleDraw = angleDraw * (Math.PI / 180);
                stepX = _this.velX * Math.cos(angleDraw);
                stepY = _this.velY * Math.sin(angleDraw);
                if (_this._penDown == true) {
                    // this.ctx.beginPath();
                    // this.ctx.moveTo(this.lastX, this.lastY);
                    _this.lastX += stepX;
                    _this.lastY += stepY;
                    _this.ctx.lineTo(_this.lastX, _this.lastY);
                    // this.ctx.stroke();
                    // console.log("line stroke, pendown ", this._penDown);
                }
                else {
                    _this.lastX += stepX;
                    _this.lastY += stepY;
                    _this.ctx.moveTo(_this.lastX, _this.lastY);
                    // console.log("line stroke, pendown ", this._penDown);
                }
            });
        }
    };
    return Turtle;
}());
