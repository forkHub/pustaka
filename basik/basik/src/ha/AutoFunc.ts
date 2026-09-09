namespace Basik {
	export class Auto {
		// Gunakan Set agar lookup O(1)
		private readonly daftar: Set<string> = new Set([
			"update"
		]);

		init(): void {
			const ls = this.daftarFungsi();

			for (const nama of ls) {
				const namaLower = nama.toLowerCase();

				// Cek apakah versi lowercase ada di daftar, tapi nama aslinya tidak sama persis
				if (this.daftar.has(namaLower) && nama !== namaLower) {
					// TODO: alert / warning
					console.warn(`Perbedaan casing ditemukan: '${nama}' seharusnya '${namaLower}'. Penanganan Event mungkin tidak akan berjalan.`);
				}
			}
		}

		daftarFungsi(): string[] {
			// Mengambil semua nama properti di objek `window` yang bertipe fungsi
			return Object.getOwnPropertyNames(window)
				.filter(
					(prop) => {
						try {
							return typeof (window as any)[prop] === 'function';
						} catch (e) {
							// Menghindari error akses properti yang sensitif/dilarang browser
							return false;
						}
					}
				);
		}

	}
}