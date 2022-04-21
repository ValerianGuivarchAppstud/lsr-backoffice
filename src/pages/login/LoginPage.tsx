import { withStyles } from '@material-ui/core/styles'
import React from 'react'
// eslint-disable-next-line import/order
import { Login } from 'react-admin'

// eslint-disable-next-line @typescript-eslint/no-var-requires
const bg = require('../../assets/images/wave.jpg')

const styles = {
  container: {
    backgroundPosition: 'center'
  }
}

const CustomLogin = withStyles({
  card: { marginTop: '13rem' }
})(Login)

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
export const LoginPage: any = withStyles(styles)(({ classes }) => (
  <CustomLogin className={classes.container} backgroundImage={bg} />
))
