const initialState = {
  token:  null,
  loggedInUser: null,
  loginStatus: false,
  loginError: null,
  signupResponse: null,
  signoutError: null,
  isStatusChecked: true,
}

const authReducer = (state = initialState, { type, payload }) => {
  switch(type) {
    case "LOGIN_SUCCESS":
      return { ...state, loggedInUser: payload, loginStatus: true, loginError: null }
    case "LOGIN_FAILED":
      return { ...state, loggedInUser: null, loginStatus: false, loginError: payload }

    case "SIGNUP_SUCCESS":
      return payload.userConfirmed
        ? ({ ...state, loggedInUser: payload, loginStatus: true, signupResponse: {code: 1, message: "Registered Successfully."} })
        : ({ ...state, loginStatus: false, signupResponse: {code:1, message: "Registered, but need to confirm account."} })
      
    case "SIGNUP_FAILED":
      return { ...state, loggedInUser: null, loginStatus: false, signupResponse: {code: 0, message:payload.message} }

    case "SIGNOUT_SUCCESS":
      return { ...initialState }
    case "SIGNOUT_FAILED":
      return { ...state, signoutError: payload }

    case "UPDATE_CURRENT_USER_STATUS":
      return { ...state, loggedInUser: payload, loginStatus: true, loginError: null, signupResponse: null, isStatusChecked: true }
    case "UPDATE_LOGIN_STATUS":
      return { ...initialState, isStatusChecked: true }

    default:
      return {...state}
  }
}

export default authReducer