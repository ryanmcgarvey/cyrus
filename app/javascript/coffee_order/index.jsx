import React from 'react'
import { Grid, Divider, Segment, Container, Header, Button, Checkbox, Form, Input, Radio, Select, TextArea } from 'semantic-ui-react'
import CoffeeOrderReview from 'coffee_order/review'
import CoffeeOrderForm from 'coffee_order/form'

class CoffeeOrderConfig extends React.Component {

  constructor(props){
    super(props);
    this.onChange = this.onChange.bind(this);
  }

  onChange(e, data) {
    let order = this.props.order;
    order[e.target.name] = e.target.value;
    this.props.controller.update_order(order);
  }

  render() {
    let order = this.props.order;
    let controller = this.props.controller;

    return(
      <Form className='massive'>
        <Form.Field>
          <input placeholder='Name' name='name' value={order.name} onChange={this.onChange} />
        </Form.Field>
      </Form>
    )
  }
}

export {
  CoffeeOrderConfig,
  CoffeeOrderForm,
  CoffeeOrderReview
}

