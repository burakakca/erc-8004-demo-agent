import { generatePrivateKey, privateKeyToAccount } from 'viem/accounts';

// Generate a random private key
const privateKey = generatePrivateKey();
// Derive the account (address) from the private key
const account = privateKeyToAccount(privateKey);

console.log('--- CREDENTIALS ---');
console.log(`PRIVATE_KEY=${privateKey}`);
console.log(`ADDRESS=${account.address}`);
console.log('-------------------');
