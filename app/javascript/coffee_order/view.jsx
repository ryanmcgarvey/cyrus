import React from 'react'
import { List } from 'semantic-ui-react'

export default class CoffeeOrderView extends React.Component {
  render() {
    let order = this.props.order;

    let coffees = order.coffee_orders.map((coffee, i) => {
      return(
        <List key={`coffee_view_${i}`} >
          <List.Item>{coffee.bean}</List.Item>
          <List.Item>{coffee.coffee_temperature}</List.Item>
          <List.Item>{coffee.cream}</List.Item>
          <List.Item>{coffee.cream_temperature}</List.Item>
        </List>
      )
    });

    return(
      <div>
        <h4>{order.name}</h4>
        {coffees}
      </div>
    )
  }
}
