import {Bdltype} from './bdltype';
export class Bdlbind2previous extends Bdltype {
  static addToEditor(editor) {
  //binds 2 previous blocks - by id's


    editor.DomComponents.addType('bind2previous',
      {
        isComponent: el => el.tagName === 'BDL-BIND2PREVIOUS',
        model: {
          defaults: {
            tagName: 'bdl-bind2previous',
            attributes: {fromid: '', toid: ''},
            traits: ['fromid', 'toid']
          },
          init: function() {
            this.set('attributes', { fromid: Bdltype.getprevid2(), toid: Bdltype.getprevid1()});
            //this.set('attributes', { id: Bdltype.getseqid() });
          }},
        view: {
          tagName: 'bdl-bind2previous',
          onRender() {
            this.el.innerHTML = '<i class="fa fa-link></i>';
          }
        }
      });
    editor.BlockManager.add('bind2previous', {
      label: 'Bind 2 previous',
      content: '<bdl-bind2previous>bind2previous</bdl-bind2previous>',
      category: 'Basic'
    });
  }
}
