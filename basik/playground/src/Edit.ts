class Edit {
	protected myCodeMirror: any;
	protected editArea: HTMLTextAreaElement = document.querySelector('textarea.edit-area') as HTMLTextAreaElement;
	protected webCont: HTMLDivElement = document.querySelector('div.kontainer-2 div.web') as HTMLDivElement;
	protected editCont: HTMLDivElement = document.querySelector('div.kontainer-2 div.edit-text') as HTMLDivElement;
	protected fileInfo: HTMLSpanElement;

	protected tblEditGroup = ["simpan", "muat", "jalan", "baru"];
	protected tblJalanGroup = ["edit",];

	injectScript(src: string, f: () => void) {
		console.group('inject script');
		console.log('src:', src);
		let script = document.createElement('script');
		script.onload = f;
		script.src = src;
		document.head.appendChild(script);
		console.groupEnd();
	}

	getTbl(nama: string): HTMLButtonElement {
		return document.querySelector(`button.${nama}`) as HTMLButtonElement;
	}

	showTbl(tbl: HTMLButtonElement | string[] | string): void {
		if (Array.isArray(tbl)) {
			tbl.forEach((item) => {
				this.showTbl(item);
			})
		}
		else if (typeof tbl === "string") {
			this.showTbl(this.getTbl(tbl));
		}
		else {
			tbl.classList.add('disp-inline');
			tbl.classList.remove('disp-none');
		}
	}

	hideTbl(tbl: HTMLButtonElement | string[] | string): void {
		if (Array.isArray(tbl)) {
			tbl.forEach((item) => {
				this.hideTbl(item);
			})
		}
		else if (typeof tbl == "string") {
			this.hideTbl(this.getTbl(tbl));
		}
		else {
			tbl.classList.remove('active');
			tbl.classList.remove('disp-inline');
			tbl.classList.add('disp-none');
		}
	}

	getQuery(key: string): string {
		let q = '';
		let h = '';

		console.groupCollapsed('get query: ' + key);

		q = window.top.location.search;
		console.log(q);

		q = q.slice(1, q.length);
		console.log(q);

		let qAr = q.split("&");
		console.log(qAr);

		qAr.forEach((item) => {
			let keyAr = item.split('=');
			let pKey = keyAr[0];
			if (pKey == key) {
				h = keyAr[1];
			}
		})
		console.log('res: ' + h);
		console.groupEnd();

		return h;
	}

	initCodeMirror(code: string = '') {
		console.log("init code mirror");
		this.myCodeMirror = CodeMirror.fromTextArea(this.editArea, {
			lineNumbers: true,
			mode: "javascript",
			gutters: ["CodeMirror-lint-markers"],
			lint: false,
			init: code
		});

		this.myCodeMirror.setValue(code);

		this.myCodeMirror.on("change", () => {
			this.updateNama();
		});
	}

	checkFileUpdated(): boolean {
		let data = this.myCodeMirror.getValue();
		let fData = fileAktif.data;

		return (data != fData);
	}

	updateNama(): void {
		if (this.checkFileUpdated()) {
			this.fileInfo.innerText = fileNama + "(*)";
		}
		else {
			this.fileInfo.innerText = fileNama;
		}
	}

	checkJsHint(): ErrorItem[] {
		try {
			if (!JSHINT) return [];

			JSHINT(
				'/* jshint esversion: 6 */\n' +
				this.myCodeMirror.getValue()
			);
			console.log(JSHINT.errors);
			let err: ErrorItem[] = [];
			JSHINT.errors.forEach((item: any) => {
				err.push({
					line: item.line - 1,
					message: item.reason
				})
			});

			return err;
		}
		catch (e) {
			console.warn(e);
			return [];
		}

	}

	muatFileAwal() {
		console.groupCollapsed("muat file awal:");
		try {
			let s = window.localStorage.getItem(storageNama);
			fileList = JSON.parse(s);
			if (!fileList) fileList = [];
			console.log(fileList);
		}
		catch (e) {
			console.warn(e);
			fileList = [];
		}
		console.groupEnd();
	}

	reload() {
		try {
			// Get the current URL without query parameters and hash
			const cleanUrl = window.location.origin + window.location.pathname;

			// Replace the current history entry without reloading
			window.history.replaceState({}, document.title, cleanUrl);

			// Reload the page without query parameters
		} catch (error) {
			console.error("Failed to reload without query parameters:", error);
		}
	}

	runOk(): void {
		let hal2: string = renderIframe(this.myCodeMirror.getValue());
		let iframe: HTMLIFrameElement = document.createElement('iframe') as HTMLIFrameElement;
		let iframeCont: HTMLDivElement = document.body.querySelector('div.kontainer-2 div.web') as HTMLDivElement;

		iframeCont.innerHTML = '';
		iframeCont.appendChild(iframe);

		console.groupCollapsed("compile");
		console.log(hal2);
		console.groupEnd();

		setTimeout(() => {
			iframe.contentWindow.document.open();
			iframe.contentWindow.document.write(hal2);
			iframe.contentWindow.document.close();
			iframe.focus();
		}, 0);
	}
}