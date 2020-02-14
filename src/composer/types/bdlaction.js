export class Bdlaction extends Bdltype {
  static addButton(editor) {
    editor.BlockManager.add('bdl-action', {
      label: 'Action',
      content: '<bdl-action> This is Action</bdl-action>',
      category: 'Basic'
    });
  }
  static addType(editor) {
    editor.DomComponents.addType('bdl-action',
      {
        isComponent: el => el.tagName === 'BDL-ACTION',
        model: {
          defaults: {
            tagName: 'bdl-action',
            traits: ['min', 'max', 'current']
          }
        }
      });
  }
}
