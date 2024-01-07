import { Injectable } from '@angular/core';
//const CryptoJS = require("crypto-js");
//import * as SecureStorage from 'secure-web-storage';
const SecureStorage = require('secure-web-storage');
import * as CryptoJS from 'crypto-js';

const SECRET_KEY: any = '@AaPmAnAgEr_ApP-DeVeLoPeD-By-PaRsArAd-PrOgRaMmInG!-TeAm@';

@Injectable({
  providedIn: 'root',
})

export class StorageService {
  constructor() { }
  public secureStorage = new SecureStorage(localStorage, {
    hash: function hash(key: any): any {
      key = CryptoJS.SHA256(key, SECRET_KEY);
      return key.toString();
    },
    encrypt: function encrypt(data: any) {
      data = CryptoJS.AES.encrypt(data, SECRET_KEY);
      data = data.toString();
      return data;
    },
    decrypt: function decrypt(data: any) {
      data = CryptoJS.AES.decrypt(data, SECRET_KEY);
      data = data.toString(CryptoJS.enc.Utf8);
      return data;
    },
  });
}




