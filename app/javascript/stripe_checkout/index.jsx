import React from 'react'
import { Button } from 'semantic-ui-react'
import StripeCheckout from 'react-stripe-checkout';

export default class Checkout extends React.Component {

  constructor(props) {
    super(props);
    this.onToken = this.onToken.bind(this);
  }


  onToken(token) {
    this.props.controller.submit_order(token);
  }

  render(){
    let api_key = this.props.config.stripe_api_key;
    let email = this.props.config.user_info.email;
    let amount = this.props.amount;

    return(
      <StripeCheckout
        name="Cyrus"
        image="http://static1.squarespace.com/static/55fafe1fe4b0ce4699686176/t/56884c77a2bab8527377b5cf/1451769815094/"
        ComponentClass="div"
        panelLabel="Complete Payment"
        amount={amount}
        currency="USD"
        stripeKey={api_key}
        email={email}
        allowRememberMe
        token={this.onToken}
      >
        {this.props.children}
      </StripeCheckout>
    )
  }
}
