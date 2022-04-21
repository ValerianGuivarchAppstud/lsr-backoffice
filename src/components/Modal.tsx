import { configuration } from '../config/config'
import { httpClient } from '../providers/http/httpClient'
import Dialog from '@material-ui/core/Dialog'
import DialogContent from '@material-ui/core/DialogContent'
import DialogTitle from '@material-ui/core/DialogTitle'
import React, { useEffect, useState } from 'react'
import { SimpleForm } from 'react-admin'

export const Modal = (props) => {
  const [reference, setReference] = useState('')
  const [method, setMethod] = useState('post')

  useEffect(() => {
    setReference(props.reference)
    setMethod(props.method)
  }, [])

  const handleOnSubmit = (e) =>
    httpClient({
      method,
      data: e,
      url: `${configuration.apiUrl}/${reference}`
    }).then(() => props.onClose())

  return (
    <Dialog fullWidth open={props.open} onBackdropClick={props.onClose} onEscapeKeyDown={props.onClose}>
      <DialogTitle>{props.title}</DialogTitle>
      <DialogContent>
        <SimpleForm save={handleOnSubmit} children={props.children} />
      </DialogContent>
    </Dialog>
  )
}
