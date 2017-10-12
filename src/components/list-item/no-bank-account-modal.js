import React from 'react'
import { withRouter } from 'react-router-dom'

import {http} from '../../http-requests'
import Header from './../reuse/header'

import $ from 'jquery';
window.jQuery = window.$ = $;
require('bootstrap');

class NotEligibleModal extends React.Component {
  constructor(props) {
    super(props);

    this.redirectToBankAccountClicked = false;
  }

  componentDidMount() {
    /* redirect home if no bank account modal closed */
    $('#noBankAccountModal').on('hidden.bs.modal', function()  {
      if (this.redirectToBankAccountClicked) { return; }
      this.props.history.push('/items-listed');
    }.bind(this));
  }

  /**
   * redirect to bank account
   */
  redirectToBankAccount = (e) => {
    e.preventDefault();

    this.redirectToBankAccountClicked = true;
    $("#noBankAccountModal").modal('hide');
    this.props.history.push('/profile/bank-account');
  }

  render() {
    const requiredTitle = 'Bank Account Required';

    const textResponse = `Your bank account is required to recive payment before
      you can sell any items.`;

    return (
      <div>
        <div id="noBankAccountModal" className="modal fade" role="dialog" ref="modal" >
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <button type="button" className="close" data-dismiss="modal">
                  &times;
                </button>

                <h4 className="modal-title"> {requiredTitle} </h4>
              </div>

              <div className="modal-body">
                <p> {textResponse} </p>
              </div>

              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-default"
                  onClick={(e) => this.redirectToBankAccount(e)}
                >
                  Add Bank Account
                </button>

                <button type="button" className="btn btn-default" data-dismiss="modal">
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default withRouter(NotEligibleModal);
