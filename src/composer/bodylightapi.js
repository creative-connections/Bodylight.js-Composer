import {HttpClient} from 'aurelia-fetch-client';

export class Bodylightapi {
  static inject = [HttpClient];

  constructor(httpclient) {
    this.editor = {}; //sharing editor
    this.bundlefile = 'bodylight.bundle.js';
    this.httpclient = httpclient;
  }

  save(filename) {
  }

  getBundleFileContent(){
    return this.httpclient.fetch(this.bundlefile)
      .then(response => response.text())
      .then(data => {
        this.bundlefilecontent = data;
        return data;
      });
  }
}