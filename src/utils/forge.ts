import forge from 'node-forge';
import {pbkey, pbkey1, pbkey2} from './pbkey';
import {privateKey, privateKey1, privateKey2, privateKey3} from './pvkey';

export const encryptPayload = (payload: any, receivedpublicKeyPem = pbkey2) => {
  let data = JSON.stringify(payload);
  try {
    const publicKey = forge.pki.publicKeyFromPem(receivedpublicKeyPem);
    // const encryptedData = publicKey.encrypt(data);
    const encryptedData = publicKey.encrypt(data, 'RSA-OAEP', {
      md: forge.md.sha256.create(),
    });
    // console.log('encruptedData', encruptedData)
    const ass = forge.util.encode64(encryptedData);
    console.log('ass', ass);
  } catch (error) {
    console.error('Encryption error:', error);
    throw error;
  }
};

export const decryptPayload = (
  encryptedData: string,
  privateKeyPem = privateKey2,
) => {
  try {
    const privateKey = forge.pki.privateKeyFromPem(privateKeyPem);
    const encryptedBytes = forge.util.decode64(encryptedData);
    const decryptedBytes = privateKey.decrypt(encryptedBytes);
    console.log('decryptedBytes', decryptedBytes);
    // const decryptedData = decryptedBytes.toString('utf8');
    // console.log('decryptedData', decryptedData);
    return decryptedBytes;
    // return decryptedData;
  } catch (error) {
    console.error('Decryption error:', error);
    throw error;
  }
};

// AES
// export const encryptPayloadAES = (
//   payload: any,
//   receivedpublicKeyPem = pbkey2,
// ) => {
//   let data = JSON.stringify(payload);
//   try {
//     // Generate a random AES key
//     const aesKey = forge.random.getBytesSync(32); // 256 bits

//     // Convert the payload to bytes
//     const dataBytes = forge.util.createBuffer(data, 'utf8');

//     // Encrypt the payload with AES-GCM
//     const cipher = forge.cipher.createCipher('AES-GCM', aesKey);
//     cipher.start({
//       iv: forge.random.getBytesSync(12), // 96 bits IV for AES-GCM
//       tagLength: 128, // 128 bits authentication tag for AES-GCM
//     });
//     cipher.update(dataBytes);
//     cipher.finish();
//     const encryptedPayload = cipher.output.getBytes();

//     // Encrypt the AES key with RSA
//     const publicKey = forge.pki.publicKeyFromPem(receivedpublicKeyPem);
//     const encryptedAesKey = publicKey.encrypt(aesKey);

//     // Encode encrypted payload, encrypted AES key, IV, and authentication tag
//     const encodedEncryptedPayload = forge.util.encode64(encryptedPayload);
//     const encodedEncryptedAesKey = forge.util.encode64(encryptedAesKey);
//     const iv = forge.util.encode64(cipher.iv.getBytes());
//     const tag = forge.util.encode64(cipher.mode.tag.getBytes());

//     console.log('Encoded Encrypted Payload:', encodedEncryptedPayload);
//     console.log('Encoded Encrypted AES Key:', encodedEncryptedAesKey);
//     // console.log('Encoded IV:', iv);
//     // console.log('Encoded Authentication Tag:', tag);
//   } catch (error) {
//     console.error('Encryption error:', error);
//     throw error;
//   }
// };

// export const decryptPayloadAES = (
//   encryptedPayload: string,
//   encodedEncryptedAesKey: string,
//   iv: string,
//   tag: string,
//   privateKeyPem = privateKey2,
// ) => {
//   try {
//     // Decode the base64 encoded strings
//     const encryptedPayloadBytes = forge.util.decode64(encryptedPayload);
//     const encryptedAesKeyBytes = forge.util.decode64(encodedEncryptedAesKey);
//     const ivBytes = forge.util.decode64(iv);
//     const tagBytes = forge.util.decode64(tag);

//     // Convert private key PEM to RSA private key object
//     const privateKey = forge.pki.privateKeyFromPem(privateKeyPem);

