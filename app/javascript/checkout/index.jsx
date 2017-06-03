import React from 'react'
import { Container, Header, Button, Checkbox, Form, Input, Radio, Select, TextArea } from 'semantic-ui-react'

export default class Checkout extends React.Component {

  constructor(props) {
    super(props);

    this.request = {
      paypage_id: "a2y4o6m8k0",
      merchant_id: "987012",
      order_id: "order_123",
      report_group: "*merchant1500",
    }

    this.litle_response = {};

    this.state = { 
      fields: {
        accountNum: '4470330769941000',
        cvv2: '123',
        paypageRegistrationId: '',
      },
    };

    this.submitPayment = this.submitPayment.bind(this);
    this.submitAfterLitle = this.submitAfterLitle.bind(this);
    this.timeoutOnLitle = this.timeoutOnLitle.bind(this);
    this.onErrorAfterLitle = this.onErrorAfterLitle.bind(this);
    this.change_field = this.change_field.bind(this);
  }

  change_field(e) {
    let fields = this.state.fields;
    switch(e.target.id) {
      case 'accountNum':
        fields.accountNum = e.target.value;
        break;
      case 'cvv2':
        fields.cvv2 = e.target.value;
        break;
    }
    this.setState({fields: fields});
  }

  submitPayment(e) {
    let form = e.preventDefault();
    let request = this.request;

    let litleRequest = {
      paypageId: request.paypage_id, 
      reportGroup: request.report_group,
      orderId: request.order_id,
      id: request.merchant_id, 
      url: "https://request-prelive.np-securepaypage-litle.com"
    };

    var formFields = {
      accountNum: document.getElementById('accountNum'),
      cvv2: document.getElementById('cvv2'),
      paypageRegistrationId: document.getElementById('paypageRegistrationId'),
    };

    new LitlePayPage().sendToLitle(litleRequest, formFields, this.submitAfterLitle, this.onErrorAfterLitle, this.timeoutOnLitle, 15000);
    return false;
  }

  submitAfterLitle(response) {
    this.litle_response = { litle_response: response };

    this.submitting = true;
    $.ajax( {
      url: this.props.payments_url,
      type: 'POST',
      dataType: 'JSON',
      data: this.litle_response,
      success: (response) => { 
        this.submitting = false; 
        form.reset(); 
      },
      error: (response) => { this.submitting = false;  alert('There was an error sending your message. Please try again.') }
    } );
  }

  onErrorAfterLitle(response) {
    debugger;
  }

  timeoutOnLitle() {
    debugger;
  }

  render() {
    let request = this.request;
    let response = this.state.response;
    let fields = this.state.fields;
    return(
      <Container>
        <Header textAlign='center' as="h1">
          Checkout
        </Header>
        <Form onSubmit={this.submitPayment} >
          <input hidden readOnly id="paypageRegistrationId" value={fields.paypageRegistrationId} />
          <Form.Field>
            <label>
              Credit Card
            </label>
            <input id="accountNum" size="20" value={fields.accountNum} onChange={this.change_field} />
          </Form.Field>
          <Form.Field>
            <label>
              CVV
            </label>
            <input id="cvv2" size="4" value={fields.cvv2} onChange={this.change_field} />
          </Form.Field>

          <Button type='submit'>Place Order</Button>
        </Form>

      </Container>
    )
  }

}
