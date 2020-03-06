import {Bdltype} from './bdltype';
export class Svgtype extends Bdltype {
  static addToEditor(editor) {
    //add svg type
    editor.AssetManager.addType('svg-icon', {
      view: {
        updateTarget(target) {
          const svg = this.model.get('svgContent');

          // Just to make things bit interesting, if it's an image type
          // I put the svg as a data uri, content otherwise
          if (target.get('type') === 'image') {
            // Tip: you can also use `data:image/svg+xml;utf8,<svg ...` but you
            // have to escape few chars
            target.set('src', `data:mime/type;base64,${btoa(svg)}`);
          } else {
            target.set('content', svg);
          }
        },
        getPreview() {
          return `<div style="text-align: center">${this.model.get('svgContent')}</div>`;
        },
        getInfo() {
          return '<div>SVG description</div>';
        }
      },
      isType(value) {
        // The condition is intentionally simple
        if (value.substring(0, 5) === '<svg ') {
          return {
            type: 'svg-icon',
            svgContent: value
          };
        } else if (typeof value === 'object' && value.type === 'svg-icon') {
          return value;
        }
      }
    });
    //Add random svg to assets
    editor.AssetManager.add(`<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
  <path d="M22,9 C22,8.4 21.5,8 20.75,8 L3.25,8 C2.5,8 2,8.4 2,9 L2,15 C2,15.6 2.5,16 3.25,16 L20.75,16 C21.5,16 22,15.6 22,15 L22,9 Z M21,15 L3,15 L3,9 L21,9 L21,15 Z"></path>
  <polygon points="4 10 5 10 5 14 4 14"></polygon>
</svg>`);
    //render svg-icon type
    editor.AssetManager.render(editor.AssetManager.getAll().filter(
      asset => asset.get('type') === 'svg-icon'
    ));
  }
}
