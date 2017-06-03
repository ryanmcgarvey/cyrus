import React from 'react'
import { Button, Checkbox, Form, Input, Radio, Select, TextArea } from 'semantic-ui-react'

export default class Coffee extends React.Component {

  constructor(props) {
    super(props);
    this.onChange = this.onChange.bind(this);
  }

  onChange(e, data){
    let order = this.props.order;
    let index = this.props.index;
    let coffee = order.coffee_orders[index];
    coffee[data.name] = data.value;
    this.props.controller.update_order(order);
  }

  render() {
    let options = this.props.config.options;
    let index = this.props.index;
    let coffee = this.props.order.coffee_orders[index];

    return(
      <div>
        <Form.Select onChange={this.onChange} value={coffee.bean || ''}                name='bean'               label='Bean Type'         options={options.bean}/>
        <Form.Select onChange={this.onChange} value={coffee.coffee_temperature  || ''} name='coffee_temperature' label='Temperature'       options={options.coffee_temperature}/>
        <Form.Select onChange={this.onChange} value={coffee.cream || ''}               name='cream'              label='Cream'             options={options.cream}/>
        <Form.Select onChange={this.onChange} value={coffee.cream_temperature || ''}   name='cream_temperature'  label='Cream Temperature' options={options.cream_temperature}/>
      </div>
    )
  }
}
