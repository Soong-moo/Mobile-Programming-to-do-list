import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import TabIcon from "../Components/TabIcon";
import MainScreen from "../Screens/MainScreen";
import ChatbotScreen from "../Screens/ChatbotScreen";
import LinkScreen from "../Screens/LinkScreen";

const Tab = createBottomTabNavigator();

const TabNavigator = ({ route }) => {
  
  const { uid } = route.params;
  
  return (
    
    <Tab.Navigator initialRouteName="Main" 
      tabBarOptions = {{
        activeBackgroundColor:"#AABBCC",
        activeTintColor:"#FFFFFF",
        inactiveBackgroundColor : "#CCBBAA"
      }}
      screenOptions = {({ route })=> ({
        tabBarLabel:route.name,
        headerTitleAlign: 'center',
        headerTitleStyle: { color: '#FFFFFF', fontWeight: 'bold' },
        tabBarIcon :({focused}) => (
            TabIcon(focused,route.name)
          ),
        })
      }
    >
      <Tab.Screen name="Main" component={MainScreen} 
        initialParams = {{
            id:uid
        }}
        options ={{
          headerTitle: "내가 할 일",
          headerStyle:{ backgroundColor:"#AABBCC"}
        }}
      />
       <Tab.Screen name="Chatbot" component={ChatbotScreen} options ={{
          headerTitle:"무엇이든 물어보세요!",
          headerStyle:{ backgroundColor:"#AABBCC"}
        }}
      />
      <Tab.Screen name="Link" component={LinkScreen} options ={{
        headerTitle:"어디로 가고 싶으세요?",
        headerStyle:{ backgroundColor:"#AABBCC"}
        }}
      />
    </Tab.Navigator>
  );
}

export default TabNavigator;