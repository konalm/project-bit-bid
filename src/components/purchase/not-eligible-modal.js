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
  }

  redirectToAccount = (e) => {
    e.preventDefault();

    $("#NotEligibleModal").modal('hide');

    if (!this.props.userHasAddress) {
      this.props.history.push('/profile/address');
      return;
    }

    this.props.history.push('/profile/billing');
  }

  render() {
    const requiredTitle = this.props.userHasAddress ?
      'Address Required' : 'Billing Information Required';

    const textResponse = this.props.userHasAddress ?
      'your address is required to continue. So the seller knows where to send the goodies.' :
      'your billing information is required before you can purchase any items';

    return (
      <div>
        <div id="NotEligibleModal" className="modal fade" role="dialog" ref="modal" >
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
                  onClick={(e) => this.redirectToAccount(e)}
                >
                  Go To Account
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
