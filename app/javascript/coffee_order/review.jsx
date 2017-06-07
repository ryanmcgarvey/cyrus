import React from 'react'
import { List, Header, Segment, Label } from 'semantic-ui-react'
import CoffeeSummary from 'coffee_order/coffee_summary'

export default class Review extends React.Component {


  render() {
    let order = this.props.order;
    let config = this.props.config;

    let coffees = order.coffee_orders.map((coffee, i) => {
      return(
        <List.Item key={`coffee_summary_${i}`} >
          <CoffeeSummary coffee={coffee} config={config}/>
        </List.Item>
      )
    });

    return(
      <div>
        <Header as='h1'>
          {order.name} @ {order.pickup_time.toLocaleString()}
        </Header>
        <List>
          {coffees}
        </List>
      </div>
    )
  }
}
