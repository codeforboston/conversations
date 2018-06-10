import React, { Component } from 'react';
import { Text, View , StyleSheet, Dimensions} from 'react-native';
import RadioForm, {RadioButton, RadioButtonInput, RadioButtonLabel} from 'react-native-simple-radio-button';


var radio_props = [
  {label: 'English', value: 0 },
  {label: 'Hindi', value: 1 }
];

const radioToLanguageMap = {
  0: 'English',
  1 : 'Hindi'
};

const languageToRadioMap = {
  'English': 0,
   'Hindi': 1
};


export default class SettingsPage extends Component {
  constructor(props) {
    super(props);
    this.handleSettingsChanged = this.handleSettingsChanged.bind(this);
  }

  handleSettingsChanged(value) {
    global.LANG = radioToLanguageMap[value];
  } 


  render() {
    return (
      <View style={styles.BackGroundStyle} >
        <View style={{
            flex: 1,
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
          }} >
          <Text>
            Choose a Language:
          </Text> 
          <RadioForm
            radio_props={radio_props}
            initial={languageToRadioMap[global.LANG]}
            onPress={(value) => {this.handleSettingsChanged(value)}}
          />
        </View>
      </View>
    );
  }
}


const styles = StyleSheet.create({
  BackGroundStyle: {
     backgroundColor: 'rgba(43, 35, 103, 0.7)',
     position: 'absolute',
     width: Dimensions.get('window').width,
     height: Dimensions.get('window').height,
  }
});


SettingsPage.navConfig = {
  screen: SettingsPage,

  navigationOptions: ({navigation}) => ({
  })
}