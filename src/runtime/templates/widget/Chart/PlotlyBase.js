class Widget {}

export default class PlotlyBase extends Widget {
  constructor(configuration, typeIdentifier) {
    super(configuration, typeIdentifier)

    this.initAdditionals('shapes', this.shapes, this.shapeIndexes)
    this.initAdditionals('annotations', this.annotations, this.annotationIndexes)
    this.initAdditionals('images', this.images, this.imageIndexes)
  }

  updateComponent() {
    super.updateComponent()
    this.initPlotly()
  }

  parseAttribute(attribute) {
    if (attribute.startsWith('{')) {
      return JSON.parse(attribute)
    }
    return null
  }

  // Initializes setters for shapes, annotations, etc.
  initAdditionals(identifier, config, indexes) {
    if (config == null) { return }
    const items = Object.values(config)
    if (items.length === 0) { return }

    const complex = []
    Object.entries(items[0]).forEach(([key, value]) => {
      if (typeof value['complex'] !== 'undefined' && value['complex']) {
        complex.push(key)
      }
    })

    // create setter for each complex attribute
    complex.forEach(name => {
      this.setters[`${identifier}-${name}`] = (item) => {
        if (item == null) { return }

        const attr = config[item][name]
        if (attr.function !== null) {
          attr.value = attr.function(attr.value)
        }

        const itemIdentifier = `${identifier}[${indexes[item]}].${name}`
        Plotly.relayout(this.plotly, {
          [itemIdentifier]: attr.value
        })
      }
    })
  }

  initShapes() {
    this.shapes = this.shapes || {}
    this.shapeIndexes = []

    const shapes = []
    let index = 1
    Object.entries(this.shapes).forEach(([id, shape]) => {
      this.shapeIndexes[id] = index
      shapes[index] = {
        type: shape.type,
        name: shape.name,
        xref: shape.xref,
        yref: shape.yref,
        layer: shape.layer,
        x0: shape.x0.value,
        x1: shape.x1.value,
        y0: shape.y0.value,
        y1: shape.y1.value,
        visible: shape.visible.value,
        opacity: shape.opacity.value,
        fillcolor: shape.fillcolor.value,
        line: {
          color: shape.color.value,
          width: shape.width.value,
          dash: shape.dash.value
        },
      }
      index++
    })

    return shapes
  }

  initAnnotations() {
    this.annotations = this.annotations || {}
    this.annotationIndexes = []
    const annotations = []
    let index = 1
    Object.entries(this.annotations).forEach(([id, annotation]) => {
      this.annotationIndexes[id] = index
      annotations[index] = {
        xref: annotation.xref,
        yref: annotation.yref,
        x: annotation.x.value,
        y: annotation.y.value,
        visible: annotation.visible.value,
        opacity: annotation.opacity.value,
        font: {
          family: annotation.family.value,
          size: annotation.size.value,
          color: annotation.color.value,
        },
        bgcolor: annotation.bgcolor.value,
        bordercolor: annotation.bordercolor.value,
        width: annotation.width.value,
        height: annotation.height.value,
        text: annotation.text.value,
        showarrow: false
      }
      index++
    })
    return annotations
  }

  initImages() {
    this.images = this.images || {}
    this.imageIndexes = []
    const images = []
    let index = 1
    Object.entries(this.images).forEach(([id, image]) => {
      this.imageIndexes[id] = index
      images[index] = {
        name: image.name,
        source: image.source,
        xref: image.xref,
        yref: image.yref,
        sizing: image.sizing,
        x: image.x.value,
        y: image.y.value,
        sizex: image.sizex.value,
        sizey: image.sizey.value,
        visible: image.visible.value,
        opacity: image.opacity.value,
        layer: image.layer,
        xanchor: image.xanchor,
        yanchor: image.yanchor
      }
      index++
    })
    return images
  }
}