import React from 'react'
import { BeatLoader } from 'react-spinners'

const BusySignal = ({isBusy = true, children}) => {
  if (isBusy) {
    return (
      <div className='BusySignal'>
        <BeatLoader color={'#123abc'} loading={true} />
      </div>
    )
  }

  return children
}

export default BusySignal
