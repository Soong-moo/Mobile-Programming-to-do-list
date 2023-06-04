import { SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity } from "react-native";
import Logo from "../Components/Logo";
import { useState, useEffect } from "react";
import { useIsFocused } from "@react-navigation/native";
import { db } from "../DB/config";

const SignupScreen = (props) => {

  const [user, setUser] = useState([]);
  const [id, setId] = useState('');
  const [password, setPassword] = useState("");
  const [checkPassword, setCheckPassword] = useState("");
  const isFocused = useIsFocused();

  useEffect(() => {
    const readfromDB = async () => {
      try {
        const data = await db.collection("user");
        let tempArray = [];
        data.get().then(snap => {
          snap.forEach((doc) => {
            tempArray.push({ ...doc.data(), documentID : doc.id})
          })
          setUser(tempArray)
        })
      } catch(err) {
        console.log(err)
      }
    }
    readfromDB()
  }, [isFocused]);

  const submit = async () => {
    let check = true;

    user.map((row, idx) => {
      if (row.id == id) {
        check = false;
      } 
    })
    if (check) {
      if (password == checkPassword) {
        try {
          if (id && password){
            await db.collection("user").doc().set({
            id : id,
            pw : password
            })
            alert("회원가입 성공");
            props.navigation.navigate("Login");
          }
          else{
            alert("모든 값을 입력해야 합니다.");
          }
          
        } catch (error) {
          console.log(error)
        }
      }
      else{
        alert("비밀번호와 비밀번호 확인 값이 일치하지 않습니다.");
      }
    } else {
      alert('이미 존재하는 아이디입니다.');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Logo title = "Signup"/>
      <TextInput
        style={styles.input}
        placeholder="아이디"
        onChangeText={setId}
      />
      <TextInput
        style={styles.input}
        secureTextEntry
        placeholder="비밀번호"
        onChangeText={setPassword}
      />
      <TextInput
        style={styles.input}
        secureTextEntry
        placeholder="비밀번호 확인"
        onChangeText={setCheckPassword}
      />
      <TouchableOpacity style={styles.button} onPress={submit}>
        <Text style={styles.buttonText}>회원가입</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ABCDEF'
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

export default SignupScreen;