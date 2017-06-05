import React from 'react'
import { Popup, Grid, Divider, Segment, Container, Header, Button, Checkbox, Form, Input, Radio, Select, TextArea } from 'semantic-ui-react'
import {calendar} from 'semantic-ui-calendar/dist/calendar.js'

export default class Config extends React.Component {

  constructor(props){
    super(props);
    this.onChange = this.onChange.bind(this);
    this.onDateChange = this.onDateChange.bind(this);
  }

  onChange(e, data) {
    let order = this.props.order;
    order[e.target.name] = e.target.value;
    this.props.controller.update_order(order);
  }

  onDateChange(date, text, mode) {
    let order = this.props.order;
    order['pickup_time'] = date;
    this.props.controller.update_order(order);
  }

  componentDidMount(){
    window.$(this.refs.calendar).calendar({
      onChange: this.onDateChange
    });
  }

  render() {
    let order = this.props.order;
    let controller = this.props.controller;

    return(
      <div>
        <Header as='h2' content='Pickup Time' />
        <Form.Field>
          <div className='ui calendar' ref='calendar'>
            <div className="ui input left icon">
              <i className="calendar icon" />
              <input type="text" placeholder="Date/Time" name='pickup_time' />
            </div>
          </div>
        </Form.Field>
        <Divider hidden />
        <Form.Input fluid size='massive' placeholder='Name' name='name' value={order.name} onChange={this.onChange} />
      </div>
    )
  }
}
