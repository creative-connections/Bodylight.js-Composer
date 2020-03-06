import {Bdltype} from './bdltype';
export class Bdlfmi extends Bdltype {
  static addToEditor(editor) {
    editor.DomComponents.addType('bdl-fmi', {
      isComponent: el => el.tagName === 'BDL-FMI',
      model: {
        defaults: {
          tagName: 'bdl-fmi',
          traits: ['src']
        }},
      view: {
        tagName: 'bdl-fmi',
        onRender() {
          //const attrs = this.model.getAttributes();
          this.el.innerHTML = '<button><i class="fa fa-play fa-stop fa-step-forward fa-refresh"> fmi </i></button>';
        }

        /*init: function() {
          console.log('init this:', this);
          //editor.runCommand('open-assets', {target: editor.getSelected()});
        }*/
      }

    });
    editor.BlockManager.add('bdl-fmi', {
      label: 'FMI Controller',
      content: '<bdl-fmi>FMI control</bdl-fmi>',
      category: 'Simulation'
    });
    editor.AssetManager.add('<bdl-fmi ...');
    editor.AssetManager.addType('fmi', {
      isType(value) {
        if (value.substring(0, 5) === '<bdl-fmi ') {
          return { type: 'fmi', content: value };
        } else if (typeof value === 'object' && value.type === 'fmi') return value;
      },
      view: {
        // `getPreview()` and `getInfo()` are just few helpers, you can
        // override the entire template with `template()`
        // Check the base `template()` here:
        // https://github.com/artf/grapesjs/blob/dev/src/asset_manager/view/AssetView.js
        getPreview() {
          return `<div style="text-align: center">${this.model.get('fmiContent')}</div>`;
        },
        getInfo() {
          // You can use model's properties if you passed them:
          // am.add({
          //  type: 'svg-icon',
          //  svgContent: '<svg ...',
          //  name: 'Some name'
          //  })
          //  ... then
          //  this.model.get('name');
          return '<div>FMI controller</div>';
        }
      }
    });
    editor.AssetManager.render(editor.AssetManager.getAll().filter(
      asset => asset.get('type') === 'fmi'
    ));
  }
}
