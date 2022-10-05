import React, { useEffect } from "react"
import { Link } from "react-router-dom"
import { useSelector, useDispatch } from "react-redux"
import { checkLoginStatus, signout } from "../../store/authActions"

const Home = () => {

  const { loginStatus, loggedInUser, isStatusChecked } = useSelector(state => state)
  const dispatch = useDispatch()

  useEffect(() => {dispatch(checkLoginStatus())}, [dispatch])

  return loginStatus && loggedInUser ? (
    <>
      <div className="jumbotron jumbotron-fluid bg-primary text-white">
        <div className="container">
          <h1 className="display-4">Home</h1>
        </div>
      </div>
      <div className="container">
        <h3>{loggedInUser.username}</h3>
        {loggedInUser.signInUserSession && <>
          <div className="mt-3 card">
            <div className="card-body">
              {`Access Token : ${loggedInUser.signInUserSession.accessToken.jwtToken}`}
            </div>
          </div>
          <div className="mt-3 card">
            <div className="card-body">
              {`Refresh Token : ${loggedInUser.signInUserSession.refreshToken.token}`}
            </div>
          </div>
        </>}

        <button className="mt-3 mb-5 btn btn-primary" onClick={() => {dispatch(signout())}}>
          Log Out
        </button>
      </div>
    </>
  ) : isStatusChecked ? (
      <div className="jumbotron jumbotron-fluid">
        <div className="container">
          <h1 className="display-4">You must Login or Register</h1>
          <p><Link to="/">Login</Link></p>
          <p><Link to="/signup">Sign Up</Link></p>
        </div>
      </div>
    ) : <div className="jumbotron jumbotron-fluid bg-primary text-white">
        <div className="container">
          <h1 className="display-4">Loading...</h1>
        </div>
      </div>
}

export default Home