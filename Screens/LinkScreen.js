//onPress = {() => {Linking.openURL('http://www.google.com')}

import { SafeAreaView, TouchableOpacity, StyleSheet, Text } from "react-native";
import { Linking } from 'react-native';
import Logo from "../Components/Logo";



const LinkScreen = (props) => {
  
  
  return (
    <SafeAreaView style={styles.container}>

      <TouchableOpacity style={styles.naverButton} onPress = {() => Linking.openURL('http://www.naver.com')}>
        <Text style={styles.buttonText}>Naver</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.googleButton} onPress = {() => Linking.openURL('http://www.google.com')}>
        <Text style={styles.buttonText}>Google</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.youtubeButton} onPress = {() => Linking.openURL('http://www.youtube.com')}>
        <Text style={styles.buttonText}>Youtube</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.netflixButton} onPress = {() => Linking.openURL('https://www.netflix.com')}>
        <Text style={styles.buttonText}>Netflix</Text>
      </TouchableOpacity>
</SafeAreaView>
  );
};

const styles = StyleSheet.create({
  
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: "center",
    backgroundColor: '#ABCDEF',
    padding: 16
  },

  naverButton: {
    width: '80%',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#2DB400',
    borderRadius: 5,
    padding: 10,
    marginTop: 10
  },

  googleButton: {
    width: '80%',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#AABBCC',
    borderRadius: 5,
    padding: 10,
    marginTop: 10
  },

  youtubeButton: {
    width: '80%',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FF0000',
    borderRadius: 5,
    padding: 10,
    marginTop: 10
  },

  netflixButton: {
    width: '80%',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FF000F',
    borderRadius: 5,
    padding: 10,
    marginTop: 10
  },

  buttonText: {
    color: '#FFFFFF',
    fontSize: 15
  }
  
});

export default LinkScreen;