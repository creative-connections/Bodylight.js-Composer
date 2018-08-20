export default function getModel (id) {
  if (models[id]) {
    return models[id]
  }
  return null
}
