import { Auth } from 'aws-amplify'

export const login = (values, onResult) => dispatch => 
  Auth.signIn(values.username, values.password)
    .then(user => {
      dispatch({ type: "LOGIN_SUCCESS", payload: user })
      onResult()
    })
    .catch(error => {
      dispatch({ type: "LOGIN_FAILED", payload: error })
      onResult()
    })

export const signup = (values, onResult) => dispatch =>
  Auth.signUp(values.username, values.password)
    .then(data => {
      dispatch({ type: "SIGNUP_SUCCESS", payload: data })
      onResult()
    })
    .catch(error => {
      dispatch({ type: "SIGNUP_FAILED", payload: error })
      onResult()
    })

export const signout = () => dispatch => 
  Auth.signOut({ global: true })
    .then(() => dispatch({ type: "SIGNOUT_SUCCESS" }))
    .catch(error => dispatch({ type: "SIGNOUT_FAILED", payload: error }))

export const checkLoginStatus = () => dispatch => 
  Auth.currentAuthenticatedUser()
    .then(user => dispatch({ type: "UPDATE_CURRENT_USER_STATUS", payload: user }))
    .catch(error => dispatch({ type: "UPDATE_LOGIN_STATUS"}))