import slugid from 'slugid'

const generateID = () => {
  return slugid.nice()
}

export default generateID
