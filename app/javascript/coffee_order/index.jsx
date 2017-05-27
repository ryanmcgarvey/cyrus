import React from 'react'
import { Button, Checkbox, Form, Input, Radio, Select, TextArea } from 'semantic-ui-react'
import Coffee from 'coffee_order/coffee'

export default class CoffeeOrder extends React.Component {

  constructor(props){
    super(props);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onSubmit(e) {
    
  }

  render() {
    let order = this.props.order;

    let coffees = order.coffee_orders.map((coffee, i) => {
      return(
        <Coffee key={`coffee_${i}`} options={this.props.options} coffee={coffee} />
      )
    });

    return(
      <Form>
        <Form.Field>
          <label>Name</label>
          <input placeholder='Name' name='name' value={order.name} />
        </Form.Field>
        {coffees}
        <Button type='submit' onSubmit={this.onSubmit} >Submit</Button>
      </Form>
    )
  }
}
