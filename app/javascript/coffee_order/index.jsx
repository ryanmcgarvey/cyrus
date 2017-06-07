import React from 'react'

import { Message, Grid, Button, Step, Menu, Divider, Header, Segment, Container } from 'semantic-ui-react'

import Config from 'coffee_order/config'
import OrderForm from 'coffee_order/order_form'
import Review from 'coffee_order/review'

import Checkout from 'stripe_checkout'

export default class CoffeeOrder extends React.Component {

  constructor(props) {
    super(props);

    let config = props.config;
    let user_info = config.user_info;
    let order = props.order;

    this.state = {
      order: {
        name: order.name,
        pickup_time: new Date(),
        coffee_orders: order.coffee_orders,
        step: 0,
        amount: 1000,
      },
    };

    this.update_order = this.update_order.bind(this);
    this.save_coffee = this.save_coffee.bind(this);
    this.configure_order = this.configure_order.bind(this);
    this.submit_order = this.submit_order.bind(this);
    this.add_coffee = this.add_coffee.bind(this);
    this.remove_coffee = this.remove_coffee.bind(this);
    this.reset_form = this.reset_form.bind(this);
    this.change_step = this.change_step.bind(this);
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
      url: this.props.config.orders_url,
      type: 'POST',
      dataType: 'JSON',
      data: data,
      beforeSend: function(xhr) {xhr.setRequestHeader('X-CSRF-Token', $('meta[name="csrf-token"]').attr('content'))},
      success: (response) => { 
        this.submitting = false; 
        order.step = 3;
        this.update_order(order);
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
    let config = this.props.config;
    let order = this.state.order;

    this.setState({
      order: {
        name: order.name,
        pickup_time: new Date(),
        coffee_orders: order.coffee_orders,
        step: 0,
        amount: 1000,
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

  change_step(step) {
    return () => {
      let order = this.state.order;
      if(step < order.step){
        order.step = step;
        this.setState({order: order});
      }
    }
  }


  render(){
    let order = this.state.order;
    let step = order.step;

    let buttons = [
      <Button icon='arrow right' content='Next' fluid color='blue' size='massive' labelPosition='right' onClick={this.save_coffee} />,
      <Button icon='arrow right' content='Next' fluid color='blue' size='massive' labelPosition='right' onClick={this.configure_order} />,
      <Checkout controller={this} config={this.props.config} amount={order.amount} >
        <Button icon='dollar' content='Checkout' fluid color='green' size='massive' labelPosition='left' />
      </Checkout>,
      <Button  content='Order Another' fluid color='blue' size='massive'  onClick={this.reset_form} />,
    ]

    let steps = [
      { completed: (step > 0), active: (step == 0), title: 'Order', icon: 'coffee', onClick: this.change_step(0) },
      { completed: (step > 1), active: (step == 1), title: 'Prep' , icon: 'user', onClick: this.change_step(1) },
      { completed: (step > 2), active: (step == 2), title: 'Pay'  , icon: 'dollar', onClick: this.change_step(2) },
    ]

    let panels = [
      <OrderForm config={this.props.config} order={this.state.order} controller={this} />,
      <Config config={this.props.config} order={this.state.order} controller={this} />,
      <Review order={this.state.order} controller={this} />,
      <Message color='green' >
        <Message.Header>
          Thank you for your order!
        </Message.Header>
      </Message>
    ]

    return(
      <div className='expand'>
        <div className='main container--mobile'>
          <Step.Group fluid items={steps} />
          { panels[step] }
        </div>

        <div className='primary_action'>
          { buttons[step] }
        </div>
      </div>
    )
  }
}

