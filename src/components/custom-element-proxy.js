import {bindable, inlineView, inject} from 'aurelia-framework';

@inlineView('<template><slot></slot></template>')
@inject(Element)
export class CustomElementProxyCustomElement {
  @bindable customElement;
  @bindable attributes;
  element;
  customEl;

  constructor(element) {
    this.element = element;
  }

  attached() {
    this.customEl = document.createElement(this.customElement);
    const children = this.element.childNodes;
    while (children.length) {
      this.customEl.appendChild(children[0]);
    }
    this.element.appendChild(this.customEl);
    this.attributesChanged(this.attributes);
  }

  attributesChanged(newVal) {
    if (!this.customEl) return;
    for (const attr of Object.keys(newVal)) {
      this.customEl.setAttribute(attr, newVal[attr]);
    }
  }
}
