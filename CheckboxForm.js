import React from 'react'
import { View, Text } from 'react-native'
import { Form, SwitchCell, ButtonCell } from 'react-native-forms';

const DEFAULT_SYMPTOMS = [ 
  {ID:10,Name:"Abdominal pain"}, 
  {ID:238,Name:"Anxiety"}, 
  {ID:104,Name:"Back pain"}, 
  {ID:75,Name:"Burning eyes"}, 
  {ID:46,Name:"Burning in the throat"}, 
  {ID:170,Name:"Cheek swelling"}, 
  {ID:17,Name:"Chest pain"}, 
  {ID:31,Name:"Chest tightness"}, 
  {ID:175,Name:"Chills"}, 
  {ID:139,Name:"Cold sweats"}, 
  {ID:15,Name:"Cough"} 
]  

export default class CheckboxForm extends React.Component {
  handlePress ()  {
    console.log(this.form.getData());
  }
  
  renderSwitchCell = (symptomObj, i) => {
    return (
      <SwitchCell title={symptomObj.Name}  key={i} ref={i}>  </SwitchCell>
    )
  }

  render () {
    return (
      <Form
        ref={(ref) => { this.form = ref; }}
        onPress={this.handlePress.bind(this)}
      >
        <Section
          ref={'firstSection'}
          title={'SYMPTOMS'}
        >
          {DEFAULT_SYMPTOMS.map(this.renderSwitchCell)}
          
          <ButtonCell
            title={'Submit'}
            textAlign={'center'}
            titleColor={'blue'}
          />
        </Section>
      </Form>
     )
  }
}