//     // Decrypt the AES key with RSA
//     const aesKey = privateKey.decrypt(encryptedAesKeyBytes);

//     // Create decipher for AES-GCM
//     const decipher = forge.cipher.createDecipher('AES-GCM', aesKey);
//     decipher.start({
//       iv: ivBytes,
//       tagLength: 128,
//       tag: tagBytes,
//     });
//     decipher.update(forge.util.createBuffer(encryptedPayloadBytes));
//     const result = decipher.finish(); // Check if decryption was successful
//     if (result) {
//       // Return the decrypted payload
//       return decipher.output.toString('utf8');
//     } else {
//       throw new Error('Decryption failed');
//     }
//   } catch (error) {
//     console.error('Decryption error:', error);
//     throw error;
//   }
// };

export const encryptPayloadAES = async (
  payload: any,
  receivedpublicKeyPem = pbkey2,
) => {
  let data = JSON.stringify(payload);

  try {
    // Generate a random IV
    const iv = forge.random.getBytesSync(12); // 96 bits

    // Generate a random AES key
    const aesKey = forge.random.getBytesSync(32); // 256 bits

    // Convert the payload to bytes
    const dataBytes = forge.util.createBuffer(data, 'utf8');

    // Encrypt the payload with AES-GCM
    const cipher = forge.cipher.createCipher('AES-GCM', aesKey);
    cipher.start({
      iv: iv,
      tagLength: 128, // 128 bits authentication tag for AES-GCM
    });
    cipher.update(dataBytes);
    cipher.finish();
    const encryptedPayload = cipher.output.getBytes();

    // Get the authentication tag
    const tag = cipher.mode.tag.getBytes();

    // Combine IV, encrypted data, and auth tag into a single payload
    const payloadHex = iv + encryptedPayload + tag;

    // Convert the payload to base64
    const encryptedData = forge.util.encode64(payloadHex);
    console.log('encryptedData', encryptedData);

    // Encrypt the AES key with RSA
    const publicKey = forge.pki.publicKeyFromPem(receivedpublicKeyPem);
    const encryptedAesKey = publicKey.encrypt(aesKey);

    // Convert the encrypted AES key to base64
    const encodedEncryptedAesKey = forge.util.encode64(encryptedAesKey);
    console.log('encodedEncryptedAesKey', encodedEncryptedAesKey);

    return {
      encryptedData,
      encodedEncryptedAesKey,
    };
  } catch (error) {
    console.error('Encryption error:', error);
    throw error;
  }
};

export const decryptPayloadAES = async (
  encryptedData: string,
  encodedEncryptedAesKey: string,
  privateKeyPem = privateKey3,
) => {
  try {
    // Decode the base64 encoded strings
    const payloadHex = forge.util.decode64(encryptedData);
    const encryptedAesKey = forge.util.decode64(encodedEncryptedAesKey);

    // Convert private key PEM to RSA private key object
    const pK = forge.pki.privateKeyFromPem(privateKeyPem);

    // Decrypt the AES key with RSA
    const aesKey = pK.decrypt(encryptedAesKey);

    // Extract IV, encrypted payload, and tag from the payload
    const iv = payloadHex.slice(0, 12); // Assuming IV length is 12 bytes (96 bits for AES-GCM)
    const encryptedPayload = payloadHex.slice(12, -16); // Exclude IV and tag from the payload
    const tag = payloadHex.slice(-16); // Assuming tag length is 128 bits (16 bytes)

    // Create decipher for AES-GCM
    const decipher = forge.cipher.createDecipher('AES-GCM', aesKey);
    decipher.start({
      iv: iv,
      tagLength: 128,
      tag: tag,
    });
    decipher.update(forge.util.createBuffer(encryptedPayload));
    const result = decipher.finish(); // Check if decryption was successful
    if (result) {
      // Return the decrypted payload
      const nyansh = decipher.output.toString('utf8');
      console.log('nyansh - logged', nyansh);
      return nyansh;
    } else {
      throw new Error('Decryption failed');
    }
  } catch (error) {
    console.error('Decryption error:', error);
    throw error;
  }
};
