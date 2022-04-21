import { ShowActionsEdit } from '../../config/components'
import React from 'react'
import { Show, Tab, TabbedShowLayout, TextField } from 'react-admin'

export const AccountShow = (props) => (
  <Show actions={<ShowActionsEdit />} {...props}>
    <TabbedShowLayout>
      <Tab label="Détails">
        <TextField source="email" label="Email" />
        <TextField source="authority" label="Autorité" />
      </Tab>
    </TabbedShowLayout>
  </Show>
)
