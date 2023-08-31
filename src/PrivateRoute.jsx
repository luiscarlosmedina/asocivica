import { Navigate, useLocation } from "react-router"

export const PrivateRoute = ({chidren}) => {
  const {state} = useLocation()

  return state?.logged ? chidren : <Navigate to='/*'/>
}
