import * as fs from 'fs'
import * as crypto from 'crypto'
import * as zlib from 'zlib'

function readFile(name: string) {
    return fs.readFileSync(__dirname + '/../' + name)
}

function unzip() {
    let key = readFile('secret.key') + ''
    key = key.substring(0, key.length - 1)
    console.log('key', key + '324')
    const iv = readFile('iv.txt')
    console.log('iv length', iv.length)
    const secret = readFile('secret.enc')
    console.log('key length', key.length)

    const cipherKey = key.substring(0, 32)
    console.log('cipherKey', cipherKey.length)

    const auth = readFile('auth.txt')


    const decipher = crypto.createDecipheriv('aes-256-gcm', cipherKey, iv)
    const update = decipher.update(secret)
    console.log('update', typeof update)
    decipher.setAuthTag(auth)
    const final = decipher.final()
    console.log('final', typeof final)
    const buffer = Buffer.concat([update, final])
    const unzipped = zlib.unzipSync(buffer)
    fs.writeFileSync(__dirname + '/../unzipped.txt', unzipped)
}

const argv = process.argv
if (argv.length === 2) {
    console.log('specify sentence and word index, example: npm run start 5 2')
    process.exit(1)
}
console.log('args', argv)
unzip()

const sentenceIndex = Number.parseInt(argv[2])
const wordIndex = Number.parseInt(argv[3])

const text = fs.readFileSync(__dirname + '/../unzipped.txt', 'utf-8')
const sentences = text.split('.')
console.log('sentences', sentences.length)
if (sentenceIndex >= sentences.length) {
    console.log('sentence index not available')
    process.exit(1)
}
const sentence = sentences[sentenceIndex]
const words = sentence.split(' ')
if (wordIndex >= words.length) {
    console.log('word index not available')
    process.exit(1)
}
console.log('words', words.length)
const word = words[wordIndex]
console.log('word', word)
