class Hagl {
	private gl: WebGLRenderingContext;
	private shader: WebGLShader;
	private fragment: WebGLShader;
	private program: WebGLProgram;
	private dev: boolean = false;

	private locationUniformAlpha: WebGLUniformLocation;
	private locationResolution: WebGLUniformLocation;
	private locationMove: WebGLUniformLocation;
	private locationScale: WebGLUniformLocation;
	private locationRotation: WebGLUniformLocation;
	private locationOffset: WebGLUniformLocation;
	private locationAttrPosition: number;
	private locationAttrUV: number;

	private shaderVertek: string = ``;		//TODO
	private shaderFragment: string = ``;	//TODO:
	private canvas: HTMLCanvasElement;

	private prevUVCoordObj: KotakObj;
	private prevObjPos: KotakObj;
	private listObjPos: KotakObj[] = [];
	private listUV: UVObj[] = [];
	private prevUVObj: UVObj;

	private readonly ANGLE2RAD: number = Math.PI / 180.0;

	constructor(canvas: HTMLCanvasElement) {
		this.canvas = canvas;
		this.log('ha-gl')

		this.shaderVertek = `
			attribute vec2 a_position;
			attribute vec2 a_texCoord;

			varying vec2 v_texCoord;

			uniform vec2 u_resolution;
			uniform vec2 u_move;
			uniform vec2 u_scale;
			uniform vec2 u_rotation;
			uniform vec2 u_offset;

			void main() {
				//offset
				vec2 position = a_position - u_offset; 

				//scale
				position = position * u_scale; 

				//
				position = vec2(
					position.x * u_rotation.y + position.y * u_rotation.x,
					position.y * u_rotation.y - position.x * u_rotation.x
				);

				//geser
				position = position + u_move;

				// convert the position from pixels to 0.0 to 1.0
				vec2 zeroToOne = position / u_resolution;
				
				// convert from 0->1 to 0->2
				vec2 zeroToTwo = zeroToOne * 2.0;

				// convert from 0->2 to -1->+1 (clip space)
				vec2 clipSpace = zeroToTwo - 1.0;

				gl_Position = vec4(clipSpace * vec2(1 ,-1),0,1);
				v_texCoord = a_texCoord;
			}
		`;
		this.shaderFragment = `
			precision mediump float;
				
			uniform float u_alpha;
			uniform sampler2D u_image;
			varying vec2 v_texCoord;

			void main() {
				gl_FragColor = texture2D(u_image, v_texCoord);

				if (u_alpha < 1.0) {
					gl_FragColor.a *= u_alpha;
				}
			}		
		`;
		this.init(canvas);
	}

	private checkBoxRepetition(src: KotakObj, u1: number, v1: number, u2: number, v2: number): boolean {
		if (src.u1 != u1) return false;
		if (src.v1 != v1) return false;
		if (src.u2 != u2) return false;
		if (src.v2 != v2) return false;
		return true;
	}

	private checkObjPosRepetition(p: number, l: number): boolean {
		if (!this.prevObjPos) return false;
		if (!this.checkBoxRepetition(this.prevObjPos, 0, 0, p, l)) return false;
		return true;
	}

	private log(msg: string, mode: number = 1): void {
		if (!this.dev) return;

		if (1 == mode) {
			console.log(msg);
		}
		else if (2 == mode) {
			console.group();
		}
		else if (3 == mode) {
			console.groupEnd();
		}
	}

	private getObjPosFromPool(p: number, l: number): KotakObj {
		let result: KotakObj;

		this.listObjPos.forEach((item: KotakObj) => {
			if (this.checkBoxRepetition(item, 0, 0, p, l)) {
				result = item;
			}

		});

		if (!result) {
			this.log('buat buffer posisi');
			result = {
				buff: this.createRectBuffer(p, l),
				u1: 0,
				v1: 0,
				u2: p,
				v2: l
			}
			this.listObjPos.push(result);
		}

		this.prevObjPos = result;
		return result;
	}

	private checkTexRepetition(img: HTMLImageElement): boolean {
		if (!this.prevUVObj) return false;
		if (this.prevUVObj.img != img) return false;
		return true;
	}

	private getUVObj(img: HTMLImageElement): UVObj {
		let result: UVObj;

		this.listUV.forEach((item: UVObj) => {
			if (item.img == img) {
				result = item;
			}
		})

		if (!result) {
			this.log('buat tex baru');
			result = {
				img: img,
				tex: this.createTexture(img)
			}
			this.listUV.push(result);
		}

		return result;
	}

	private checkUVKoordObjRepetition(u1: number, v1: number, u2: number, v2: number): boolean {
		if (!this.prevUVCoordObj) return false;
		if (!this.checkBoxRepetition(this.prevUVCoordObj, u1, v1, u2, v2)) return false;
		return true;
	}

