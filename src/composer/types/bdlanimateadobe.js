import {Bdltype} from './bdltype';

export class BdlanimateAdobe extends Bdltype {
  static addToEditor(editor) {
    editor.DomComponents.addType('bdl-animate-adobe', {
      isComponent: el => el.tagName === 'BDL-ANIMATE-ADOBE',
      model: {
        defaults: {
          tagName: 'bdl-animate-adobe',
          attributes: {src: '', width: 800, height: 600, name: '', fromid: ''},
          traits: [
            {
              type: 'text',
              label: 'src',
              name: 'src',
              placeholder: 'CardiaccycleStage.js'
            },
            {
              type: 'number',
              label: 'width',
              name: 'width',
              placeholder: '800'
            },
            {
              type: 'number',
              label: 'height',
              name: 'height',
              placeholder: '600'
            },
            {
              type: 'text',
              label: 'name',
              name: 'name',
              placeholder: 'CS'
            },
            {
              type: 'text',
              label: 'fromid',
              name: 'fromid',
              placeholder: 'idfmi'
            }
          ]
        }
      },
      view: {
        tagName: 'bdl-animate-adobe',
        onRender() {
          this.el.innerHTML = '<div style="background-color: #f0f0f0; padding: 10px; text-align:center; border:1px solid #ccc;"><i class="fa fa-play"></i> Adobe Animate Component</div>';
        }
      }
    });

    editor.BlockManager.add('bdl-animate-adobe', {
      label: 'Adobe Animation',
      content: '<bdl-animate-adobe src="" width="800" height="600" name="" fromid=""></bdl-animate-adobe>',
      category: 'Animation'
    });
  }
}
