import React from 'react'
import { Grid, Divider, Segment, Container, Header, Button, Checkbox, Form, Input, Radio, Select, TextArea } from 'semantic-ui-react'

import Coffee from 'coffee_order/coffee'

export default class Orderform extends React.Component {

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

    let coffees = order.coffee_orders.map((coffee, i) => {
      return(
        <div key={`coffee_${i}`} >
          <Coffee config={this.props.config} order={order} onChange={this.onChange} index={i} controller={this.props.controller} />
          <Divider hidden />
        </div>
      )
    });

    let new_coffee_buttons = (
      <Button.Group fluid size='massive' >
        <Button onClick={controller.add_coffee} data-size="small"  content='Small'  />
        <Button onClick={controller.add_coffee} data-size="medium" content='Medium' />
        <Button onClick={controller.add_coffee} data-size="large"  content='Large'  />
      </Button.Group>
    )

    return(
      <div>
        {coffees}
        {new_coffee_buttons}
      </div>
    )
  }
}
