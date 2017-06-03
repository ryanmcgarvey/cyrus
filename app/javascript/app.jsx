import React from 'react'
import { Header, Container } from 'semantic-ui-react'

import {CoffeeOrderForm, CoffeeOrderView} from 'coffee_order'

import Checkout from 'stripe_checkout'
// import Checkout from 'checkout'
// import FrameCheckout from 'frame_checkout'

export default class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      order: {
        name: '',
        coffee_orders: [{}],
        saved: false,
      },
    };

    this.update_order = this.update_order.bind(this);
    this.save_coffee = this.save_coffee.bind(this);
    this.submit_order = this.submit_order.bind(this);
  }


  update_order(order) {
    this.setState({order: order});
  }

  save_coffee(){
    let order = this.state.order;
    order.saved = true;
    this.setState({order: order});
  }

  reset_form(){
    this.setState({
      order: {
        name: '',
        coffee_orders: [{}],
        saved: false,
      },
    });
  }


  submit_order(token){
    this.submitting = true;
    let order = this.state.order;
    $.ajax( {
      url: this.props.config.charges_url,
      type: 'POST',
      dataType: 'JSON',
      data: { order: {name: order.name, coffee_orders: order.coffee_orders}, stripe: token},
      success: (response) => { 
        this.submitting = false; 
        alert('Thanks for ordering!');
        this.reset_form();
      },
      error: (response) => { 
        this.submitting = false;  
        alert('There was an error sending your message. Please try again.') 
      }
    } );
  }

  render(){
    let order = this.state.order;
    let style = {
      "fontSize": "40px"
    }

    return(
      <div>
        <Header textAlign='center' as="h1">
          New Coffee
        </Header>
        <Container>
          <CoffeeOrderForm config={this.props.config} order={this.state.order} controller={this} />
          { order.saved == true &&
              <div>
                <Checkout submit_order={this.submit_order} config={this.props.config} />
              </div>
          }
        </Container>
      </div>
    )
  }
}

