import Cookies from "js-cookie";
import { token } from "../config";
const { REACT_APP_SALT } = process.env;

export const crypt = (salt, text) => {
  const textToChars = (text) => text.split("").map((c) => c.charCodeAt(0));
  const byteHex = (n) => ("0" + Number(n).toString(16)).substr(-2);
  const applySaltToChar = (code) =>
    textToChars(salt).reduce((a, b) => a ^ b, code);

  return text
    .split("")
    .map(textToChars)
    .map(applySaltToChar)
    .map(byteHex)
    .join("");
};

export const decrypt = (salt, encoded) => {
  const textToChars = (text) => text.split("").map((c) => c.charCodeAt(0));
  const applySaltToChar = (code) =>
    textToChars(salt).reduce((a, b) => a ^ b, code);
  return encoded
    .match(/.{1,2}/g)
    .map((hex) => parseInt(hex, 16))
    .map(applySaltToChar)
    .map((charCode) => String.fromCharCode(charCode))
    .join("");
};
export const hashData = (payload) => {
  const hash = crypt(REACT_APP_SALT, JSON.stringify(payload));
  return hash;
};
export const dehashData = () => {
  const tok = Cookies.get(token);
  if (tok) {
    const dehash = decrypt(REACT_APP_SALT, tok);
    if (dehash) {
      return JSON.parse(dehash);
    }
  }
  return null;

};
