import React from 'react'
import { Container, Header, Button, Checkbox, Form, Input, Radio, Select, TextArea } from 'semantic-ui-react'

export default class FrameCheckout extends React.Component {

  constructor(props) {
    super(props);
    this.order_id = "order_id";
    this.customer_id = "customer_id"
    this.paymentCallback = this.paymentCallback.bind(this);
    this.doStuff = this.doStuff.bind(this);
  }

  paymentCallback(response) {
    if (response.response !== '870') {
      // Then an error occurred.
      // The response may have one of a few error codes plus a human readable message
      // The merchant can decide what to do in this case
      console.log(response.message);
    } else {
      // Then the temporary token has been retrieved, and the merchant can submit it
      // to the merchant's servers to retrieve the PaymentAccountID
      console.log(response.paypageRegistrationId);
    }

  }

  doStuff(e){
    e.preventDefault();
    this.client = new LitlePayframeClient({
      "paypageId": this.props.paypage_id,
      "style":"sample2",
      "height":"250",
      "reportGroup":"IFrame Sample",
      "timeout":"60000",
      "div": "payframe", // this references the ID of the element in which you want the payframe to render
      "callback": this.payframeClientCallback,
      "showCvv": true,
      "months": {
        "1":"January",
        "2":"February",
        "3":"March",
        "4":"April",
        "5":"May",
        "6":"June",
        "7":"July",
        "8":"August",
        "9":"September",
        "10":"October",
        "11":"November",
        "12":"December"
      },
      "numYears": 8,
      "tooltipText": "A CVV is the 3 digit code on the back of your Visa, MasterCard and Discover or a 4 digit code on the front of your American Express",
      "tabIndex": {
        "cvv":4,
        "accountNumber":1,
        "expMonth":2,
        "expYear":3
      },
      "placeholderText": {
        "cvv":"CVV",
        "accountNumber":"Account Number"
      }
    });

    this.client.getPaypageRegistrationId({
      "id": "customer-id?",
      "orderId": this.order_id, 
    });
  }


  render() {
    return(
      <Form id='payframe' onSubmit={this.doStuff} >
        Hello!
        <input name='ccNum'/>
        <Button type='submit'>
          Submit
        </Button>
      </Form>
    )
  }

}
