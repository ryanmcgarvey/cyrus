import React from 'react'
import { Divider, Grid, Button, Checkbox, Form, Input, Radio, Select, TextArea } from 'semantic-ui-react'

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

    let fields = ['bean', 'coffee_temperature', 'cream', 'cream_temperature', 'size']

    let selects = fields.map((f) =>
      <div key={`select_${f}_for_coffee_${index}`} >
        <Divider hidden />
        <Form.Select fluid size='massive' onChange={this.onChange}  value={coffee[f] || ''} name={f}  placeholder={f} options={options[f]} />
      </div>
    );

    return(
      <div>
        {selects}
      </div>
    )
  }
}
