import * as grapesjs from 'grapesjs/dist/grapes.min.js';
//import {} from 'grapesjs-preset-newsletter';
import {} from 'grapesjs-preset-webpage';
import {Bodylightapi} from './bodylightapi';
import {inject} from 'aurelia-framework';
import {Bdlrange} from './types/bdlrange';
import {Bdlreceptacle} from './types/bdlreceptacle';
import {Bdlbind2previous} from './types/bdlbind2previous';

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
      storageManager: {autoload: 0},
      plugins: ['gjs-preset-webpage'],
      pluginsOpts: {
        'gjs-preset-webpage': {
          modalTitleImport: 'Import template'
          // ... other options
        }
      }
      /*domComponents: {
        wrapper: {
          removable: false,
          copyable: false,
          draggable: false,
          components: [{'aurelia-app': 'mainwebcomponent'}],
          traits: [{
            name: 'aurelia-app',
            value: 'mainwebcomponent'
          }],
          stylable: [
            'background',
            'background-color',
            'background-image',
            'background-repeat',
            'background-attachment',
            'background-position',
            'background-size'
          ]
        }

      }*/

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
    //pno.removeButton('options', 'preview');
    this.api.editor.BlockManager.remove('video');
    this.api.editor.BlockManager.remove('map');

    /* adding custom element*/
    Bdlrange.addToEditor(this.api.editor);
    Bdlreceptacle.addToEditor(this.api.editor);
    Bdlbind2previous.addToEditor(this.api.editor);

    //others TBD
    let attr = document.createAttribute('aurelia-app');
    attr.value = 'mainwebcomponent';
    this.api.editor.Canvas.getBody().setAttributeNode(attr);

    console.log('editor:', this.api.editor);
  }
}
