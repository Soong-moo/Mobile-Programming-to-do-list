import {Image} from 'react-native'

const TabIcon = (focused, name) => {
  let iconImagePath;
  
  if (name == "Main"){
    iconImagePath = require('../assets/Main.png');
  } else if (name == "Chatbot") {
    iconImagePath = require('../assets/Chatbot.png');
  } else if (name == "Link") {
    iconImagePath = require('../assets/Link.png');
  }


  return (
    <Image style = {{
        width: focused ? 24 : 20,
        height: focused ? 24 : 20
      }}
      source = {iconImagePath}
    />
  )
}

export default TabIcon;