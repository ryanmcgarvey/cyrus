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
        coffee_orders: [{
          bean: '',
          coffee_temperature: '',
          cream: '',
          cream_temperature: ''
        }],
        step: 0,
      },

    };

    this.update_order = this.update_order.bind(this);
    this.save_coffee = this.save_coffee.bind(this);
    this.configure_order = this.configure_order.bind(this);
    this.submit_order = this.submit_order.bind(this);
    this.active_button = this.active_button.bind(this);
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
    order.step = 1;
    this.setState({order: order});
  }

  save_coffee(e){
    e.preventDefault();
    let order = this.state.order;
    order.step = 2;
    this.setState({order: order});
  }

  reset_form(){
    this.setState({
      order: {
        name: '',
        coffee_orders: [{}],
        step: 0,
      },
    });
  }

  active_button() {
  }


  render(){
    let order = this.state.order;
    let step = order.step;

    let buttons = [
      <Button icon='arrow right' content='Next' fluid color='blue' size='massive' labelPosition='right' onClick={this.configure_order} />,
      <Button icon='coffee' content='Order Coffees' fluid color='blue' size='massive' labelPosition='right' onClick={this.save_coffee} />,
      <Checkout controller={this} config={this.props.config} >
        <Button icon='dollar' content='Checkout' fluid color='green' size='massive' labelPosition='left' />
      </Checkout>
    ]

    let steps = [
      { completed: (step > 0), active: (step == 0), title: 'Prep'},
      { completed: (step > 1), active: (step == 1), title: 'Order'},
      { completed: (step > 2), active: (step == 2), title: 'Pay'},
    ]

    let panels = [
      (<CoffeeOrderConfig config={this.props.config} order={this.state.order} controller={this} />),
      (<CoffeeOrderForm config={this.props.config} order={this.state.order} controller={this} />),
      (<CoffeeOrderReview order={this.state.order} controller={this} />),
    ]

    return(
      <div className='wrap'>

        <Menu fluid className='header'>
          <Header className='item' as="h2">
            Cyrus
          </Header>
        </Menu>

        <div className='main'>
          <Step.Group ordered fluid items={steps} />
          { panels[step] }
        </div>

        <div className='primary_action'>
          { buttons[step] }
        </div>
      </div>
    )
  }
}

