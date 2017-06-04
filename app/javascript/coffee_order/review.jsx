import React from 'react'
import { Header, Segment, Label } from 'semantic-ui-react'

export default class CoffeeOrderReview extends React.Component {

  label_for_temp(temp) {
    switch(temp){
      case 'cold':
        return 'blue';
      case 'hot':
        return 'red'
    }
  }

  render() {
    let order = this.props.order;

    let coffees = order.coffee_orders.map((coffee, i) => {
      let coffee_color = this.label_for_temp(coffee.coffee_temperature);
      let cream_color = this.label_for_temp(coffee.cream_temperature);

      return(
        <Segment key={`coffee_view_${i}`} >
          <Label color={coffee_color}>
            {coffee.coffee_temperature} {coffee.bean}
          </Label>
          <strong> with </strong>
          <Label color={cream_color} >
            {coffee.cream_temperature} {coffee.cream}
          </Label>
        </Segment>

      )
    });

    return(
      <div>
        <Header as='h1'>
          {order.name} @ {order.pickup_time.toLocaleString()}
        </Header>
        {coffees}
      </div>
    )
  }
}
