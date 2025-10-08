import * as secp256k1 from "@noble/secp256k1";
import { sha256 } from "@noble/hashes/sha2.js";
import { hmac } from "@noble/hashes/hmac.js";

// Configure secp256k1 hash functions
secp256k1.hashes.sha256 = (message) => sha256(message);
secp256k1.hashes.hmacSha256 = (key, message) => hmac(sha256, key, message);

export type NostrEventData = {
  created_at: number;
  kind: number;
  tags: string[][];
  content: string;
};

export type NostrEvent = NostrEventData & {
  id: string;
  pub: string;
  sig: string;
};

export function isNostrEventData(obj: unknown): obj is NostrEventData {
  if (!obj || typeof obj !== "object") return false;
  const event = obj as Partial<NostrEventData>;

  return (
    typeof event.created_at === "number" &&
    typeof event.kind === "number" &&
    Array.isArray(event.tags) &&
    event.tags.every(
      (tag) =>
        Array.isArray(tag) && tag.every((item) => typeof item === "string"),
    ) &&
    typeof event.content === "string"
  );
}

export function isNostrEvent(obj: unknown): obj is NostrEvent {
  if (!isNostrEventData(obj)) {
    return false;
  }
  const event = obj as Partial<NostrEvent>;

  return (
    typeof event.id === "string" &&
    typeof event.pub === "string" &&
    typeof event.sig === "string"
  );
}

function getPub(prv: string): string {
  const privateKeyBytes = Buffer.from(prv, "hex");
  const publicKeyBytes = secp256k1.schnorr.getPublicKey(privateKeyBytes);
  return Buffer.from(publicKeyBytes).toString("hex");
}

function getEventHash(pub: string, data: NostrEventData): string {
  const serialized = JSON.stringify([
    0,
    pub,
    data.created_at,
    data.kind,
    data.tags,
    data.content,
  ]);

  const hash = sha256(new TextEncoder().encode(serialized));
  return Buffer.from(hash).toString("hex");
}

export function signNostrEvent(data: NostrEventData, prv: string): NostrEvent {
  const pub = getPub(prv);
  const id = getEventHash(pub, data);

  const prvBytes = Buffer.from(prv, "hex");
  const hashBytes = Buffer.from(id, "hex");
  const sigBytes = secp256k1.schnorr.sign(hashBytes, prvBytes);
  const sig = Buffer.from(sigBytes).toString("hex");

  return {
    ...data,
    pub,
    id,
    sig,
  };
}
