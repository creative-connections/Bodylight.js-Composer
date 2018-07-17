import React from 'react'

const SimpleList = ({data, style}) => {
  return (
    <ul className='SimpleList' style={style}>
      {
        data.map((el, i) => {
          return <li key={i}>{el}</li>
        })
      }
    </ul>
  )
}

export default SimpleList
