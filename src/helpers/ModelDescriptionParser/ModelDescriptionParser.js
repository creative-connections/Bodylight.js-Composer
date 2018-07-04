
const parseVariables = (doc) => {
  var variables = {}

  var resolver = doc.createNSResolver(
    doc.ownerDocument == null
      ? doc.documentElement
      : doc.ownerDocument.documentElement
  )

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

const parseParameters = (doc) => {
  var parameters = {}

  var resolver = doc.createNSResolver(
    doc.ownerDocument == null
      ? doc.documentElement
      : doc.ownerDocument.documentElement
  )
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

export default class ModelDescriptionParser {
  parse (xml) {
    var domParser = new DOMParser()
    var doc = domParser.parseFromString(xml, 'application/xml')

    // TODO catch errors
    this.variables = parseVariables(doc)
    this.parameters = parseParameters(doc)

    console.log(this.variables)
    console.log(this.parameters)
  }
}
