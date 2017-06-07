import React from 'react'
import { Header, Segment, Label } from 'semantic-ui-react'

export default class CoffeeSummary extends React.Component {

  constructor(props){
    super(props);
    this.text_for_value = this.text_for_value.bind(this);
  }

  color_for_temp(temp) {
    switch(temp){
      case 'cold':
        return 'blue';
      case 'hot':
        return 'red'
    }
  }

  label_for_size(size){
    switch(size){
      case 'small':
        return 'S';
      case 'medium':
        return 'M'
      case 'large':
        return 'L'
    }
  }

  text_for_value(field, value) {
    let option = null;
    if(option = this.props.config.options[field].find((o) => o.value == value)){
      return option.text;
    }
  }

  render() {
    let coffee = this.props.coffee;
    let options = this.props.config.options;

    let coffee_color = this.color_for_temp(coffee.coffee_temperature);
    let cream_color = this.color_for_temp(coffee.cream_temperature);

    let bean               = this.text_for_value('bean', coffee.bean); 
    let cream              = this.text_for_value('cream', coffee.cream); 
    let coffee_temperature = this.text_for_value('coffee_temperature', coffee.coffee_temperature); 
    let cream_temperature  = this.text_for_value('cream_temperature', coffee.cream_temperature); 

    return(
      <span>
        <Label color='yellow'>
          {this.label_for_size(coffee.size)}
        </Label>
        { bean && 
            <Label color={coffee_color}>
              {coffee_temperature} {bean}
            </Label>
        }
        { coffee.bean && coffee.cream && 
            <span>
              <strong> with </strong>
              <Label color={cream_color} >
                {cream_temperature} {cream}
              </Label>
            </span>
        }
      </span>
    )


  }
}
