"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs = require("fs");
const crypto = require("crypto");
const zlib = require("zlib");
function readFile(name) {
    return fs.readFileSync(__dirname + '/../' + name);
}
let key = readFile('secret.key') + '';
key = key.substring(0, key.length - 1);
console.log('key', key + '324');
const iv = readFile('iv.txt');
console.log('iv length', iv.length);
const secret = readFile('secret.enc');
console.log('key length', key.length);
// const cipherKey = Buffer.from(key, 'hex')
const cipherKey = key.substring(0, 32);
console.log('cipherKey', cipherKey.length);
const auth = readFile('auth.txt');
const decipher = crypto.createDecipheriv('aes-256-gcm', cipherKey, iv);
const update = decipher.update(secret);
console.log('update', typeof update);
// fs.writeFileSync('/tmp/test.zip', update)
decipher.setAuthTag(auth);
const final = decipher.final();
console.log('final', typeof final);
const buffer = Buffer.concat([update, final]);
// fs.writeFileSync(__dirname + '/../test.zip', buffer)
const unzipped = zlib.unzipSync(buffer);
fs.writeFileSync(__dirname + '/../unzipped.txt', unzipped);
// const text = fs.readFileSync(__dirname + '/../unzipped.txt', 'utf-8')
// const sentences = text.split('.')
// console.log('sentences', sentences.length)
// const all = Buffer.concat([update, final])
// console.log(typeof all)
// const decrypted = decipher.update(secret, 'binary', 'utf8') + decipher.final('utf8')
// const output = Buffer.concat([decipher.update(secret), decipher.final()])
// let decrypted = '';
// let chunk
// decipher.on('readable', () => {
//     console.log('wat', decipher.read())
//     while (null !== (chunk = decipher.read())) {
//         decrypted += chunk.toString('utf8');
//         console.log('decrypted', decrypted)
//     }
// });
// decipher.on('end', () => {
//     console.log(decrypted);
//     // Prints: some clear text data
// });
// decipher.on('error', err => {
//     console.log('error', err)
// })
//
// // Encrypted with same algorithm, key and iv.
// // const encrypted =
// //     'e5f79c5915c02171eec6b212d5520d44480993d7d622a7c4c2da32f6efda0ffa';
// decipher.write(secret, 'binary');
// decipher.setAuthTag(auth)
// decipher.end();
// const decryptedData = decipher.update(secret);
// decipher.setAuthTag(auth)
// const data = Buffer.concat([decryptedData, decipher.final()])
