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

const findArrays = (variables, parameters) => {
  variables = Object.values(variables)
  parameters = Object.values(parameters)

  let c = 0
  const providers = variables.concat(parameters).sort((a, b) => {
    c = c + 1
    return a.name.localeCompare(b.name)
  })

  const arrays = {}

  providers.forEach(provider => {
    // find if the provider id ends with [#] - this is an array variable
    if (/.*\[[0-9]*\]$/.test(provider.name) === false) {
      return null
    }

    // parse common name out of the provider ('cname[32]' becomes 'cname')
    const name = provider.name.match(/(.*)\[[0-9]*\]$/)[1]

    if (typeof arrays[name] === 'undefined') {
      arrays[name] = {}
    }

    arrays[name][provider.name] = {
      name: provider.name,
      reference: provider.reference
    }
  })
}

const parseModelDescription = (xml) => {
  var domParser = new DOMParser()
  var doc = domParser.parseFromString(xml, 'application/xml')
  var resolver = doc.createNSResolver(
    doc.ownerDocument == null
      ? doc.documentElement
      : doc.ownerDocument.documentElement
  )

  var output = {}

  // TODO catch errors
  output.variables = parseVariables(resolver, doc)
  output.parameters = parseParameters(resolver, doc)
  output.arrays = findArrays(output.variables, output.parameters)

  output.modelName = parseFmiModelDescriptionAttribute(resolver, doc, 'modelName')
  output.guid = parseFmiModelDescriptionAttribute(resolver, doc, 'guid')
  output.description = parseFmiModelDescriptionAttribute(resolver, doc, 'description')
  output.generationTool = parseFmiModelDescriptionAttribute(resolver, doc, 'generationTool')
  output.generationDateAndTime = parseFmiModelDescriptionAttribute(resolver, doc, 'generationDateAndTime')

  output.modelIdentifier = parseCoSimulationAttribute(resolver, doc, 'modelIdentifier')

  return output
}

export default parseModelDescription
