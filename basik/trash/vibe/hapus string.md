Untuk mendukung *template literal* (backtick ```), Anda perlu menambahkan pola backtick ke dalam Regular Expression dan menambahkan *flag* `s` (*dotAll*) agar regex dapat menangani string *multiline* (multi-baris).

```typescript
/**
 * Menghapus teks string yang diapit tanda petik tunggal (''), ganda (""),
 * maupun template literal / backtick (` `).
 * 
 * @param input - Teks atau kode sumber yang ingin dibersihkan
 * @returns Teks setelah semua string terpetik dihapus
 */
function removeQuotedStrings(input: string): string {
  // Regex mencocokkan '', "", dan ``, termasuk string multiline dan escape character (\)
  const stringRegex = /"(?:[^"\\]|\\.)*"|'(?:[^'\\]|\\.)*'|`(?:[^`\\]|\\.)*`/gs;
  
  return input.replace(stringRegex, '');
}

// === Contoh Penggunaan ===
const contohKode = `
  const a = "Hello";
  const b = 'Dunia';
  const c = \`Baris 1
  Baris 2 dengan \\\`escape\\\`\`;
`;

console.log(removeQuotedStrings(contohKode));
/* Output:
  const a = ;
  const b = ;
  const c = ;
*/

```

**Perubahan Utama:**

* **Pola Backtick (``(?:[^`\\]|\\.)*``)**: Menangkap semua karakter di dalam tanda backtick, termasuk *escape character* seperti `\``.
* **Flag `s` (*dotAll*)**: Memastikan regex dapat melintasi baris baru (*multiline*), karena *template literal* pada JavaScript/TypeScript umumnya dapat membentang di beberapa baris.