const bitcoin = require("bitcoinjs-lib");
const bip39 = require("bip39");
const { BIP32Factory } = require("bip32");
const ecc = require("tiny-secp256k1");

// Create a BIP32 factory using tiny-secp256k1
const BIP32 = BIP32Factory(ecc);

// Generate a mnemonic (12 words)
const generateMnemonic = () => {
  const mnemonic = bip39.generateMnemonic();
  console.log("Mnemonic:", mnemonic);
  return mnemonic;
};

// Generate a wallet from the mnemonic
const generateWallet = async (mnemonic) => {
  try {
    const seed = await bip39.mnemonicToSeed(mnemonic);
    const root = BIP32.fromSeed(seed);
    const child = root.derivePath("m/44'/0'/0'/0/0"); // Standard BIP44 path

    // Generate the Bitcoin address
    /** 
     * export interface Payment {
        name?: string;
        network?: Network;
        output?: Uint8Array;
        data?: Uint8Array[];
        m?: number;
        n?: number;
        pubkeys?: Uint8Array[];
        input?: Uint8Array;
        signatures?: Uint8Array[];
        internalPubkey?: Uint8Array;
        pubkey?: Uint8Array;
        signature?: Uint8Array;
        address?: string;
        hash?: Uint8Array;
        redeem?: Payment;
        redeemVersion?: number;
        scriptTree?: Taptree;
        witness?: Uint8Array[];
        }
    */
    const walletDetails = bitcoin.payments.p2pkh({ pubkey: child.publicKey });
    return walletDetails;
  } catch (error) {
    console.error(error);
  }
};

// Main function to create wallet
export const createWallet = async () => {
  try {
    const mnemonic = generateMnemonic();
    const walletDetails = await generateWallet(mnemonic);

    console.log("Address:", walletDetails.address);
    console.log("Hash: ", walletDetails.hash.toString("utf8"));
    console.log("Public Key: ", walletDetails.pubkey.toString());
    console.log("Private Key (WIF):", child.toWIF());

    // walletDetails: Payment
    return walletDetails;
  } catch (error) {
    console.error(error);
  }
};

// createWallet().catch(err => console.error(err));
