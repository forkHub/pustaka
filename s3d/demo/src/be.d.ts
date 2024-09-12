/**
 * Membersihkan layar dengan warna tertentu, default hitam
 * @param merah {angka} opsional, merah, default = 0
 * @param hijau {angka} opsional, hijau,, default = 0
 * @param biru {angka} opsional, biru, default = 0
 * @param transparan {angka} opsional, transparan (0-100)
 */
declare const Bersih: (merah?: number, hijau?: number, biru?: number, transparan?: number) => void;
/**
 * Setup Blitz Edu
 * @param panjang (angka) panjang dari kanvas
 * @param lebar (angka) lebar dari kanvs
 * @param canvas (HTMLCanvasElement) referensi ke kanvas
 * @param fullScreen (boolean) apakah akan men-skala kanvas mengikuti ukuran layar/fullscreen
 * @returns
 */
declare const Grafis: (panjang?: number, lebar?: number, canvas?: HTMLCanvasElement, fullScreen?: boolean, input?: boolean) => void;
/**
 * Mengeset warna untuk dipakai pada perintah menggambar berikutnya
 * @param r (number) merah
 * @param g (number) hijau
 * @param b (number) biru
 * @param a (number) alpha (0-100)
 */
declare const Warna: (r?: number, g?: number, b?: number, a?: number) => void;
/**
 * Mengembalikan warna merah dari perintah AmbilPixel terakhir
 * @returns (number) warna merah
 */
declare const Merah: () => number;
declare const Hijau: typeof ha.be.Be.Hijau;
declare const Biru: typeof ha.be.Be.Biru;
declare const Transparan: typeof ha.be.Be.Transparan;
declare const AmbilPiksel: typeof ha.be.Img.AmbilPiksel;
declare const SetPiksel: typeof ha.be.Img.SetPiksel;
declare const Kontek: typeof ha.be.Be.Kontek;
declare const Kanvas: typeof ha.be.Be.Kanvas;
declare const Garis: typeof ha.be.Be.Garis;
declare const Kotak: typeof ha.be.Be.Kotak;
declare const Oval: typeof ha.be.Be.Oval;
declare const InputHit: typeof ha.be.Input.InputHit;
declare const InputX: typeof ha.be.Input.InputX;
declare const InputY: typeof ha.be.Input.InputY;
declare const InputDragStartX: typeof ha.be.Input.InputXAwal;
declare const InputDragStartY: typeof ha.be.Input.InputYAwal;
declare const InputDragX: typeof ha.be.Input.GeserX;
declare const InputDragY: typeof ha.be.Input.GeserY;
declare const FlushInput: typeof ha.be.Input.FlushInput;
declare const InputIsDown: typeof ha.be.Input.Pencet;
declare const InputIsDragged: typeof ha.be.Input.Geser;
declare const InputType: typeof ha.be.Input.InputType;
declare const InputTapCount: typeof ha.be.Input.JmlTap;
declare const InputStartDragCount: typeof ha.be.Input.JmlDragMulai;
declare const InputEndDragCount: typeof ha.be.Input.JmlDragSelesai;
declare const Sudut: typeof ha.be.Mat.Sudut;
declare const Muat: typeof ha.be.Spr.Muat;
declare const MuatAsync: typeof ha.be.Spr.MuatAsync;
declare const Dimuat: typeof ha.be.Spr.Dimuat;
declare const MuatAnimasi: typeof ha.be.Spr.MuatAnimasi;
declare const StatusMuat: typeof ha.be.Spr.StatusMuat;
declare const Posisi: typeof ha.be.Spr.Posisi;
declare const Ukuran: typeof ha.be.Spr.Ukuran;
declare const PosisiPolar: typeof ha.be.Spr.posisiPolar;
declare const Gambar: typeof ha.be.Spr.Gambar;
declare const GambarSemua: typeof ha.be.Spr.GambarSemua;
declare const PosisiX: typeof ha.be.Spr.PosisiX;
declare const PosisiY: typeof ha.be.Spr.PosisiY;
declare const Handle: typeof ha.be.Spr.Handle;
declare const Rotasi: typeof ha.be.Spr.Rotasi;
declare const Alpha: typeof ha.be.Spr.Alpha;
declare const Tabrakan: typeof ha.be.Spr.Tabrakan;
declare const StatusDrag: typeof ha.be.Spr.StatusDrag;
declare const SpriteKontek: typeof ha.be.Spr.kontek;
declare const Panjang: typeof ha.be.Spr.Panjang;
declare const Lebar: typeof ha.be.Spr.Lebar;
declare const Copy: typeof ha.be.Spr.Copy;
declare const Ubin: typeof ha.be.Spr.Ubin;
declare const Bound: typeof ha.be.Spr.Bound;
declare var Font: typeof ha.be.Teks.Font;
declare var Tulis: typeof ha.be.Teks.Tulis;
declare var Rata: typeof ha.be.Teks.Rata;
