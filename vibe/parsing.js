/**
 * Replace items in an array from index x to y with a given object
 * @param {Array} arr - The array to modify
 * @param {number} x - Start index of the range
 * @param {number} y - End index of the range (inclusive)
 * @param {*} newItem - The object (or value) to insert
 * @returns {Array} - The modified array
 */
function replaceRange(arr, x, y, newItem) {
    if (x < 0 || y >= arr.length || x > y) {
        throw new Error("Invalid range");
    }

    // Remove items from x to y, and insert newItem
    arr.splice(x, y - x + 1, newItem);

    return arr;
}