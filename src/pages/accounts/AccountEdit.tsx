import React from 'react'
import { Edit, FormTab, ReferenceInput, SelectInput, TabbedForm, TextInput } from 'react-admin'

export const AccountEdit = (props) => (
  <Edit {...props}>
    <TabbedForm redirect="show">
      <FormTab label="Détails">
        <TextInput source="email" label="Email" />
        <TextInput source="password" label="Mot de passe" type="password" />
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
  </Edit>
)
