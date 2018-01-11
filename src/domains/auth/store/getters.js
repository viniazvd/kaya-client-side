import { isEmpty } from 'lodash'

export const isAuthenticated = ({ token }) => !isEmpty(token)
