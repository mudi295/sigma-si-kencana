"use client"

import nacl from "tweetnacl"
import * as util from "tweetnacl-util"

// Key utilities
const PRIV_KEY_KEY = "sigma:privkey"
const PUB_KEY_KEY = "sigma:pubkey"

export function ensureKeypair() {
  let priv = localStorage.getItem(PRIV_KEY_KEY)
  let pub = localStorage.getItem(PUB_KEY_KEY)
  if (priv && pub) {
    return { publicKey: util.decodeBase64(pub), secretKey: util.decodeBase64(priv) }
  }
  const kp = nacl.box.keyPair()
  localStorage.setItem(PRIV_KEY_KEY, util.encodeBase64(kp.secretKey))
  localStorage.setItem(PUB_KEY_KEY, util.encodeBase64(kp.publicKey))
  return kp
}

export function getPublicKeyBase64() {
  return localStorage.getItem(PUB_KEY_KEY) || null
}

export function encryptFor(recipientPublicKeyB64: string, message: string, senderSecretKeyB64: string) {
  const nonce = nacl.randomBytes(24)
  const recipientPublicKey = util.decodeBase64(recipientPublicKeyB64)
  const senderSecretKey = util.decodeBase64(senderSecretKeyB64)
  const ciphertext = nacl.box(util.decodeUTF8(message), nonce, recipientPublicKey, senderSecretKey)
  return { nonce: util.encodeBase64(nonce), ciphertext: util.encodeBase64(ciphertext) }
}

export function decryptFrom(senderPublicKeyB64: string, nonceB64: string, ciphertextB64: string, recipientSecretKeyB64: string) {
  const nonce = util.decodeBase64(nonceB64)
  const ciphertext = util.decodeBase64(ciphertextB64)
  const senderPublicKey = util.decodeBase64(senderPublicKeyB64)
  const recipientSecretKey = util.decodeBase64(recipientSecretKeyB64)
  const plain = nacl.box.open(ciphertext, nonce, senderPublicKey, recipientSecretKey)
  if (!plain) return null
  return util.encodeUTF8(plain)
}
