import toAST from 'to-ast'

export default cls => {
  const tree = toAST(cls)
  if (tree.type !== 'ClassExpression') { return }
  const nodes = tree.body.body

  const definition = []
  nodes.forEach(node => {
    if (node.kind !== 'method') { return }
    definition.push({
      parent: tree.id,
      key: node.key,
      params: node.value.params
    })
  })

  return definition
}
