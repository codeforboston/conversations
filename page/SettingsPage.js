import React, { Component } from 'react';
import { Text, View , StyleSheet, Dimensions, PixelRatio} from 'react-native';
import RadioForm, {RadioButton, RadioButtonInput, RadioButtonLabel} from 'react-native-simple-radio-button';

const pr = PixelRatio.get();

var radio_props = [
  {label: 'English', value: 0 },
  {label: 'Hindi (हिन्दी)', value: 1 }
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
          <Text style={styles.languageChooser}>
            Choose a Language:
          </Text> 
       
            <RadioForm style={styles.radioForm}
              radio_props={radio_props}
              buttonColor={'rgb(43,35,103)'}
              selectedButtonColor={'rgb(43,35,103)'}            
              initial={languageToRadioMap[global.LANG]}
              labelStyle={{fontSize: 7.5*pr}}
              buttonStyle={{lineHeight: 10, alignSelf: 'flex-start'}}
              labelStyle={{fontSize: 10*pr, lineHeight: 12*pr, width: 150}}
              onPress={(value) => {this.handleSettingsChanged(value)}}
            />
        </View>
      </View>
    );
  }
}


const styles = StyleSheet.create({
  BackGroundStyle: {
     backgroundColor: 'rgb(255, 255, 255)',
     position: 'absolute',
     width: Dimensions.get('window').width,
     height: Dimensions.get('window').height,
  },
  languageChooser: {
    fontSize: 13 * pr,
    color: 'rgb(43, 35, 103)',
    marginBottom: 10*pr
  }
});


SettingsPage.navConfig = {
  screen: SettingsPage,

  navigationOptions: ({navigation}) => ({
  })
}