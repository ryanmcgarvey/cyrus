import React from 'react'
import { Button, Checkbox, Form, Input, Radio, Select, TextArea } from 'semantic-ui-react'

export default class Coffee extends React.Component {
  render() {
    let options = this.props.options;
    let coffee = this.props.coffee;

    return(
      <Form.Group width='inline'>
        <Form.Field value={coffee.bean} name='bean_type' control={Select} label='Bean Type' options={options.bean}/>
        <Form.Field value={coffee.coffee_temperature} name='coffee_temperature' control={Select} label='Temperature' options={options.coffee_temperature}/>
        <Form.Field value={coffee.cream} name='cream' control={Select} label='Cream' options={options.cream}/>
        <Form.Field value={coffee.cream_temperature} name='cream_temperature' control={Select} label='Cream Temperature' options={options.cream_temperature}/>
      </Form.Group>
    )
  }
}
