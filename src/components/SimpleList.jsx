import React from 'react'

const SimpleList = ({data}) => {
  return (
    <ul className='SimpleList'>
      {
        data.map((el, i) => {
          return <li key={i}>{el}</li>
        })
      }
    </ul>
  )
}

export default SimpleList
