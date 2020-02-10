import * as grapesjs from 'grapesjs/dist/grapes.min.js';
//import {} from 'grapesjs-preset-newsletter';
import {} from 'grapesjs-preset-webpage';
import {Bodylightapi} from './bodylightapi';
import {inject} from 'aurelia-framework';
@inject(Bodylightapi)
export class Grapesjsns {
  constructor(api) {
    this.api = api;
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
    /* range */
    this.api.editor.DomComponents.addType('bdl-range',
      { isComponent: el=> el.tagName === 'BDL-RANGE',
        model: {defaults: {
          tagName: 'bdl-range',
          attributes: {min: 0, max: 100, default: 0, step:1},
          traits: ['min', 'max', 'default','step']
        }},
        view: {
          tagName: 'bdl-range',
          onRender() {
            const attrs = this.model.getAttributes();
            this.el.innerHTML = `<div>
    <input type="range" min="${attrs.min}" max="${attrs.max}" disabled/>
    <input type="number" min="${attrs.min}" max="${attrs.max}" value="${attrs.default}"/>
</div>`;
          }
        }
      });

    this.api.editor.BlockManager.add('bdl-range', {
      label: 'Range',
      content: '<bdl-range> This is Range3</bdl-range>',
      category: 'Basic'
    });

    /* receptacle */
    this.api.editor.DomComponents.addType('bdl-receptacle',
      { isComponent: el=> el.tagName === 'BDL-RECEPTACLE',
        model: {defaults: {
          tagName: 'bdl-receptacle',
          attributes: {hx: 50, hy: 50, px: 20, py: 20, ly: 10},
          traits: ['hx', 'hy', 'px', 'py', 'ly']
        }},
        view: {
          tagName: 'bdl-receptacle',
          onRender() {
            //const attrs = this.model.getAttributes();
            this.el.innerHTML = `<svg width="60" height="60">
<path d="M 10 10 Q 10 30,30 30, 50 30, 50 50 L 50 20, 10 20" stroke="black" fill="green" fill-opacity="0.5"/>
</svg>`;
          }
        }
      });

    this.api.editor.BlockManager.add('bdl-receptacle', {
      label: 'Receptacle',
      content: '<bdl-receptacle>Receptacle</bdl-receptacle>',
      category: 'Basic'
    });

    this.api.editor.BlockManager.add('bdl-animate', {
      label: 'Animate',
      content: '<bdl-animate> This is Animate</bdl-animate>',
      category: 'Basic'
    });
    this.api.editor.BlockManager.add('bdl-chart', {
      label: 'Chart',
      content: '<bdl-chart> This is Chart</bdl-chart>',
      category: 'Basic'
    });
    this.api.editor.BlockManager.add('bdl-fmi', {
      label: 'FMI Model',
      content: '<bdl-fmi> This is FMI model</bdl-fmi>',
      category: 'Basic'
    });
    this.api.editor.BlockManager.add('bdl-action', {
      label: 'Action',
      content: '<bdl-action> This is Action</bdl-action>',
      category: 'Basic'
    });

    this.api.editor.DomComponents.addType('bdl-animate',
      { isComponent: el=> el.tagName === 'BDL-ANIMATE',
        model: {defaults: {
          tagName: 'bdl-animate',
          attributes: {min: 0, max: 100, current: 0},
          traits: ['min', 'max', 'current']
        }}});
    this.api.editor.DomComponents.addType('bdl-chart',
      { isComponent: el=> el.tagName === 'BDL-CHART',
        model: {defaults: {
          tagName: 'bdl-chart',
          traits: ['x', 'y', 'legend']
        }}});
    this.api.editor.DomComponents.addType('bdl-fmi',
      { isComponent: el=> el.tagName === 'BDL-FMI',
        model: {defaults: {
          tagName: 'bdl-fmi',
          traits: ['min', 'max', 'current']
        }}});
    this.api.editor.DomComponents.addType('bdl-action',
      { isComponent: el=> el.tagName === 'BDL-ACTION',
        model: {defaults: {
          tagName: 'bdl-action',
          traits: ['min', 'max', 'current']
        }}});

    let attr = document.createAttribute('aurelia-app');
    attr.value = 'mainwebcomponent';
    this.api.editor.Canvas.getBody().setAttributeNode(attr);

    console.log('editor:', this.api.editor);
  }
}
