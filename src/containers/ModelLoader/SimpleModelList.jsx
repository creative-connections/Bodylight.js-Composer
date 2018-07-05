import React from 'react'

const transformElementsToArray = (elements) => {
  const data = []
  Object.keys(elements).forEach((el) => {
    data.push(elements[el].name)
  })
  return data
}

const SimpleModelList = ({rootname, elements}) => {
  const data = transformElementsToArray(elements)
  return (
    <ul className='SimpleModelTree'>
      {
        data.map((el, i) => {
          return <li key={i}>{el}</li>
        })
      }
    </ul>
  )
}

export default SimpleModelList
