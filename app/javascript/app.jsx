import React from 'react'

import { Grid, Button, Step, Menu, Divider, Header, Segment, Container } from 'semantic-ui-react'
import { CoffeeOrderForm, CoffeeOrderReview, CoffeeOrderConfig } from 'coffee_order'
import Checkout from 'stripe_checkout'

export default class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      order: {
        name: '',
        pickup_time: new Date(),
        coffee_orders: [],
        step: 0,
      },

    };

    this.update_order = this.update_order.bind(this);
    this.save_coffee = this.save_coffee.bind(this);
    this.configure_order = this.configure_order.bind(this);
    this.submit_order = this.submit_order.bind(this);
    this.add_coffee = this.add_coffee.bind(this);
    this.remove_coffee = this.remove_coffee.bind(this);
  }

  submit_order(token){
    this.submitting = true;
    let order = this.state.order;
    let data = { 
      order: {
        name: order.name, 
        pickup_time: order.pickup_time, 
        coffee_orders: order.coffee_orders
      }, 
      stripe: token
    };
    $.ajax( {
      url: this.props.config.charges_url,
      type: 'POST',
      dataType: 'JSON',
      data: data,
      success: (response) => { 
        this.submitting = false; 
        this.reset_form();
      },
      error: (response) => { 
        this.submitting = false;  
        alert('There was an error sending your message. Please try again.') 
      }
    } );
  }

  update_order(order) {
    this.setState({order: order});
  }

  configure_order(e){
    e.preventDefault();
    let order = this.state.order;
    order.step = 2;
    this.setState({order: order});
  }

  save_coffee(e){
    e.preventDefault();
    let order = this.state.order;
    order.step = 1;
    this.setState({order: order});
  }

  reset_form(){
    this.setState({
      order: {
        name: '',
        coffee_orders: [],
        step: 0,
      },
    });
  }

  remove_coffee(e) {
    let index = e.target.dataset.index;
    let order = this.state.order;
    order.coffee_orders.splice(index, 1);
    this.update_order(order);
  }

  add_coffee(e) {
    let size = e.target.dataset.size;
    let order = this.state.order;
    order.coffee_orders.push({size: size});
    this.update_order(order);
  }


  render(){
    let order = this.state.order;
    let step = order.step;

    let buttons = [
      <Button icon='arrow right' content='Next' fluid color='blue' size='massive' labelPosition='right' onClick={this.save_coffee} />,
      <Button icon='arrow right' content='Next' fluid color='blue' size='massive' labelPosition='right' onClick={this.configure_order} />,
      <Checkout controller={this} config={this.props.config} >
        <Button icon='dollar' content='Checkout' fluid color='green' size='massive' labelPosition='left' />
      </Checkout>
    ]

    let steps = [
      { completed: (step > 0), active: (step == 0), title: 'Order'},
      { completed: (step > 1), active: (step == 1), title: 'Prep'},
      { completed: (step > 2), active: (step == 2), title: 'Pay'},
    ]

    let panels = [
      <CoffeeOrderForm config={this.props.config} order={this.state.order} controller={this} />,
      <CoffeeOrderConfig config={this.props.config} order={this.state.order} controller={this} />,
      <CoffeeOrderReview order={this.state.order} controller={this} />,
    ]

    return(
      <div className='wrap'>

        <Menu fluid className='header'>
          <Header className='item' as="h2">
            Cyrus
          </Header>
        </Menu>

        <Container className='main'>
          <Step.Group ordered fluid items={steps} />
          { panels[step] }
        </Container>

        <div className='primary_action'>
          { buttons[step] }
        </div>
      </div>
    )
  }
}

