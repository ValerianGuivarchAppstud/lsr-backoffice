import React from 'react'
import { Create, FormTab, TabbedForm, TextInput, ReferenceInput, SelectInput } from 'react-admin'

export const AccountCreate = (props) => (
  <Create {...props}>
    <TabbedForm redirect="show">
      <FormTab label="Détails">
        <TextInput source="email" label="Email" />
        <TextInput source="password" label="Mot de passe" />
        <ReferenceInput
          label="Autorité"
          source="authority"
          reference="enums"
          key="authority"
          filter={{ enum: 'authority' }}
        >
          <SelectInput optionText="name" />
        </ReferenceInput>
      </FormTab>
    </TabbedForm>
  </Create>
)
