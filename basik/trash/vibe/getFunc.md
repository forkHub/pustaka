// Mengambil semua nama properti di objek `window` yang bertipe fungsi
const windowFunctions: string[] = Object.getOwnPropertyNames(window).filter(
  (prop) => {
    try {
      return typeof (window as any)[prop] === 'function';
    } catch (e) {
      // Menghindari error akses properti yang sensitif/dilarang browser
      return false;
    }
  }
);

console.log(windowFunctions);