declare var acorn: { parse: (arg0: string, arg1: { ecmaVersion: number; sourceType: string; }) => any; };

// Define a reusable AST node type
interface ASTNode {
	type: string;
	declarations?: {
		id?: { name: string };
		init?: { type: string };
	}[];
	id?: { name: string };
	left?: { type: string; name: string };
	right?: { type: string };
	key?: { name: string };
	hasOwnProperty: (prop: string) => boolean;
	[key: string]: any; // catch-all for other properties
}

interface VariableDeclarator {
	id?: { name: string };
	init?: { type: string };
}

class Accorn {
	readonly rword: string[] = []

	readonly rEvt: string[] = [
		//event
		"update",

		//umum
		"mulai",
		"warnaGaris",
		"tebalGaris",

		//gambar
		"muatGambar",
		"muatAnimasi",
		"stempel",
		"gambarTabrakan",
		"poinDidalamGambar",
		"semuaGambarSelesaiDimuat",
		"hapusGAmbar",
		"posisiGambar",
		"ukuranGambar",
		"pusatGambar",
		"geserGambar",
		"putarGambar",

		//input
		"mouseDitahan",
		"mouseDidrag",
		"mouseDragX",
		"mouseDragY",
		"mouseX",
		"mouseY",
		"mouseDragAwalX",
		"mouseDragAwalY",
		"mouseGerakX",
		"mouseGerakY",

		//matematika
		"akar",
		"pi",
		"jarak",
		"jarakSudut",
		"sudut",
		"polarX",
		"polarY",
		"abs",
		"normalisasiSudut",
		"pembulatan",

		//font
		"posisiTeks",
		"tulis",
		"fontTeks",
		"ukuranTeks",
		"perataanTeks",

		//shape
		"bukaPath",
		"garisKe",
		"kurvaKe",
		"lingkaranKe",
		"tutupPath",
		"lingkaran",
		"elips",
		"kotak",
		"pie",
		"garis",
		"polygonTeratur",
		"gambarBintang",
		"gambarSegitiga"
	]

	constructor() {
		this.rEvt.forEach((item) => {
			this.rword.push(item);
		})
	}

	checkVar(): void {
		// let vars, funcs = this.walk();

	}

	parse(code: string): {
		varErr: string[],
		funErr: { v: string, b: string }[],
		callErr: { v: string, b: string }[]
	} {

		let varErr: string[] = [];
		// let funErr: string[] = [];
		let funErr: { v: string, b: string }[] = []
		let callErr: { v: string, b: string }[] = []

		try {
			let ast: ASTNode = acorn.parse(code, { ecmaVersion: 2020, sourceType: 'module' });
			let { variables, functions, calls } = this.walk(ast);

			console.log("ast: ", ast);
			console.log("code: ", code);
			console.log("variables: ", variables);
			console.log("functions: ", functions);

			variables.forEach((v) => {
				this.rword.forEach((w) => {
					if (v === w) {
						varErr.push(v);
					}
				})
			})

			calls.forEach((f) => {
				this.rEvt.forEach((e) => {
					if (f.toLowerCase() === e.toLocaleLowerCase()) {
						if (f !== e) {
							callErr.push({
								v: f,
								b: e
							});
						}
					}
				});
			})

			functions.forEach((f) => {
				this.rEvt.forEach((e) => {
					if (f.toLowerCase() === e.toLocaleLowerCase()) {
						if (f !== e) {
							funErr.push({
								v: f,
								b: e
							});
						}
					}
				});
			})
		}
		catch (e) {
			console.log(e);
		}

		console.log({ varErr, funErr, callErr });
		return { varErr, funErr, callErr }
	}

	walk(node: ASTNode, parent: ASTNode | any = null): { variables: string[], functions: string[], calls: string[] } {
		const variables: string[] = [];
		const functions: string[] = [];
		const calls: string[] = [];

		parent;

		if (!node || typeof node !== 'object') {
			return { variables, functions, calls };
		}

		// 1. Process current node
		switch (node.type) {
			case 'VariableDeclaration':
				node.declarations?.forEach((decl: VariableDeclarator) => {
					if (decl.id && decl.id.name) {
						const isFunctionExpr = decl.init && (
							decl.init.type === 'FunctionExpression' ||
							decl.init.type === 'ArrowFunctionExpression'
						);

						if (isFunctionExpr) {
							functions.push(decl.id.name);
						} else {
							variables.push(decl.id.name);
						}
					}
				});
				break;

			case 'FunctionDeclaration':
				if (node.id && node.id.name) {
					functions.push(node.id.name);
				}
				break;

			case 'AssignmentExpression':
				if (node.left?.type === 'Identifier' &&
					(node.right?.type === 'FunctionExpression' || node.right?.type === 'ArrowFunctionExpression')) {
					functions.push(node.left.name);
				}
				break;

			case 'ClassDeclaration':
				if (node.id && node.id.name) {
					functions.push(node.id.name);
				}
				break;

			case 'MethodDefinition':
				if (node.key && node.key.name) {
					functions.push(node.key.name);
				}
				break;

			case 'CallExpression':
				if (node.callee && node.callee.name) {
					calls.push(node.callee.name);
				}
				else {
					console.warn("invalid CallExpression", node);
				}
				//TODO:
				break;

			default:
				console.warn("undefined type ", node.type);
		}

		// Keys to skip during traversal to avoid redundant processing or circular structure loops
		const ignoredKeys = new Set(['loc', 'range', 'comments', 'tokens', 'parent']);

		// 2. Traverse children and collect recursive results
		for (const key of Object.keys(node)) {
			if (ignoredKeys.has(key)) continue;

			const child = (node as any)[key];

			if (Array.isArray(child)) {
				child.forEach(c => {
					if (c && typeof c.type === 'string') {
						const childResult = this.walk(c, node);
						variables.push(...childResult.variables);
						functions.push(...childResult.functions);
						calls.push(...childResult.calls);
					}
				});
			} else if (child && typeof child.type === 'string') {
				const childResult = this.walk(child, node);
				variables.push(...childResult.variables);
				functions.push(...childResult.functions);
				calls.push(...childResult.calls);
			}
		}

		return { variables, functions, calls };
	}


}

var acornParser = new Accorn();
