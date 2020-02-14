export class Bdlfmi extends Bdltype {
  static addButton(editor) {
    editor.BlockManager.add('bdl-fmi', {
      label: 'FMI Model',
      content: '<bdl-fmi> This is FMI model</bdl-fmi>',
      category: 'Basic'
    });
  }
  static addType(editor) {
    editor.DomComponents.addType('bdl-fmi',
      {
        isComponent: el => el.tagName === 'BDL-FMI',
        model: {
          defaults: {
            tagName: 'bdl-fmi',
            traits: ['min', 'max', 'current']
          }
        }
      });
  }
}
