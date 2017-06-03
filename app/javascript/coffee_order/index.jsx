import React from 'react'
import { Segment, Container, Header, Button, Checkbox, Form, Input, Radio, Select, TextArea } from 'semantic-ui-react'
import Coffee from 'coffee_order/coffee'
import CoffeeOrderView from 'coffee_order/view'

class CoffeeOrderForm extends React.Component {

  constructor(props){
    super(props);
    this.onSubmit = this.onSubmit.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  onSubmit(e) {
    e.preventDefault();
    this.props.controller.save_coffee();
  }

  onChange(e, data) {
    let order = this.props.order;
    order[e.target.name] = e.target.value;
    this.props.controller.update_order(order);
  }

  render() {
    let order = this.props.order;
    let auth_token = this.props.auth_token;

    let coffees = order.coffee_orders.map((coffee, i) => {
      return(
        <Coffee key={`coffee_${i}`} config={this.props.config} order={order} onChange={this.onChange} index={i} controller={this.props.controller} />
      )
    });

    return(
      <Form>
        <Form.Field>
          <label>Name</label>
          <input placeholder='Name' name='name' value={order.name} onChange={this.onChange} />
          <input hidden name='authenticity_token' value={auth_token} readOnly />
        </Form.Field>
        {coffees}
        { order.saved == false &&
            <Button onClick={this.onSubmit}>Submit</Button>
        }
      </Form>
    )
  }
}

export {
  CoffeeOrderForm,
  CoffeeOrderView
}

