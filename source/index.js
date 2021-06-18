"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs = require("fs");
const crypto = require("crypto");
const zlib = require("zlib");
function readFile(name) {
    return fs.readFileSync(__dirname + '/../' + name);
}
function unzip() {
    let key = readFile('secret.key') + '';
    key = key.substring(0, key.length - 1);
    const iv = readFile('iv.txt');
    const secret = readFile('secret.enc');
    const cipherKey = key.substring(0, 32);
    const auth = readFile('auth.txt');
    const decipher = crypto.createDecipheriv('aes-256-gcm', cipherKey, iv);
    const update = decipher.update(secret);
    decipher.setAuthTag(auth);
    const final = decipher.final();
    const buffer = Buffer.concat([update, final]);
    const unzipped = zlib.unzipSync(buffer);
    fs.writeFileSync(__dirname + '/../unzipped.txt', unzipped);
}
const argv = process.argv;
if (argv.length === 2) {
    console.log('specify sentence and word index, example: npm run start 5 2');
    process.exit(1);
}
unzip();
const sentenceIndex = Number.parseInt(argv[2]);
const wordIndex = Number.parseInt(argv[3]);
const text = fs.readFileSync(__dirname + '/../unzipped.txt', 'utf-8');
const sentences = text.split('.');
if (sentenceIndex >= sentences.length) {
    console.log('sentence index not available');
    process.exit(1);
}
const sentence = sentences[sentenceIndex];
const words = sentence.split(' ');
if (wordIndex >= words.length) {
    console.log('word index not available');
    process.exit(1);
}
const word = words[wordIndex];
console.log('word:', word);
