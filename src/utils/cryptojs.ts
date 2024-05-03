import CryptoJS from 'crypto-js';
import {ENCRYPTION_KEY} from '.';

// USED FOR PAYLOAD ENCRYPTION

export const encrypt = async (payloadData: any) => {
  let data = JSON.stringify(payloadData);
  try {
    // Generate a random IV (Initialization Vector)
    const IV = CryptoJS.lib.WordArray.random(16);

    // Convert the encryption key from hex to WordArray
    const key = CryptoJS.enc.Hex.parse(ENCRYPTION_KEY);

    // Encrypt the data using AES-256-CBC algorithm
    const encrypted = CryptoJS.AES.encrypt(data, key, {
      iv: IV,
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.Pkcs7,
    });

    // Concatenate IV and encrypted data
    const combined = CryptoJS.lib.WordArray.create()
      .concat(IV)
      .concat(encrypted.ciphertext);

    // Convert the combined data to hex string
    const encryptedHex = combined.toString(CryptoJS.enc.Hex);

    // Convert the hex string to base64
    const encryptedData = CryptoJS.enc.Hex.parse(encryptedHex).toString(
      CryptoJS.enc.Base64,
    );

    return encryptedData;
  } catch (error) {
    // handleCatch(error)
    console.error(error);
  }
};

export const decrypt = async (encryptedData: any) => {
  try {
    // Convert the encrypted data from base64 to hex
    const encryptedHex = CryptoJS.enc.Base64.parse(encryptedData).toString(
      CryptoJS.enc.Hex,
    );

    // Convert the hex string to WordArray
    const encryptedWA = CryptoJS.enc.Hex.parse(encryptedHex);

    // Extract IV from the encrypted data
    const IV = encryptedWA.clone();
    IV.sigBytes = 16;

    // Extract the ciphertext (encrypted data) from the encrypted data
    const ciphertext = encryptedWA.clone();
    ciphertext.words.splice(0, 4); // remove IV
    ciphertext.sigBytes -= 16; // remove IV length

    // Convert the encryption key from hex to WordArray
    const key = CryptoJS.enc.Hex.parse(ENCRYPTION_KEY);

    // Decrypt the data using AES-256-CBC algorithm
    const decrypted = CryptoJS.AES.decrypt({ciphertext}, key, {
      iv: IV,
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.Pkcs7,
    });

    // Convert the decrypted data to plaintext
    const decryptedData = decrypted.toString(CryptoJS.enc.Utf8);

    return decryptedData;
  } catch (error) {
    // handleCatch(error)
    console.error(error);
  }
};

export default encrypt;
