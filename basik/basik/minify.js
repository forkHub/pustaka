const fs = require('fs');
const readline = require('readline');

// Get input and output file names from command-line arguments
const [inputFile, outputFile] = process.argv.slice(2);

if (!inputFile || !outputFile) {
	console.error('Usage: node cleanFile.js <inputFile> <outputFile>');
	process.exit(1);
}

// Create read stream and line reader
const rl = readline.createInterface({
	input: fs.createReadStream(inputFile),
	crlfDelay: Infinity,
});

const outputStream = fs.createWriteStream(outputFile);

rl.on('line', (line) => {
	const cleaned = line.trim();
	outputStream.write(cleaned);
});

rl.on('close', () => {
	outputStream.end();
	console.log(`Cleaned content written to ${outputFile}`);
});
