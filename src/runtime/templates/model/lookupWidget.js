export default function lookupWidget (type, parent, name) {
  if (type === WidgetType.ANIMATE_ANIM) {
    return this.widgets.animates[parent].components.anim[name]
  }
  if (type === WidgetType.ANIMATE_TEXT) {
    return this.widgets.animates[parent].components.text[name]
  }
}