	private getUVBoxFromPool(u1: number, v1: number, u2: number, v2: number): KotakObj {
		let result: KotakObj;

		this.listObjPos.forEach((item: KotakObj) => {
			if (this.checkBoxRepetition(item, u1, v1, u2, v2)) {
				result = item;
			}
		});

		if (!result) {
			this.log('buat uv baru');
			result = {
				buff: this.createUVCoordBuffer(this.createUV(
					u1,
					v1,
					u2,
					v2
				)),
				u1: u1,
				v1: v1,
				u2: u2,
				v2: v2
			}
			this.listObjPos.push(result);
		}
		else {
		}

		this.prevUVCoordObj = result;
		return result;
	}

	clear(): void {
		this.gl.viewport(0, 0, this.gl.canvas.width, this.gl.canvas.height);
		this.gl.clear(this.gl.COLOR_BUFFER_BIT);
	}

	private createBox(p: number, l: number): Kotak {
		return {
			p1: {
				x: 0,
				y: 0
			},
			p2: {
				x: p,
				y: 0
			},
			p3: {
				x: 0,
				y: l
			},
			p4: {
				x: p,
				y: l
			}
		}

	}

	private defaultOpt(img: HTMLImageElement, p: Setting): void {
		p.alpha = p.alpha || 1;
		p.offsetX = p.offsetX || 0;
		p.offsetY = p.offsetY || 0;
		p.rotation = p.rotation || 0;
		p.scaleX = p.scaleX || 1;
		p.scaleY = p.scaleY || 1;
		p.texU1 = p.texU1 || 0;
		p.texV1 = p.texV1 || 0;
		p.texU2 = p.texU2 || img.width;
		p.texV2 = p.texV2 || img.height;

		p.texU1 /= img.width;
		p.texV1 /= img.height;
		p.texU2 /= img.width;
		p.texV2 /= img.height;
	}

	private createRectBuffer(p: number, l: number): WebGLBuffer {
		let buff: WebGLBuffer = this.gl.createBuffer();
		this.gl.bindBuffer(this.gl.ARRAY_BUFFER, buff);

		let box: Kotak = this.createBox(p, l);

		let positions = [
			box.p1.x, box.p1.y,		//kiri atas
			box.p2.x, box.p2.y,		//kanan atas
			box.p3.x, box.p3.y,		//kiri bawah

			box.p3.x, box.p3.y,		//kiri bawah
			box.p2.x, box.p2.y,		//kanan atas
			box.p4.x, box.p4.y		//kanan bawah
		];

		this.gl.bufferData(this.gl.ARRAY_BUFFER, new Float32Array(positions), this.gl.STATIC_DRAW);

		return buff;
	}

	private power2(gbr: HTMLImageElement): boolean {
		if (gbr.width != gbr.height) return false;
		if ([0, 2, 4, 8, 16, 32, 64, 128, 256, 512, 1024, 2048, 4096].indexOf(gbr.width) > -1) return true;

		return false;
	}

