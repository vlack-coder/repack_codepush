import forge from 'node-forge';

export function toBase64(input) {
  const buffer = forge.util.createBuffer(input, 'utf8');
  const encodedString = forge.util.encode64(buffer.getBytes());
  return encodedString;
}

export function fromBase64(encoded) {
  const decodedBytes = forge.util.decode64(encoded);
  const buffer = forge.util.createBuffer(decodedBytes, 'binary');
  const decodedString = buffer.toString('utf8');
  return decodedString;
}
