import * as grapesjs from 'grapesjs/dist/grapes.min.js';
//import {} from 'grapesjs-preset-newsletter';
import {} from 'grapesjs-preset-webpage';
import {Bodylightapi} from './bodylightapi';
import {inject} from 'aurelia-framework';
@inject(Bodylightapi)
export class Grapesjsns {
  constructor(api) {
    this.api=api;
  }

  attached() {
    console.log('grapesjsns attached, grapesjs', grapesjs);
    //this.grapesjs = new grapesjs()
    this.api.editor = grapesjs.init({
      container: '#gjs',
      plugins: ['gjs-preset-webpage'],
      pluginsOpts: {
        'gjs-preset-webpage': {
          modalTitleImport: 'Import template'
          // ... other options
        }
      }

    });
    let pno = this.api.editor.Panels;
    //    console.log('panels', pno);
    //    console.log('editor', this.api.editor);
    /*    pno.addButton('devices-c', {
      id: 'export',
      className: 'btn-open-export',
      label: 'Export',
      command: 'export-template',
      context: 'export-template' // For grouping context of buttons from the same panel
    });

 */
    /*    pno.addButton('devices-c', {
      id: 'export2',
      className: 'btn-open-export',
      label: 'Export2',
      command(editor) {
        editor.Modal.setTitle('Export to HTML Web component')
          .setContent(`<textarea style="width:100%;height:250px;">
<html>
<head>
<style>
${editor.getCss()}
</style>
</head>
<body>
${editor.getHtml()}
</body>
</html>
</textarea>`)
          .open();
      },
      context: 'export-template' // For grouping context of buttons from the same panel
    });
    pno.addButton('devices-c', {
      id: 'show-json',
      className: 'btn-show-json',
      label: 'Save',
      context: 'show-json',
      command(editor) {
        editor.Modal.setTitle('Components JSON')
          .setContent(`<textarea style="width:100%; height: 250px;">
            ${JSON.stringify(editor.getComponents())}
          </textarea>`)
          .open();
      }
    });

 */
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


    // Show logo with the version
    /*let pn = this.api.editor.Panels.getPanels();
    console.log('panels', pn);
    let pno = pn.models[3];
    pno.buttons.add('export2', {
      id: 'export',
      className: 'btn-open-export',
      label: 'Export',
      command: 'export-template',
      context: 'export-template', // For grouping context of buttons from the same panel
    });
    pno.buttons.add('save2', {
      id: 'show-json',
      className: 'btn-show-json',
      label: 'Save',
      context: 'show-json',
      command(editor) {
        editor.Modal.setTitle('Components JSON')
          .setContent(`<textarea style="width:100%; height: 250px;">
            ${JSON.stringify(editor.getComponents())}
          </textarea>`)
          .open();
      }
    });
    */

    //
    //this.api.editor.Panels.addPanel({
    //      id: 'panel-top',
    //      el: '.panel__top',
    //   });
    //this.api.editor.Panels.addPanel()
    /*this.api.editor.Panels.addPanel({
      id: 'export-save',
      //el: '.panel__basic-actions',
      buttons: [
        {
          id: 'export',
          className: 'btn-open-export',
          label: 'Export',
          command: 'export-template',
          context: 'export-template', // For grouping context of buttons from the same panel
        }, {
          id: 'show-json',
          className: 'btn-show-json',
          label: 'Save',
          context: 'show-json',
          command(editor) {
            editor.Modal.setTitle('Components JSON')
              .setContent(`<textarea style="width:100%; height: 250px;">
            ${JSON.stringify(editor.getComponents())}
          </textarea>`)
              .open();
          },
        }
      ],
    });*/
  }
}
