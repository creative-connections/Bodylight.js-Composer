export class Bdlanimate extends Bdltype {
  static addType(editor) {
    editor.DomComponents.addType('bdl-animate',
      {
        isComponent: el => el.tagName === 'BDL-ANIMATE',
        model: {
          defaults: {
            tagName: 'bdl-animate',
            attributes: {min: 0, max: 100, current: 0},
            traits: ['min', 'max', 'current']
          }
        }
      });
  }

  static addButton(editor) {
    editor.BlockManager.add('bdl-animate', {
      label: 'Animate',
      content: '<bdl-animate> This is Animate</bdl-animate>',
      category: 'Basic'
    });
  }
}
