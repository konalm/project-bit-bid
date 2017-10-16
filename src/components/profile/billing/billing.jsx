import React from 'react'

import Header from '../../reuse/header'
import ProfileSidebar from '../profile-sidebar'

/**
 * Select Currency JSX
 */
const SelectCurrency = ({props}) => {
  return (
    <div className="form-group">
      <label htmlFor="selectCurrency">
        Currency
      </label>

      <div className="input-group">
        <select className="form-control" onChange={props.handleCurrencyChange}>
          {
            Object.keys(props.allCurrencies).map(currency => {
              return (
                <option value={currency}>
                  {props.allCurrencies[currency]}
                </option>
              )
            })
          }
        </select>
      </div>
    </div>
  )
}

/**
 * Form JSX
 */
const Form = ({props}) => {
  return (
    <form role="form" onSubmit={props.submitCard} id="cardDetails">
      {/* card number */}
      <div className="form-group">
        <label htmlFor="cardNumber">
          CARD NUMBER
        </label>

        <div className="input-group">
          <input
            type="number"
            className="form-control"
            id="cardNumber"
            placeholder={props.cardPlaceholder}
            data-stripe='number'
            onChange={props.handleNumberChange}
            required autoFocus
            value={props.cardNumber}
          />

          <span className="input-group-addon">
            <span className="glyphicon glyphicon-lock"></span>
          </span>
        </div>
      </div>

      <div className="row">
        <div className="col-xs-7 col-md-7">
          {/* expiration date */}
          <div className="form-group">
            <label htmlFor="expityMonth">
              EXPIRY DATE
            </label>

            {/* expiration month */}
            <div className="col-xs-6 col-lg-6 pl-ziro">
              <input
                type="number"
                className="form-control"
                id="expityMonth"
                placeholder="MM"
                data-stripe='exp-month'
                onChange={props.handleExpMonthChange}
                value={props.expMonth}
                required
              />
            </div>

            {/* expiration year */}
            <div className="col-xs-6 col-lg-6 pl-ziro">
              <input
                type="number"
                className="form-control"
                id="expityYear"
                placeholder="YY"
                data-stripe='exp-year'
                onChange={props.handleExpYearChange}
                value={props.expYear}
                required
              />
            </div>
          </div>
        </div> {/* col */}

        <div className="col-xs-5 col-md-5 pull-right">
          {/* cvc code */}
          <div className="form-group">
            <label htmlFor="cvCode">
              CV CODE
            </label>

            <input
              type="password"
              className="form-control"
              id="cvCode"
              placeholder="CVC"
              data-stripe='cvc'
              onChange={props.handleCvcChange}
              value={props.cvc}
              required
            />
          </div>
        </div>
      </div>

      <SelectCurrency props={props} />

      <br/>

      {/* feedback response */}
      {props.feedback &&
        <div className="input-group">
          {props.feedback}
          <br /> <br />
        </div>
      }

      <button
        type="submit"
        className="btn btn-success btn-lg btn-block"
        role="button"
      >
        Update Card Details
      </button>
    </form>
  )
}

/**
 * Billing JSX
 */
const Billing = (props) => {
  return (
    <div>
      <Header />

      <div className="container">
        <div className="row">
          <h2>Profile</h2>
          <hr />
        </div>

        <div className="row">
          <ProfileSidebar />

          <div className="col-lg-8">
            <h3>Card Details</h3>
            <br /> <br />

            <div className="container">
              <div className="row">
                <div className="col-xs-12 col-md-4">
                  <div className="panel panel-default">
                    <div className="panel-heading">
                      <h3 className="panel-title">Card Details</h3>
                    </div>

                    <div className="panel-body">
                      <Form props={props} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Billing;
