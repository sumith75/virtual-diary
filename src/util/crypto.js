import CryptoJS from "crypto-js";

const SECRET_KEY = "virtual-diary-secret-key";

export const encryptText = (text) => {
  return CryptoJS.AES.encrypt(text, SECRET_KEY).toString();
};

export const decryptText = (cipher) => {
  const bytes = CryptoJS.AES.decrypt(cipher, SECRET_KEY);
  return bytes.toString(CryptoJS.enc.Utf8);
};
