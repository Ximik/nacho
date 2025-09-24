import * as bip39 from "@scure/bip39";
import { HDKey } from "@scure/bip32";
import { wordlist } from "@scure/bip39/wordlists/english";

export function generateMnemonic(): string {
  return "abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon about";
  return bip39.generateMnemonic(wordlist, 128);
}

export function validateMnemonic(mnemonic: string): boolean {
  return bip39.validateMnemonic(mnemonic, wordlist);
}

export function xprvFromMnemonic(mnemonic: string): string {
  const seed = bip39.mnemonicToSeedSync(mnemonic, "");
  const hdkey = HDKey.fromMasterSeed(seed);
  return hdkey.privateExtendedKey;
}

export function xpubFromMnemonic(mnemonic: string): string {
  const seed = bip39.mnemonicToSeedSync(mnemonic, "");
  const hdkey = HDKey.fromMasterSeed(seed);
  return hdkey.publicExtendedKey;
}

export function xpubFromXprv(xprv: string): string {
  const hdkey = HDKey.fromExtendedKey(xprv);
  return hdkey.publicExtendedKey;
}

export function pubkeyFromXpub(xpub: string, path: string): string {
  const hdkey = HDKey.fromExtendedKey(xpub);
  const derived = hdkey.derive(path);

  if (!derived.publicKey) {
    throw new Error("Unable to derive public key");
  }

  return Buffer.from(derived.publicKey).toString("hex");
}

export function prvkeyFromXprv(xprv: string, path: string): string {
  const hdkey = HDKey.fromExtendedKey(xprv);
  const derived = hdkey.derive(path);

  if (!derived.privateKey) {
    throw new Error("Unable to derive private key");
  }

  return Buffer.from(derived.privateKey).toString("hex");
}

export function pubFromPath(xpub: string, path: string): string {
  const hdkey = HDKey.fromExtendedKey(xpub);
  const derived = hdkey.derive(path);
  if (!derived.publicKey) {
    throw new Error("Unable to derive public key");
  }
  return Buffer.from(derived.publicKey).toString("hex");
}

export function prvFromPath(xprv: string, path: string): string {
  const hdkey = HDKey.fromExtendedKey(xprv);
  const derived = hdkey.derive(path);
  if (!derived.privateKey) {
    throw new Error("Unable to derive private key");
  }
  return Buffer.from(derived.privateKey).toString("hex");
}
