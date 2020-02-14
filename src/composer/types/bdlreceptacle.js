import {Bdltype} from './bdltype';
export class Bdlreceptacle extends Bdltype {
  static addToEditor(editor) {
    editor.DomComponents.addType('bdl-receptacle',
      { isComponent: el=> el.tagName === 'BDL-RECEPTACLE',
        model: {defaults: {
          tagName: 'bdl-receptacle',
          //attributes: {hx: 50, hy: 50, px: 20, py: 20, value: 10},
          traits: ['hx', 'hy', 'px', 'py', 'value']
        },
        init: function() {
          this.set('attributes', { id: Bdltype.getseqid(), hx: 50, hy: 50, px: 20, py: 20, value: 10});
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
    editor.BlockManager.add('bdl-receptacle', {
      label: 'Receptacle',
      content: '<bdl-receptacle>Receptacle</bdl-receptacle>', // hx="50" hy="50" px="20" py="20" value="10"
      category: 'Basic'
    });
  }
}
