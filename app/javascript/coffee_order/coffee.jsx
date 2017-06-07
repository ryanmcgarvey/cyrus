import React from 'react'
import { Header, Divider, Grid, Button, Checkbox, Form, Input, Radio, Select, TextArea } from 'semantic-ui-react'

export default class Coffee extends React.Component {

  constructor(props) {
    super(props);
    this.onChange = this.onChange.bind(this);
    this.buttons_for = this.buttons_for.bind(this);
  }

  onChange(e, data){
    let order = this.props.order;
    let index = this.props.index;
    let coffee = order.coffee_orders[index];

    coffee[data.name] = data.value;
    this.props.controller.update_order(order);
  }

  buttons_for(field) {
    let options = this.props.config.options[field];
    let index = this.props.index;
    let coffee = this.props.order.coffee_orders[index];

    let buttons = options.map((option) => {
      let active = coffee[field] == option.value;

      return(
        <Button
          compact
          className='tall'
          toggle
          size='huge' 
          name={field} 
          value={option.value} 
          active={active} 
          toggle 
          onClick={this.onChange} 
          key={`button_${option.value}_${field}_for_coffee_${index}`}
        >
          {option.text}
        </Button>
      )
    });

    return(
      <Button.Group fluid key={`buttons_sub_${field}_for_coffee_${index}`} >
        {buttons}
      </Button.Group>
    )
  }

  render() {
    let options = this.props.config.options;
    let index = this.props.index;
    let coffee = this.props.order.coffee_orders[index];
    let controller = this.props.controller;

    let fields = ['size', 'bean', 'coffee_temperature', 'cream', 'cream_temperature']

    let selects = fields.map((f) =>
      <div key={`buttons_${f}_for_coffee_${index}`} >
        <Divider hidden />
        { this.buttons_for(f) }
      </div>
    );

    return(
      <div data-provides="coffee_order" data-for={index} >
        {selects[0]}

        <Header as='h4'>
          Coffee
        </Header>
        {selects[1]}
        {selects[2]}

        <Header as='h4'>
          Options 
        </Header>
        {selects[3]}
        {selects[4]}
      </div>
    )
  }
}
