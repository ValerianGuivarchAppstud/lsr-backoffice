import { Modal } from '../../components/Modal'
import { ListActionsCreateExport } from '../../config/components'
import IconButton from '@material-ui/core/IconButton'
import AddIcon from '@material-ui/icons/Add'
import React, { useState } from 'react'
import { Datagrid, List, TextField, DateField, Filter, TextInput } from 'react-admin'

const AccountFilter = (props) => (
  <Filter {...props}>
    <TextInput label="email" source="qEmail" alwaysOn />
    <TextInput label="id" source="qId" alwaysOn />
    <TextInput label="statut" source="qStatus" alwaysOn />
    <TextInput label="authorité" source="qAuthority" alwaysOn />
  </Filter>
)

export const AccountList = (props) => {
  const [showCreateModal, setShowCreateModal] = useState(false)

  const CreateModalOpenButton = () => (
    <IconButton size="small" color="primary" onClick={() => setShowCreateModal(true)}>
      <AddIcon />
    </IconButton>
  )

  return (
    <>
      <List
        {...props}
        actions={<ListActionsCreateExport createButton={<CreateModalOpenButton />} />}
        sort={{ field: 'created_date', order: 'DESC' }}
        filters={<AccountFilter />}
      >
        <Datagrid rowClick="show">
          <TextField source="id" />
          <TextField source="email" />
          <TextField source="authority" label="Authorité" />
          <DateField source="createdDate" label="Date de création" />
        </Datagrid>
      </List>
      <Modal
        open={showCreateModal}
        title="Create account"
        onClose={() => setShowCreateModal(false)}
        reference="accounts"
        method="post"
      >
        <TextInput source="email" />
        <TextInput source="authority" label="Authorité" />
      </Modal>
    </>
  )
}
