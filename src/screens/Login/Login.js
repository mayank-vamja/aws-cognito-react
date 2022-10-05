import React, { useEffect } from "react"
import { Formik, ErrorMessage, Form, Field } from "formik"
import { useDispatch, useSelector } from "react-redux"
import { login, checkLoginStatus } from "../../store/authActions"
import { useHistory, Link } from "react-router-dom"

const Login = () => {

  const history = useHistory()
  const dispatch = useDispatch()
  const {loginError, loginStatus} = useSelector(state => state)

  useEffect(() => { dispatch(checkLoginStatus()) }, [dispatch])
  useEffect(() => { loginStatus && history.push("/home") }, [loginStatus, history])

  return (
    <>
      <div className="jumbotron jumbotron-fluid bg-primary text-white">
        <div className="container">
          <h1 className="display-4">Login</h1>
        </div>
      </div>

      <Formik
        initialValues={{ username: '', password: '' }}
        validate={values => {
          let errors = {};
          if (!values.username)
            errors.username = 'Username Required';
          if (!values.password)
            errors.password = 'Password Required';
          return errors;
        }}
        onSubmit={(values, { setSubmitting }) => {
          dispatch(login(values, () => setSubmitting(false)))
        }}
      >
        {({ isSubmitting }) => (
            <Form className="container">
              <div className="form-group">
                <label htmlFor="username">Username</label>
                <Field className="form-control" id="username" name="username" type="text" />
                <ErrorMessage className="mt-2 alert alert-danger" role="alert" name="username" component="div" />
              </div>
              <div className="form-group">
                <label htmlFor="password">Password</label>
                <Field className="form-control" id="password" name="password" type="password" />
                <ErrorMessage className="mt-2 alert alert-danger" role="alert" name="password" component="div" />
              </div>
              <button className="btn btn-primary" type="submit" disabled={isSubmitting}>Submit</button>
              <p className="m-2">New User ? 
                <Link to="/signup">Click here to Sign up</Link>
              </p>
            {loginError && <div class="mt-5 alert alert-danger" role="alert">
              <h4 class="alert-heading">Unable to Login</h4>
              <p>An error occured while login.</p>
              <hr />
              <p class="mb-0">{loginError.message}</p>
            </div>}

            </Form>
          )}
      </Formik>
    </>
  )
}

export default Login