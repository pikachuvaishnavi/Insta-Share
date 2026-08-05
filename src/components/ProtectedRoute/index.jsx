import Cookie from 'js-cookie'
import {Navigate} from 'react-router'

const ProtectedRoute = ({children}) => {
  const token = Cookie.get('jwt_token')
  if (token === undefined) {
    return <Navigate to="/login" replace />
  }

  return children
}
export default ProtectedRoute
