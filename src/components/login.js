import React from 'react';
import Header from './reuse/header'
import axios from 'axios'
import cookies from 'js-cookie'


class Login extends React.Component {
  constructor () {
    super();

    this.state = {
      email: '',
      password: '',
    }

    this.sendLoginCredentials = this.sendLoginCredentials.bind(this);
    this.handleEmailChange = this.handleEmailChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
  }

  /* set state of email on change */
  handleEmailChange(event) {
    this.setState({email: event.target.value});
  }

  /* set state of password on change */
  handlePasswordChange(event) {
    this.setState({password: event.target.value});
  }

  sendLoginCredentials(e) {
    e.preventDefault();

    axios.post('http://localhost:8080/api/login', {
      email: this.state.email,
      password: this.state.password
    })
      .then(res => {
        console.log('res --->');
        console.log(res);

        console.log('token -->');
        console.log(res.data.token);

        cookies.set('bit_bid_key', res.data.token);
      })

    console.log('login !!');
  }

  render() {
    return (
      <div>
        <Header />

        <div className="container">
          <h1>Login</h1>

          <form className="form-horizontal">
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
                    onChange={this.handleEmailChange}
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
                    onChange={this.handlePasswordChange}
                  />
                </div>
              </div>

              {/* login button */}
              <div className="form-group">
                <div className="col-lg-10 col-lg-offset-2">
                  <button
                    type="submit"
                    className="btn btn-primary"
                    onClick={this.sendLoginCredentials}
                  >
                    Login
                  </button>
                </div>
              </div>
            </fieldset>
          </form>
        </div>
      </div>
    );
  }
};

export default Login;
