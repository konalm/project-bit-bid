import React from 'react'
import Header from '../reuse/header'

/**
 * Login JSX
 */
const Login = (props) => {
  return (
    <div>
      <Header />

      <div className="container">
        <h1>Login</h1>

        <form className="form-horizontal" onSubmit={(event) => props.submitLogin(event)}>
          <fieldset>
            {/* email */}
            <div className="form-group">
              <label htmlFor="inputEmail" className="col-lg-2 control-label">
                Email
              </label>

              <div className="col-lg-10">
                <input
                  type="text"
                  className="form-control"
                  id="inputEmail"
                  placeholder="Email"
                  onChange={props.handleEmailChange}
                  required
                />
              </div>
            </div>

            {/* password */}
            <div className="form-group">
              <label htmlFor="inputPassword" className="col-lg-2 control-label">
                Password
              </label>

              <div className="col-lg-10">
                <input
                  type="password"
                  className="form-control"
                  id="inputPassword"
                  placeholder="Password"
                  onChange={props.handlePasswordChange}
                  required
                />
              </div>
            </div>

            {/* login button */}
            <div className="form-group">
              <div className="col-lg-10 col-lg-offset-2">
                <button
                  type="submit"
                  className="btn btn-primary"
                >
                  Login
                </button>
              </div>
            </div>

            {/* feedback message */}
            <div className="form-group">
              <div className="col-lg-10 col-lg-offset-2">
                {props.feedbackMessage}
              </div>
            </div>
          </fieldset>
        </form>
      </div>
    </div>
  )
}

export default Login;
