import React from 'react'
import { Button } from 'semantic-ui-react'

const NegativeOrPositiveButton = ({
  negativeLabel = 'Cancel',
  positiveLabel = 'Ok',
  negativeEnabled = true,
  positiveEnabled = true,
  positiveOnClick, negativeOnClick}) => {
  return (
    <Button.Group>
      {negativeEnabled && <Button onClick={negativeOnClick}> {negativeLabel} </Button>}
      {(negativeEnabled && positiveEnabled) && <Button.Or />}
      {positiveEnabled && <Button onClick={positiveOnClick} positive>{positiveLabel}</Button>}
    </Button.Group>
  )
}

export default NegativeOrPositiveButton
