import { SafeAreaView, TextInput, TouchableOpacity, StyleSheet, Text } from "react-native";
import Logo from "../Components/Logo";
import { useState, useEffect } from "react";
import { useIsFocused } from "@react-navigation/native";
import { db } from "../DB/config";

const LoginScreen = (props) => {
  
  const [user, setUser] = useState([]);
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const isFocused = useIsFocused();

  useEffect(() => {
    const readfromDB = async () => {
      try {
        const data = await db.collection("user");
        let tempArray = [];
        data.get().then(snap => {
          snap.forEach((doc) => {
            tempArray.push({ ...doc.data(), documentID : doc.id});
          })
          setUser(tempArray);
        })
      } catch(err) {
        console.log(err);
      }
    }
    readfromDB();
  }, [isFocused]);

  const loginEvent = () => {
    let check = true;
    user.map((row, idx) => {
      if (row.id == id && row.pw == password) {
        setId('');
        setPassword('');
        check = false;
        alert("로그인!");
        props.navigation.navigate("Main",{
          uid:row.id
        });
      }
    });
    if(check){
      alert("아이디, 패스워드 오류");
    }
  };

  return (
    <SafeAreaView style={styles.container}>

      <Logo title = "Login"/>
      
      <TextInput
        style={styles.input}
        placeholder="아이디"
        onChangeText={setId}
        value={id}
      />
      <TextInput
        style={styles.input}
        placeholder="비밀번호"
        onChangeText={setPassword}
        value={password}
        secureTextEntry
      />
      <TouchableOpacity style={styles.button} onPress={loginEvent}>
        <Text style={styles.buttonText}>로그인</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={()=>props.navigation.navigate("Signup")}>
        <Text style={styles.buttonText}>회원가입</Text>
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

  input: {
    width: '80%',
    height: 40,
    borderColor: '#FFFFFF',
    backgroundColor : '#FFFFFF',
    borderRadius: 5,
    paddingLeft: 10,
    marginBottom: 50
  },

  button: {
    width: '80%',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#AABBCC',
    borderRadius: 5,
    padding: 10,
    marginTop: 10
  },


  buttonText: {
    color: '#FFFFFF',
    fontSize: 15
  }
  
});

export default LoginScreen;