const { Blockchain, Transaction } = require('./blockchain');
const EC = require('elliptic').ec;
const ec = new EC('secp256k1');

// Your private key 
const myKey = ec.keyFromPrivate('7c4c45907dec40c91bab3480c39032e90049f1a44f3e18c3e07c23e3273995cf');

// calculate public key (which doubles as your wallet address)
const myWalletAddress = myKey.getPublic('hex');

// Create new instance of Blockchain class
const cryptoCoin = new Blockchain();

// Mine first block
cryptoCoin.minePendingTransactions(myWalletAddress);

// Create a transaction & sign it with your key
const tx1 = new Transaction(myWalletAddress, 'address2', 100);
tx1.signTransaction(myKey);
cryptoCoin.addTransaction(tx1);

// Mine block
cryptoCoin.minePendingTransactions(myWalletAddress);

// Create second transaction
const tx2 = new Transaction(myWalletAddress, 'address1', 50);
tx2.signTransaction(myKey);
cryptoCoin.addTransaction(tx2);

// Mine block
cryptoCoin.minePendingTransactions(myWalletAddress);
//console.log(cryptoCoin.addTransaction());

console.log();
console.log(`Your balance is ${cryptoCoin.getBalanceOfAddress(myWalletAddress)}`);

// Uncomment this line if you want to test tampering with the chain
 cryptoCoin.chain[1].transactions[0].amount = 10;

// Check if the chain is valid
console.log();
console.log('Blockchain valid?', cryptoCoin.isChainValid() ? 'Yes' : 'No');

let crypto = new Blockchain();
//console.log('the balance is ' , crypto.getBalanceOfAddress());
console.log(JSON.stringify(crypto, null, 4));
