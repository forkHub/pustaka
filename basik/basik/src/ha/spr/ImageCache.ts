namespace Basik {
	export class ImageCache {
		static readonly list: ImageCache[] = [];

		private _url!: string;
		private _img!: HTMLImageElement;
		private _error = false;
		private _loaded = false;

		readonly loadListeners: ((img: HTMLImageElement) => void)[] = [];
		readonly errorListeners: ((err: Event) => void)[] = [];

		public get url(): string {
			return this._url;
		}
		public get img(): HTMLImageElement {
			return this._img;
		}
		public get error(): boolean {
			return this._error;
		}
		public get loaded(): boolean {
			return this._loaded;
		}

		static get(
			url: string,
			onLoad: (img: HTMLImageElement) => void,
			onError: (err: Event) => void
		) {
			// 🔎 cek cache
			for (const i of ImageCache.list) {
				if (i.url === url) {
					if (i.loaded) {
						onLoad(i.img);
						return;
					}
					if (i.error) {
						onError(new Event("error"));
						return;
					}
					i.loadListeners.push(onLoad);
					i.errorListeners.push(onError);
					return;
				}
			}

			// 🆕 buat baru
			const img = new Image();
			const c = new ImageCache();
			c._url = url;
			c._img = img;
			c.loadListeners.push(onLoad);
			c.errorListeners.push(onError);

			ImageCache.list.push(c);

			img.onload = () => {
				if (c._error || c._loaded) return; // guard				
				c._loaded = true;
				c.loadListeners.forEach(f => f(img));
				c.loadListeners.length = 0;
			};

			img.onerror = (err) => {
				if (c._error || c._loaded) return; // guard				
				c._error = true;
				c.errorListeners.forEach(f => f(err as Event));
				c.errorListeners.length = 0;
			};

			img.src = url;
		}

		// 🧹 hapus cache untuk URL tertentu
		static clear(url: string) {
			const idx = ImageCache.list.findIndex(i => i.url === url);
			if (idx >= 0) {
				ImageCache.list.splice(idx, 1);
			}
		}

		// 🧹 hapus semua cache
		static clearAll() {
			ImageCache.list.length = 0;
		}
	}
}