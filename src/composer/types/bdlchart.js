export class Bdlchart extends Bdltype {
  static addButton(editor) {
    editor.BlockManager.add('bdl-chart', {
      label: 'Chart',
      content: '<bdl-chart> This is Chart</bdl-chart>',
      category: 'Basic'
    });
  }
  static addType(editor) {
    editor.DomComponents.addType('bdl-chart',
      {
        isComponent: el => el.tagName === 'BDL-CHART',
        model: {
          defaults: {
            tagName: 'bdl-chart',
            traits: ['x', 'y', 'legend']
          }
        }
      });
  }
}
