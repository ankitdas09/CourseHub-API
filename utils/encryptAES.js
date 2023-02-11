import aesjs from "aes-js";
import config from "../config/default.js";

function EncryptText(text) {
    let utf8Encode = new TextEncoder();
    var key = config.aesKey;

    var byteArrkey = utf8Encode.encode(key);
    var textBytes = aesjs.utils.utf8.toBytes(text);

    var aesCtr = new aesjs.ModeOfOperation.ctr(byteArrkey);
    var encryptedBytes = aesCtr.encrypt(textBytes);
    var encryptedHex = aesjs.utils.hex.fromBytes(encryptedBytes);
    return encryptedHex;
}

export default EncryptText;
