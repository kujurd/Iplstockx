// AES-256 Encryption
const CryptoJS = require('crypto-js');
const encryptData = (data, secretKey) => {
  return CryptoJS.AES.encrypt(JSON.stringify(data), secretKey).toString();
};