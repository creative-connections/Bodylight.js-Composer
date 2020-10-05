import * as grapesjs from 'grapesjs/dist/grapes.min.js';
//import {} from 'grapesjs-preset-newsletter';
import 'grapesjs-preset-webpage';
import 'grapesjs-lory-slider';
import grapesJsTabs from 'grapesjs-tabs';
//import  from 'grapesjs-tooltip';
import grapesjsStyleBg from 'grapesjs-style-bg';
import grapesjsCustomCode from 'grapesjs-custom-code';
import grapesjsTuiImageEditor from 'grapesjs-tui-image-editor';
import {Bodylightapi} from './bodylightapi';
import {inject} from 'aurelia-framework';
import {Bdlrange} from './types/bdlrange';
import {Bdlreceptacle} from './types/bdlreceptacle';
import {Bdlbind2previous} from './types/bdlbind2previous';
import {Bdlfmi} from './types/bdlfmi';
//import {Svgtype} from './types/svgtype';

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
      plugins: ['gjs-preset-webpage',
        'grapesjs-lory-slider',
        grapesJsTabs,
        grapesjsCustomCode,
        //      'grapesjs-tooltip',
        grapesjsTuiImageEditor,
        grapesjsStyleBg
      ],
      pluginsOpts: {
        /*'gjs-preset-webpage': {
          navbarOpts: false,
          countdownOpts: false,
          formsOpts: false
          // ... other options
        },*/
        'grapesjs-lory-slider': {
          sliderBlock: {
            category: 'Extra'
          }
        },
        grapesJsTabs: {
          tabsBlock: {
            category: 'Extra'
          }
        },
        'grapesjs-typed': {
          block: {
            category: 'Extra',
            content: {
              type: 'typed',
              'type-speed': 40,
              strings: [
                'Text row one',
                'Text row two',
                'Text row three'
              ]
            }
          }
        },
        'gjs-preset-webpage': {
          modalImportTitle: 'Import Template',
          modalImportLabel: '<div style="margin-bottom: 10px; font-size: 13px;">Paste here your HTML/CSS and click Import</div>',
          modalImportContent: function(editor) {
            return editor.getHtml() + '<style>' + editor.getCss() + '</style>';
          },
          filestackOpts: null, //{ key: 'AYmqZc2e8RLGLE7TGkX3Hz' },
          aviaryOpts: false,
          blocksBasicOpts: { flexGrid: 1 },
          customStyleManager: [{
            name: 'General',
            buildProps: ['float', 'display', 'position', 'top', 'right', 'left', 'bottom'],
            properties: [{
              name: 'Alignment',
              property: 'float',
              type: 'radio',
              defaults: 'none',
              list: [
                { value: 'none', className: 'fa fa-times'},
                { value: 'left', className: 'fa fa-align-left'},
                { value: 'right', className: 'fa fa-align-right'}
              ]
            },
            { property: 'position', type: 'select'}
            ]
          }, {
            name: 'Dimension',
            open: false,
            buildProps: ['width', 'flex-width', 'height', 'max-width', 'min-height', 'margin', 'padding'],
            properties: [{
              id: 'flex-width',
              type: 'integer',
              name: 'Width',
              units: ['px', '%'],
              property: 'flex-basis',
              toRequire: 1
            }, {
              property: 'margin',
              properties: [
                { name: 'Top', property: 'margin-top'},
                { name: 'Right', property: 'margin-right'},
                { name: 'Bottom', property: 'margin-bottom'},
                { name: 'Left', property: 'margin-left'}
              ]
            }, {
              property: 'padding',
              properties: [
                { name: 'Top', property: 'padding-top'},
                { name: 'Right', property: 'padding-right'},
                { name: 'Bottom', property: 'padding-bottom'},
                { name: 'Left', property: 'padding-left'}
              ]
            }]
          }, {
            name: 'Typography',
            open: false,
            buildProps: ['font-family', 'font-size', 'font-weight', 'letter-spacing', 'color', 'line-height', 'text-align', 'text-decoration', 'text-shadow'],
            properties: [
              { name: 'Font', property: 'font-family'},
              { name: 'Weight', property: 'font-weight'},
              { name: 'Font color', property: 'color'},
              {
                property: 'text-align',
                type: 'radio',
                defaults: 'left',
                list: [
                  { value: 'left',  name: 'Left',    className: 'fa fa-align-left'},
                  { value: 'center',  name: 'Center',  className: 'fa fa-align-center' },
                  { value: 'right',   name: 'Right',   className: 'fa fa-align-right'},
                  { value: 'justify', name: 'Justify',   className: 'fa fa-align-justify'}
                ]
              }, {
                property: 'text-decoration',
                type: 'radio',
                defaults: 'none',
                list: [
                  { value: 'none', name: 'None', className: 'fa fa-times'},
                  { value: 'underline', name: 'underline', className: 'fa fa-underline' },
                  { value: 'line-through', name: 'Line-through', className: 'fa fa-strikethrough'}
                ]
              }, {
                property: 'text-shadow',
                properties: [
                  { name: 'X position', property: 'text-shadow-h'},
                  { name: 'Y position', property: 'text-shadow-v'},
                  { name: 'Blur', property: 'text-shadow-blur'},
                  { name: 'Color', property: 'text-shadow-color'}
                ]
              }]
          }, {
            name: 'Decorations',
            open: false,
            buildProps: ['opacity', 'border-radius', 'border', 'box-shadow', 'background-bg'],
            properties: [{
              type: 'slider',
              property: 'opacity',
              defaults: 1,
              step: 0.01,
              max: 1,
              min: 0
            }, {
              property: 'border-radius',
              properties: [
                { name: 'Top', property: 'border-top-left-radius'},
                { name: 'Right', property: 'border-top-right-radius'},
                { name: 'Bottom', property: 'border-bottom-left-radius'},
                { name: 'Left', property: 'border-bottom-right-radius'}
              ]
            }, {
              property: 'box-shadow',
              properties: [
                { name: 'X position', property: 'box-shadow-h'},
                { name: 'Y position', property: 'box-shadow-v'},
                { name: 'Blur', property: 'box-shadow-blur'},
                { name: 'Spread', property: 'box-shadow-spread'},
                { name: 'Color', property: 'box-shadow-color'},
                { name: 'Shadow type', property: 'box-shadow-type'}
              ]
            }, {
              id: 'background-bg',
              property: 'background',
              type: 'bg'
            }]
          }, {
            name: 'Extra',
            open: false,
            buildProps: ['transition', 'perspective', 'transform'],
            properties: [{
              property: 'transition',
              properties: [
                { name: 'Property', property: 'transition-property'},
                { name: 'Duration', property: 'transition-duration'},
                { name: 'Easing', property: 'transition-timing-function'}
              ]
            }, {
              property: 'transform',
              properties: [
                { name: 'Rotate X', property: 'transform-rotate-x'},
                { name: 'Rotate Y', property: 'transform-rotate-y'},
                { name: 'Rotate Z', property: 'transform-rotate-z'},
                { name: 'Scale X', property: 'transform-scale-x'},
                { name: 'Scale Y', property: 'transform-scale-y'},
                { name: 'Scale Z', property: 'transform-scale-z'}
              ]
            }]
          }, {
            name: 'Flex',
            open: false,
            properties: [{
              name: 'Flex Container',
              property: 'display',
              type: 'select',
              defaults: 'block',
              list: [
                { value: 'block', name: 'Disable'},
                { value: 'flex', name: 'Enable'}
              ]
            }, {
              name: 'Flex Parent',
              property: 'label-parent-flex',
              type: 'integer'
            }, {
              name: 'Direction',
              property: 'flex-direction',
              type: 'radio',
              defaults: 'row',
              list: [{
                value: 'row',
                name: 'Row',
                className: 'icons-flex icon-dir-row',
                title: 'Row'
              }, {
                value: 'row-reverse',
                name: 'Row reverse',
                className: 'icons-flex icon-dir-row-rev',
                title: 'Row reverse'
              }, {
                value: 'column',
                name: 'Column',
                title: 'Column',
                className: 'icons-flex icon-dir-col'
              }, {
                value: 'column-reverse',
                name: 'Column reverse',
                title: 'Column reverse',
                className: 'icons-flex icon-dir-col-rev'
              }]
            }, {
              name: 'Justify',
              property: 'justify-content',
              type: 'radio',
              defaults: 'flex-start',
              list: [{
                value: 'flex-start',
                className: 'icons-flex icon-just-start',
                title: 'Start'
              }, {
                value: 'flex-end',
                title: 'End',
                className: 'icons-flex icon-just-end'
              }, {
                value: 'space-between',
                title: 'Space between',
                className: 'icons-flex icon-just-sp-bet'
              }, {
                value: 'space-around',
                title: 'Space around',
                className: 'icons-flex icon-just-sp-ar'
              }, {
                value: 'center',
                title: 'Center',
                className: 'icons-flex icon-just-sp-cent'
              }]
            }, {
              name: 'Align',
              property: 'align-items',
              type: 'radio',
              defaults: 'center',
              list: [{
                value: 'flex-start',
                title: 'Start',
                className: 'icons-flex icon-al-start'
              }, {
                value: 'flex-end',
                title: 'End',
                className: 'icons-flex icon-al-end'
              }, {
                value: 'stretch',
                title: 'Stretch',
                className: 'icons-flex icon-al-str'
              }, {
                value: 'center',
                title: 'Center',
                className: 'icons-flex icon-al-center'
              }]
            }, {
              name: 'Flex Children',
              property: 'label-parent-flex',
              type: 'integer'
            }, {
              name: 'Order',
              property: 'order',
              type: 'integer',
              defaults: 0,
              min: 0
            }, {
              name: 'Flex',
              property: 'flex',
              type: 'composite',
              properties: [{
                name: 'Grow',
                property: 'flex-grow',
                type: 'integer',
                defaults: 0,
                min: 0
              }, {
                name: 'Shrink',
                property: 'flex-shrink',
                type: 'integer',
                defaults: 0,
                min: 0
              }, {
                name: 'Basis',
                property: 'flex-basis',
                type: 'integer',
                units: ['px', '%', ''],
                unit: '',
                defaults: 'auto'
              }]
            }, {
              name: 'Align',
              property: 'align-self',
              type: 'radio',
              defaults: 'auto',
              list: [{
                value: 'auto',
                name: 'Auto'
              }, {
                value: 'flex-start',
                title: 'Start',
                className: 'icons-flex icon-al-start'
              }, {
                value: 'flex-end',
                title: 'End',
                className: 'icons-flex icon-al-end'
              }, {
                value: 'stretch',
                title: 'Stretch',
                className: 'icons-flex icon-al-str'
              }, {
                value: 'center',
                title: 'Center',
                className: 'icons-flex icon-al-center'
              }]
            }]
          }
          ]
        }
      }

    });
    //workaround for regenerated ids with -2 suffix from https://github.com/artf/grapesjs/issues/1875
    this.api.editor.DomComponents.componentsById = {};
    /* add custom elements into block manager - each type/Bdl... implements static method with one argument (editor) */
    Bdlrange.addToEditor(this.api.editor);
    Bdlreceptacle.addToEditor(this.api.editor);
    Bdlbind2previous.addToEditor(this.api.editor);
    Bdlfmi.addToEditor(this.api.editor);

    //customize panels
    let pno = this.api.editor.Panels;
    //add Bodylight logo as button which triggers modal with link to github
    pno.addButton('devices-c', {
      id: 'logo',
      className: 'btn-show-json fa fa-bank',
      label: 'Bodylight Composer v2.0.alpha',
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
      command: 'sw-visibility' // Built-in command
    });

    //remove video and map from blocks
    this.api.editor.BlockManager.remove('video');
    this.api.editor.BlockManager.remove('map');
    //adding grid item as table
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
    //let pn = editor.Panels;
    // Add and beautify tooltips
    /*[['sw-visibility', 'Show Borders'], ['preview', 'Preview'], ['fullscreen', 'Fullscreen'],
      ['export-template', 'Export'], ['undo', 'Undo'], ['redo', 'Redo'],
      ['gjs-open-import-webpage', 'Import'], ['canvas-clear', 'Clear canvas']]
      .forEach(function(item) {
        pno.getButton('options', item[0]).set('attributes', {title: item[1], 'data-tooltip-pos': 'bottom'});
      });
    [['open-sm', 'Style Manager'], ['open-layers', 'Layers'], ['open-blocks', 'Blocks']]
      .forEach(function(item) {
        pno.getButton('views', item[0]).set('attributes', {title: item[1], 'data-tooltip-pos': 'bottom'});
      });
    let titles = document.querySelectorAll('*[title]');

    for (let i = 0; i < titles.length; i++) {
      let el = titles[i];
      let title = el.getAttribute('title');
      title = title ? title.trim() : '';
      if (!title) {break;}
      el.setAttribute('data-tooltip', title);
      el.setAttribute('title', '');
    }
*/
    // Show borders by default
    pno.getButton('options', 'sw-visibility').set('active', 1);


    // Store and load events
    this.api.editor.on('storage:load', function(e) { console.log('Loaded ', e); });
    this.api.editor.on('storage:store', function(e) { console.log('Stored ', e); });

    //Svgtype.addToEditor(this.api.editor);

    //load previous state -
    this.api.editor.load();
  }
}
