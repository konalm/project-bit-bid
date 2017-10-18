import React from 'react'

import Header from '../../reuse/header'
import ProfileSidebar from '../profile-sidebar'

/**
 * select from list of all currencies JSX
 */
const SelectCurrency = ({props}) => {
  return (
    <div className="form-group">
      <label htmlFor="selectCurrency" className="col-lg-2 control-label">
        Currency
      </label>

      <div className="input-group col-lg-10">
        <select
          className="form-control"
          onChange={(event) => props.handleCurrencyChange(event)}
        >
          {
            Object.keys(props.allCurrencies).map(currency => {
              return (
                <option
                  value={currency}
                  selected={currency === props.currency.toUpperCase()}
                >
                  {props.allCurrencies[currency]}
                </option>
              )
            })
          }
        </select>
      </div>
    </div>
  );
}

/**
 * Bank Account JSX
 */
const BankAccount = (props) => {
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
            <h3>Bank Account</h3>
            <br /> <br />

            <form
              className="form-horizontal"
              onSubmit={(event) => props.createBankAccount(event)}
            >
              <fieldset>
                <SelectCurrency props={props} />

                {/* account holder name */}
                <div className="form-group">
                  <label htmlFor="AccountHolder" className="col-lg-2 control-label">
                    Account Holder Name
                  </label>

                  <div className="col-lg-10">
                    <input
                      type="text"
                      className="form-control"
                      id="AccountHolder"
                      placeholder={props.accountHolderPlaceholder}
                      value={props.accountHolder}
                      onChange={(event) => props.handleAccountHolderChange(event)}
                      required
                    />
                  </div>
                </div>

                {/* account number */}
                <div className="form-group">
                  <label htmlFor="AccountNumber" className="col-lg-2 control-label">
                    Account Number
                  </label>

                  <div className="col-lg-10">
                    <input
                      type="number"
                      className="form-control"
                      id="AccountNumber"
                      onChange={(event) => props.handleAccountNumberChange(event)}
                      placeholder={props.accountNumberPlaceholder}
                      value={props.accountNumber}
                      required
                    />
                  </div>
                </div>

                {/* routing number */}
                <div className="form-group">
                  <label htmlFor="routingNumber" className="col-lg-2 control-label">
                    Routing Number / Sort Code
                  </label>

                  <div className="col-lg-10">
                    <input
                      type="number"
                      className="form-control"
                      id="routingNumber"
                      onChange={(event) => props.handleRoutingNumberChange(event)}
                      placeholder={props.routingNumberPlaceholder}
                      value={props.routingNumber}
                      required
                    />
                  </div>
                </div>

                {/* account type */}
                <div className="form-group">
                  <label htmlFor="AccountType" className="col-lg-2 control-label">
                    Account Type
                  </label>

                  <div className="col-lg-10">
                    <select
                      className="form-control"
                      onChange={(event) => props.handleAccountTypeChange(event)}
                      id="accountType"
                    >
                      <option value="individual">Individual</option>
                      <option value="business">Business</option>
                    </select>
                  </div>
                </div>

                {/* create bank account */}
                <div className="form-group">
                  <div className="col-lg-10 col-lg-offset-2">
                    <button type="submit" className="btn btn-primary">
                      Save Bank Account
                    </button>
                  </div>
                </div>

                {/* feedback */}
                {props.feedback &&
                  <div className="form-group">
                    <div className="col-lg-10">
                      {props.feedback}
                    </div>
                  </div>
                }


              </fieldset>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default BankAccount;
