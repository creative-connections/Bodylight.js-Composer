const parseVariables = (resolver, doc) => {
  var variables = {}

  var variableIterator = doc.evaluate(
    '//ScalarVariable[not(@causality="parameter")]',
    doc,
    resolver,
    XPathResult.UNORDERED_NODE_ITERATOR_TYPE,
    null
  )

  var node = variableIterator.iterateNext()
  while (node) {
    const name = node.getAttribute('name')
    variables[name] = {
      'name': node.getAttribute('name'),
      'reference': node.getAttribute('valueReference'),
      'description': node.getAttribute('description'),
      'causality': node.getAttribute('causality'),
      'variability': node.getAttribute('variability'),
      'initial': node.getAttribute('initial'),
      'canHandleMultipleSetPerTimeInstant':
          node.getAttribute('canHandleMultipleSetPerTimeInstant')
    }
    node = variableIterator.iterateNext()
  }
  return variables
}

const parseParameters = (resolver, doc) => {
  var parameters = {}

  var parmIterator = doc.evaluate(
    '//ScalarVariable[@causality="parameter"]',
    doc,
    resolver,
    XPathResult.UNORDERED_NODE_ITERATOR_TYPE,
    null
  )

  var node = parmIterator.iterateNext()
  while (node) {
    var name = node.getAttribute('name')
    parameters[name] = {
      'name': node.getAttribute('name'),
      'reference': node.getAttribute('valueReference'),
      'description': node.getAttribute('description'),
      'causality': node.getAttribute('causality'),
      'variability': node.getAttribute('variability'),
      'initial': node.getAttribute('initial'),
      'canHandleMultipleSetPerTimeInstant':
      node.getAttribute('canHandleMultipleSetPerTimeInstant')
    }
    node = parmIterator.iterateNext()
  }

  return parameters
}

const parseFmiModelDescriptionAttribute = (resolver, doc, attr) => {
  const node = doc.evaluate(
    '//fmiModelDescription',
    doc, resolver,
    XPathResult.ELEMENT_NODE, null
  ).iterateNext()
  return node.getAttribute(attr)
}

const parseCoSimulationAttribute = (resolver, doc, attr) => {
  const node = doc.evaluate(
    '//CoSimulation',
    doc, resolver,
    XPathResult.ELEMENT_NODE, null
  ).iterateNext()
  return node.getAttribute(attr)
}

export default class ModelDescriptionParser {
  parse (xml) {
    var domParser = new DOMParser()
    var doc = domParser.parseFromString(xml, 'application/xml')
    var resolver = doc.createNSResolver(
      doc.ownerDocument == null
        ? doc.documentElement
        : doc.ownerDocument.documentElement
    )

    // TODO catch errors
    this.variables = parseVariables(resolver, doc)
    this.parameters = parseParameters(resolver, doc)

    this.modelName = parseFmiModelDescriptionAttribute(resolver, doc, 'modelName')
    this.guid = parseFmiModelDescriptionAttribute(resolver, doc, 'guid')
    this.description = parseFmiModelDescriptionAttribute(resolver, doc, 'description')
    this.generationTool = parseFmiModelDescriptionAttribute(resolver, doc, 'generationTool')
    this.generationDateAndTime = parseFmiModelDescriptionAttribute(resolver, doc, 'generationDateAndTime')

    this.modelIdentifier = parseCoSimulationAttribute(resolver, doc, 'modelIdentifier')
  }
}
