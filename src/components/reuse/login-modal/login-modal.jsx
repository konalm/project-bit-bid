import React from 'react'
import {Link} from 'react-router-dom'


/**
 * Login Modal JSX
 */
const LoginModal = (props) => {
  return (
    <div>
      <div id="loginModal" className="modal fade" role="dialog">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <button type="button" className="close" data-dismiss="modal">
                &times;
              </button>

              <h4 className="modal-title"> Login Required </h4>
            </div>

            <div className="modal-body">
              <p> {props.message} </p>
            </div>

            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-default "
                onClick={(event) => props.redirectToLogin(event)}
              >
                Login
              </button>

              <button
                type="button"
                className="btn btn-default"
                onClick={(event) => props.redirectToRegister(event)}
              >
                Register An Account
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default LoginModal;
