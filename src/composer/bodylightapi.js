import {HttpClient} from 'aurelia-fetch-client';

export class Bodylightapi {
  static inject = [HttpClient];

  constructor(httpclient) {
    this.editor = {}; //sharing editor
    this.bundlefile = 'app.bundle.js';
    this.httpclient = httpclient;
    this.httpclient.fetch(this.bundlefile)
      .then(response => response.text())
      .then(data => {
        this.bundlefilecontent = data;
      });
  }

  save(filename) {

  }
}
