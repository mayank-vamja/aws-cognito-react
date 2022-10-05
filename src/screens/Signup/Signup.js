import React, { useEffect } from "react"
import { Formik, Form, Field, ErrorMessage } from "formik";
import { signup } from "../../store/authActions";
import { useSelector, useDispatch } from "react-redux";
import { useHistory, Link } from "react-router-dom";

const Signup = () => {

  const history = useHistory()
  const dispatch = useDispatch()
  const { signupResponse, loginStatus, loggedInUser } = useSelector(state => state)

  useEffect(() => { if(loginStatus) history.push("/home") }, [loginStatus, loggedInUser, history])

  return (
    <>
      <div className="jumbotron jumbotron-fluid bg-primary text-white">
        <div className="container">
          <h1 className="display-4">Sign Up</h1>
        </div>
      </div>

      <Formik
        initialValues={{ username: '', password: '', confirmPassword: '' }}
        validate={values => {
          let errors = {};
          if (!values.username)
            errors.username = 'Required'
          if (!values.password)
            errors.password = 'Required'
          if (!values.confirmPassword)
            errors.confirmPassword = 'Required'
          if (values.confirmPassword !== values.password)
            errors.confirmPassword = 'Both Passwords should match'
          return errors;
        }}
        onSubmit={(values, { setSubmitting }) => {
          dispatch(signup(values, () => setSubmitting(false)))
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
            <div className="form-group">
              <label htmlFor="password">Confirm Password</label>
              <Field className="form-control" id="confirmPassword" name="confirmPassword" type="password" />
              <ErrorMessage className="mt-2 alert alert-danger" role="alert" name="confirmPassword" component="div" />
            </div>
            <button className="btn btn-primary" type="submit" disabled={isSubmitting}>Submit</button>
            <p className="m-2">Already a user ?
                <Link to="/">Click here to Login</Link>
            </p>
            {signupResponse && <div class={`mt-5 alert ${signupResponse.code === 1 ? "alert-success" : "alert-danger"}`} role="alert">
              <h4 class="alert-heading">{signupResponse.message}</h4>
            </div>}

          </Form>
        )}
      </Formik>
    </>
  )
}

export default Signup