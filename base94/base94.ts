export class Base94 {
  private static readonly alphabet: string =
    Array.from({ length: 95 }, (_, i) => String.fromCharCode(i + 32)).join("");

  private static readonly lookup: Record<string, number> = (() => {
    const map: Record<string, number> = {};
    for (let i = 0; i < Base94.alphabet.length; i++) {
      map[Base94.alphabet[i]] = i;
    }
    return map;
  })();

  /**
   * Encode bytes (Uint8Array) → Base94 string
   * Fully reversible, no BigInt used.
   */
  static encode(bytes: Uint8Array): string {
    if (bytes.length === 0) return "";

    let digits = [0]; // base94 digits (LSB first)

    for (let byte of bytes) {
      let carry = byte;

      for (let i = 0; i < digits.length; i++) {
        const v = digits[i] * 256 + carry;
        digits[i] = v % 95;
        carry = Math.floor(v / 95);
      }

      while (carry > 0) {
        digits.push(carry % 95);
        carry = Math.floor(carry / 95);
      }
    }

    return digits.reverse().map(d => Base94.alphabet[d]).join("");
  }

  /**
   * Decode Base94 string → Uint8Array
   * Fully reversible, no BigInt used.
   */
  static decode(text: string): Uint8Array {
    if (text.length === 0) return new Uint8Array();

    let bytes = [0]; // base256 bytes (LSB first)

    for (let char of text) {
      const value = Base94.lookup[char];
      if (value === undefined)
        throw new Error(`Invalid Base94 character: "${char}"`);

      let carry = value;

      for (let i = 0; i < bytes.length; i++) {
        const v = bytes[i] * 95 + carry;
        bytes[i] = v & 0xff; // % 256
        carry = v >> 8;
      }

      while (carry > 0) {
        bytes.push(carry & 0xff);
        carry >>= 8;
      }
    }

    return new Uint8Array(bytes.reverse());
  }

  /** Instance helpers */
  encode(bytes: Uint8Array): string {
    return Base94.encode(bytes);
  }

  decode(text: string): Uint8Array {
    return Base94.decode(text);
  }
}