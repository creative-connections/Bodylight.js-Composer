import {Bdltype} from './bdltype';

export class Bdlrange extends Bdltype {
  static addToEditor(editor) {
    /* range */

    editor.DomComponents.addType('bdl-range',
      { isComponent: el=> el.tagName === 'BDL-RANGE',
        model: {defaults: {
          tagName: 'bdl-range',
          //attributes: {min: 0, max: 100, default: 0, step: 1 },
          traits: ['min', 'max', 'default', 'step']
        },
        init: function() {
          this.set('attributes', {  id: Bdltype.getseqid(), min: 0, max: 100, default: 0, step: 1 });
        }
        },
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

    editor.BlockManager.add('bdl-range', {
      label: 'Range',
      content: '<bdl-range> This is Range3</bdl-range>',
      category: 'Basic'
    });
  }
}
