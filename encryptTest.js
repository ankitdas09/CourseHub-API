import aesjs from "aes-js";
let utf8Encode = new TextEncoder();
var key = "576D5A7134743677397A24432646294A";
// Convert text to bytes
var text = "Hello world!";
var bytekey = utf8Encode.encode(key);
var textBytes = aesjs.utils.utf8.toBytes(text);

var aesCtr = new aesjs.ModeOfOperation.ctr(bytekey);
var encryptedBytes = aesCtr.encrypt(textBytes);
var encryptedHex = aesjs.utils.hex.fromBytes(encryptedBytes);
console.log(encryptedHex);

var encryptedBytes = aesjs.utils.hex.toBytes(encryptedHex);
var aesCtr = new aesjs.ModeOfOperation.ctr(bytekey);
var decryptedBytes = aesCtr.decrypt(encryptedBytes);
var decryptedText = aesjs.utils.utf8.fromBytes(decryptedBytes);
console.log(decryptedText);
