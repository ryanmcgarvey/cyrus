import React from 'react'
import { Segment } from 'semantic-ui-react'
import StripeCheckout from 'react-stripe-checkout';

export default class Checkout extends React.Component {

  constructor(props) {
    super(props);
    this.onToken = this.onToken.bind(this);
    // this.onSuccess = this.onSuccess.bind(this);
  }


  onToken(token) {
    this.props.submit_order(token);
  }


  render(){
    let api_key = this.props.config.stripe_api_key;
    let amount = 1000;
    let email = "info@example.co"

    return(
      <StripeCheckout
        name="Cyrus"
        description="Description"
        image="http://static1.squarespace.com/static/55fafe1fe4b0ce4699686176/t/56884c77a2bab8527377b5cf/1451769815094/"
        ComponentClass="div"
        panelLabel="Money Please!"
        amount={amount}
        currency="USD"
        stripeKey={api_key}
        email={email}
        // shippingAddress
        // billingAddress={false}
        // zipCode={false}
        allowRememberMe
        token={this.onToken}
      />
    )
  }
}
