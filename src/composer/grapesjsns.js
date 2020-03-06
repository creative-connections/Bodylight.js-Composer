import * as grapesjs from 'grapesjs/dist/grapes.min.js';
//import {} from 'grapesjs-preset-newsletter';
import {} from 'grapesjs-preset-webpage';
import {Bodylightapi} from './bodylightapi';
import {inject} from 'aurelia-framework';
import {Bdlrange} from './types/bdlrange';
import {Bdlreceptacle} from './types/bdlreceptacle';
import {Bdlbind2previous} from './types/bdlbind2previous';
import {Bdlfmi} from './types/bdlfmi';
import {Svgtype} from './types/svgtype';

@inject(Bodylightapi)
export class Grapesjsns {
  constructor(api) {
    this.api = api;
    window.seqid = 1;
  }

  attached() {
    console.log('grapesjsns attached, grapesjs', grapesjs);
    //initialize grapesjs editor
    this.api.editor = grapesjs.init({
      container: '#gjs',
      canvas: {
        scripts: ['app.bundle.js']
      },
      //storageManager: {storeHtml: 0, storeCss: 0, autoload: 0},
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
    //customize panels
    let pno = this.api.editor.Panels;
    //add Bodylight logo as button which triggers modal with link to github
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
    //remove some buttons as they'll be used differently
    pno.removeButton('options', 'fullscreen');
    pno.removeButton('options', 'preview');
    pno.removeButton('options', 'sw-visibility');
    //add visibility button, default to true
    pno.addButton('options', {
      id: 'visibility',
      active: true, // active by default
      className: 'fa fa-square-o',
      command: 'sw-visibility', // Built-in command
    });

    //remove video and map from blocks
    this.api.editor.BlockManager.remove('video');
    this.api.editor.BlockManager.remove('map');
    let gridItem =
      `<table class="grid-item-card">
        <tr>
          <td class="grid-item-card-cell">
            <svg width="300" height="200"><path d="M0 0L302.97 0L302.97 200L0 200L0 0Z" fill="#9fc4a8"></path><text x="68.32" y="71.88" font-size="14" font-family="Open Sans" font-weight="normal" font-style="normal" letter-spacing="0" alignment-baseline="before-edge">Placehold image</text></svg>
            <table class="grid-item-card-body">
              <tr>
                <td class="grid-item-card-content">
                  <h1 class="card-title">Title here</h1>
                  <p class="card-text">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt</p>
                </td>
              </tr>
            </table>
          </td>
        </tr>
      </table>`;
    this.api.editor.BlockManager.add('grid-items', {
      label: 'Grid Items',
      category: 'Basic',
      content: `<table class="grid-item-row">
        <tr>
          <td class="grid-item-cell2-l">${gridItem}</td>
          <td class="grid-item-cell2-r">${gridItem}</td>
        </tr>
      </table>`,
      attributes: {class: 'fa fa-th'}
    });
    /* add custom elements into block manager - each type/Bdl... implements static method with one argument (editor) */
    Bdlrange.addToEditor(this.api.editor);
    Bdlreceptacle.addToEditor(this.api.editor);
    Bdlbind2previous.addToEditor(this.api.editor);
    Bdlfmi.addToEditor(this.api.editor);
    //Svgtype.addToEditor(this.api.editor);

    //load previous state -
    this.api.editor.load();
  }
}
