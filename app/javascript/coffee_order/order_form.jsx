import React from 'react'
import { List, Grid, Divider, Segment, Container, Header, Button, Checkbox, Form, Input, Radio, Select, TextArea } from 'semantic-ui-react'
import Coffee from 'coffee_order/coffee'
import CoffeeSummary from 'coffee_order/coffee_summary'

export default class Orderform extends React.Component {

  constructor(props){
    super(props);
    this.state = {coffee_index: 0, show_coffee: false }
    this.onChange = this.onChange.bind(this);
    this.save_coffee = this.save_coffee.bind(this);
    this.show_coffee = this.show_coffee.bind(this);
    this.change_index = this.change_index.bind(this);
  }

  onChange(e, data) {
    let order = this.props.order;
    order[e.target.name] = e.target.value;
    this.props.controller.update_order(order);
  }

  change_index(index){
    return () => {
      this.show_coffee(index);
    }
  }

  show_coffee(index){
    this.setState({
      coffee_index: index, 
      show_coffee: true
    });
  }

  save_coffee(){
    this.setState({show_coffee: false});
  }

  add_coffee(size) {
    return () => {
      let new_index = this.props.order.coffee_orders.length;
      this.setState({coffee_index: new_index, show_coffee: true});
      this.props.controller.add_coffee(size);
    }
  }

  render() {
    let order = this.props.order;
    let controller = this.props.controller;
    let config = this.props.config;

    let coffees = order.coffee_orders.map((coffee, i) => {
      return(
        <div key={`coffee_${i}`} >
          <Coffee config={config} order={order} onChange={this.onChange} index={i} controller={this.props.controller} />
          <Divider hidden />
        </div>
      )
    });

    let current_coffee = coffees[this.state.coffee_index];

    let new_coffee_buttons = (
      <Button.Group fluid size='huge'  >
        <Button onClick={this.add_coffee("small")} content='Small'   />
        <Button onClick={this.add_coffee("medium")} content='Medium' />
        <Button onClick={this.add_coffee("large")} content='Large'  />
      </Button.Group>
    )

    let save_coffee = (
      <Button onClick={this.save_coffee} content='Save' size='huge' fluid color='green'  />
    )

    let coffee_summaries = order.coffee_orders.map((coffee, index) =>
      <List.Item key={`coffee_${index}`} > 
        <Button floated='right' negative icon='trash' content='Delete' labelPosition='right' onClick={controller.remove_coffee} data-index={index}/> 
        <CoffeeSummary coffee={coffee} config={config} onClick={this.change_index(index)}  />
      </List.Item>
    )

    let order_summary = (
      <List size='large' >
        {coffee_summaries}
      </List>
    )

    return(
      <div className='expand'>
        <div>
          {order_summary}
        </div>

        <div className='expand'>
          { this.state.show_coffee && 
              <div>
                <div>
                  {current_coffee}
                </div>
              </div>
          }
        </div>
        { this.state.show_coffee && 
            <div className='primary_action'>
              {save_coffee}
            </div>
        }

        {  this.state.show_coffee == false &&
            <div className='primary_action'>
              <Header as='h2' textAlign='center'>
                Add to order
              </Header>
              {new_coffee_buttons}
            </div>
        }
      </div>
    )
  }
}
