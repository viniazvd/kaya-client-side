import { http } from '../../../support/http'

export const getEmails = () => {
  return http.get('user')
    .then(response => response.data.results.users)
}