	private createTexture(img: HTMLImageElement): WebGLTexture {
		let tex: WebGLTexture = this.gl.createTexture();
		this.gl.bindTexture(this.gl.TEXTURE_2D, tex);

		if (!this.power2(img)) {
			this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_WRAP_S, this.gl.CLAMP_TO_EDGE);
			this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_WRAP_T, this.gl.CLAMP_TO_EDGE);
		}

		this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_MIN_FILTER, this.gl.NEAREST);
		this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_MAG_FILTER, this.gl.NEAREST);
		this.gl.bindTexture(this.gl.TEXTURE_2D, tex);

		this.gl.texImage2D(this.gl.TEXTURE_2D, 0, this.gl.RGBA, this.gl.RGBA, this.gl.UNSIGNED_BYTE, img);
		return tex;
	}

	private createUV(u1: number, v1: number, u2: number, v2: number): number[] {
		return [
			u1, v1,	//kiri atas		|---
			u2, v1,	//kanan atas    | /
			u1, v2,	//kiri bawah	|/

			u1, v2,	//kiri bawah    /|
			u2, v1,	//kanan atas   / |
			u2, v2	//kanan bawah /__|
		]
	}

	// private bindUVKoordBuffer(lokasi: number, buff: WebGLBuffer): void {
	// 	this.gl.bindBuffer(this.gl.ARRAY_BUFFER, buff);
	// 	this.gl.enableVertexAttribArray(this.lokasiAttrUV);
	// 	this.gl.vertexAttribPointer(lokasi, 2, this.gl.FLOAT, false, 0, 0);
	// }

	// private bindPosisiBuffer(lokasi: number, buff: WebGLBuffer): void {
	// 	this.gl.bindBuffer(this.gl.ARRAY_BUFFER, buff);
	// 	this.gl.enableVertexAttribArray(this.lokasiAttrPosisi);
	// 	this.gl.vertexAttribPointer(lokasi, 2, this.gl.FLOAT, false, 0, 0);
	// }

	private bindBuffer(lokasi: number, buff: WebGLBuffer): void {
		this.gl.bindBuffer(this.gl.ARRAY_BUFFER, buff);
		this.gl.enableVertexAttribArray(lokasi);
		this.gl.vertexAttribPointer(lokasi, 2, this.gl.FLOAT, false, 0, 0);
	}

	private createUVCoordBuffer(data: number[]): WebGLBuffer {
		let buff: WebGLBuffer = this.gl.createBuffer();

		this.gl.bindBuffer(this.gl.ARRAY_BUFFER, buff);
		this.gl.bufferData(this.gl.ARRAY_BUFFER, new Float32Array(data), this.gl.STATIC_DRAW);

		return buff;
	}

	drawImage(image: HTMLImageElement, x: number, y: number, opt: Setting = {}): void {

		this.defaultOpt(image, opt);

		//check posisi berulang
		if (!this.checkObjPosRepetition(image.width, image.height)) {
			this.prevObjPos = this.getObjPosFromPool(image.width, image.height);
			this.bindBuffer(this.locationAttrPosition, this.prevObjPos.buff);
		}

		//check uv koordinat berulang
		if (!this.checkUVKoordObjRepetition(opt.texU1, opt.texV1, opt.texU2, opt.texV2)) {
			this.prevUVCoordObj = this.getUVBoxFromPool(opt.texU1, opt.texV1, opt.texU2, opt.texV2);
			this.bindBuffer(this.locationAttrUV, this.prevUVCoordObj.buff);
		}

		//check texture berulang
		if (!this.checkTexRepetition(image)) {
			this.prevUVObj = this.getUVObj(image);
			this.gl.bindTexture(this.gl.TEXTURE_2D, this.prevUVObj.tex);
		}

		this.gl.uniform1f(this.locationUniformAlpha, opt.alpha);
		this.gl.uniform2f(this.locationResolution, this.canvas.width, this.canvas.height);
		this.gl.uniform2f(this.locationMove, x, y);
		this.gl.uniform2f(this.locationScale, opt.scaleX, opt.scaleY);
		this.gl.uniform2f(this.locationRotation, Math.sin(opt.rotation * this.ANGLE2RAD), Math.cos(opt.rotation * this.ANGLE2RAD));
		this.gl.uniform2f(this.locationOffset, opt.offsetX, opt.offsetY);

		this.gl.drawArrays(this.gl.TRIANGLES, 0, 6);

	}

	private init(canvas: HTMLCanvasElement): void {
		this.gl = canvas.getContext('webgl');
		if (!this.gl) {
			throw new Error();
		}

		this.gl.enable(this.gl.BLEND);
		this.gl.blendFunc(this.gl.SRC_ALPHA, this.gl.ONE_MINUS_SRC_ALPHA);

		this.shader = this.createShader(this.gl, this.gl.VERTEX_SHADER, this.shaderVertek);
		this.fragment = this.createShader(this.gl, this.gl.FRAGMENT_SHADER, this.shaderFragment);
		this.program = this.createProgram(this.gl, this.shader, this.fragment);

		this.locationAttrPosition = this.gl.getAttribLocation(this.program, 'a_position');
		this.locationUniformAlpha = this.gl.getUniformLocation(this.program, 'u_alpha');
		this.locationAttrUV = this.gl.getAttribLocation(this.program, "a_texCoord");
		this.locationResolution = this.gl.getUniformLocation(this.program, "u_resolution");
		this.locationMove = this.gl.getUniformLocation(this.program, "u_move");
		this.locationScale = this.gl.getUniformLocation(this.program, "u_scale");
		this.locationRotation = this.gl.getUniformLocation(this.program, "u_rotation");
		this.locationOffset = this.gl.getUniformLocation(this.program, "u_offset");

		this.gl.useProgram(this.program);
	}

	private createProgram(gl: WebGLRenderingContext, vshader: WebGLShader, fshader: WebGLShader): WebGLProgram {
		let program: WebGLProgram = gl.createProgram();
		gl.attachShader(program, vshader);
		gl.attachShader(program, fshader);
		gl.linkProgram(program);

		let success = gl.getProgramParameter(program, gl.LINK_STATUS);

		if (!success) {
			gl.deleteProgram(program);
			throw new Error('');
		}

		return program;
	}

	private createShader(gl: WebGLRenderingContext, type: number, source: string): any {
		let shader: WebGLShader = gl.createShader(type);

		gl.shaderSource(shader, source);
		gl.compileShader(shader);

		let success: any = gl.getShaderParameter(shader, gl.COMPILE_STATUS);

		if (success) {
			return shader;
		}

		gl.deleteShader(shader);
		throw new Error('');
	}
}

interface listTex {
	img: HTMLImageElement,
	tex: WebGLTexture,
	buff: WebGLBuffer,
	uv: WebGLBuffer,
	u1: number,
	v1: number,
	u2: number,
	v2: number
}

interface v2D {
	x: number,
	y: number
}

interface Kotak {
	p1: v2D,
	p2: v2D,
	p3: v2D,
	p4: v2D
}

interface Setting {
	offsetX?: number,
	offsetY?: number,
	scaleX?: number,
	scaleY?: number,
	rotation?: number,
	alpha?: number,
	texU1?: number,
	texV1?: number,
	texU2?: number,
	texV2?: number
}

interface KotakObj {
	buff: WebGLBuffer;
	u1: number,
	v1: number,
	u2: number,
	v2: number
}

interface UVObj {
	img: HTMLImageElement;
	tex: WebGLTexture;
}