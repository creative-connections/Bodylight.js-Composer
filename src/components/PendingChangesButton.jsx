import React from 'react'
import NegativeOrPositiveButton from '@components/NegativeOrPositiveButton'
import { Button } from 'semantic-ui-react'

const PendingChangesButton = ({ pending = false, onApply, onCancel }) => {
  if (pending) {
    return <NegativeOrPositiveButton
      negativeLabel='Cancel'
      positiveLabel='Apply changes'
      positiveOnClick={onApply}
      negativeOnClick={onCancel}
    />
  }
  return <Button.Group>
    <Button.Or text='✔' />
    <Button positive disabled>{'All changes saved'}</Button>
  </Button.Group>
}

export default PendingChangesButton
