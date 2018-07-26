import React from 'react'
import { Button } from 'semantic-ui-react'

const PendingChangesButton = ({ onApply, onCancel, display = true, pending = false, error = false }) => {
  if (!display) {
    return null
  }

  if (pending && error) {
    return <Button.Group>
      <Button.Or className='error' text='🗙' />
      <Button onClick={onCancel} negative>{'Cancel'}</Button>
    </Button.Group>
  }

  if (pending) {
    return <Button.Group>
      <Button onClick={onCancel}>{'Cancel'}</Button>
      <Button.Or />
      <Button onClick={onApply} positive>{'Apply changes'}</Button>
    </Button.Group>
  }

  return <Button.Group>
    <Button.Or text='✔' />
    <Button positive disabled>{'All changes saved'}</Button>
  </Button.Group>
}

export default PendingChangesButton
