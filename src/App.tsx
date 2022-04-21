import { IDENTIFIERS as RESOURCE_IDENTIFIERS } from './config/resources'
import { englishMessages } from './i18n/en'
import { frenchMessages } from './i18n/fr'
import { AccountCreate } from './pages/accounts/AccountCreate'
import { AccountEdit } from './pages/accounts/AccountEdit'
import { AccountList } from './pages/accounts/AccountList'
import { AccountShow } from './pages/accounts/AccountShow'
import { LoginPage } from './pages/login/LoginPage'
import { addUploadCapabilities } from './providers/http/addUploadCapabilities'
import { authProvider } from './providers/http/authProvider'
import { configuredProvider } from './providers/http/provider'
import SupervisedUserCircleIcon from '@material-ui/icons/SupervisedUserCircle'
import polyglotI18nProvider from 'ra-i18n-polyglot'
import React from 'react'
import { Admin, Resource } from 'react-admin'

const messages = {
  fr: frenchMessages,
  en: englishMessages
}
const i18nProvider = polyglotI18nProvider((locale) => messages[locale], 'fr')

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const App = () => (
  <Admin
    /* Theme={theme} */ locale="fr"
    i18nProvider={i18nProvider}
    dataProvider={addUploadCapabilities(configuredProvider)}
    authProvider={authProvider}
    loginPage={LoginPage}
  >
    {(permissions) => [
      permissions === 'ADMIN' ? (
        <Resource
          name={RESOURCE_IDENTIFIERS.ACCOUNT}
          list={AccountList}
          show={AccountShow}
          edit={AccountEdit}
          create={AccountCreate}
          icon={SupervisedUserCircleIcon}
        />
      ) : null,
      <Resource name={RESOURCE_IDENTIFIERS.ENUM} icon={SupervisedUserCircleIcon} />
    ]}
  </Admin>
)
