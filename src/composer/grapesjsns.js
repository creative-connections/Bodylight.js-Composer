import * as grapesjs from 'grapesjs/dist/grapes.min.js';
//import {} from 'grapesjs-preset-newsletter';
import {} from 'grapesjs-preset-webpage';
import {Bodylightapi} from './bodylightapi';
import {inject} from 'aurelia-framework';
import {Bdlrange} from './types/bdlrange';
import {Bdlreceptacle} from './types/bdlreceptacle';
import {Bdlbind2previous} from './types/bdlbind2previous';
import {Bdlfmi} from './types/bdlfmi';

@inject(Bodylightapi)
export class Grapesjsns {
  constructor(api) {
    this.api = api;
    window.seqid = 1;
  }

  attached() {
    console.log('grapesjsns attached, grapesjs', grapesjs);
    //this.grapesjs = new grapesjs()
    this.api.editor = grapesjs.init({
      container: '#gjs',
      canvas: {
        scripts: ['app.bundle.js']
      },
      storageManager: {storeHtml: 0, storeCss: 0, autoload: 0},
      plugins: ['gjs-preset-webpage'],
      pluginsOpts: {
        'gjs-preset-webpage': {
          navbarOpts: false,
          countdownOpts: false,
          formsOpts: false
          // ... other options
        }
      }

    });

    let pno = this.api.editor.Panels;
    pno.addButton('devices-c', {
      id: 'logo',
      className: 'btn-show-json fa fa-bank',
      label: 'Bodylight composer v2.0',
      command(editor) {
        editor.Modal.setTitle('Bodylight v2.0')
          .setContent('Sources at <a href="https://github.com/creative-connections/Bodylight.js-Composer">github</a>')
          .open();
      }
    });
    pno.removeButton('options', 'fullscreen');
    pno.removeButton('options', 'preview');
    pno.removeButton('options', 'sw-visibility');
    pno.addButton('options', {
      id: 'visibility',
      active: true, // active by default
      className: 'fa fa-square',
      command: 'sw-visibility', // Built-in command
    });
    //this.api.editor.runCommand('sw-visibility');
    //pno.removeButton('options', 'preview');
    this.api.editor.BlockManager.remove('video');
    this.api.editor.BlockManager.remove('map');

    /* adding custom element*/
    Bdlrange.addToEditor(this.api.editor);
    Bdlreceptacle.addToEditor(this.api.editor);
    Bdlbind2previous.addToEditor(this.api.editor);
    Bdlfmi.addToEditor(this.api.editor);

    //load previous state -
    this.api.editor.load();
    //enable border of components

    //others TBD

    //add aurelia-app attribute - seems not working
    /*let attr = document.createAttribute('aurelia-app');
    attr.value = 'mainwebcomponent';
    this.api.editor.Canvas.getBody().setAttributeNode(attr);

    console.log('editor:', this.api.editor);

     */
  }
}
