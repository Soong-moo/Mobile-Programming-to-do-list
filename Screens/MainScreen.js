import { useState, useEffect } from 'react';
import Constants from "expo-constants"
import { View, TextInput, TouchableOpacity, Text, StyleSheet,ScrollView, Alert} from 'react-native';
import {db} from '../DB/config.js'
import { useIsFocused } from '@react-navigation/native';

const MainScreen = (props) => {
  
  const params = props.route.params;
  const uid = params ? params.id : null ;

  const [content, setContent] = useState('');
  const [todo, setTodo] = useState([]);
  const onFocused = useIsFocused();

  useEffect(() => {
    readfromDB()
  }, [onFocused]);

  const handleDelete = (idx) => {
    if(Constants.platform.web){
      deleteContent(idx);
    }else{
      Alert.alert(
      '선택하신 할 일을 삭제합니다',
      "",
      [
        {
          text: '취소',
          style: 'cancel'
        },
        {
          text: '확인',
          onPress : ()=>{deleteContent(idx)},
          style: 'destructive',
        },
      ],
      { cancelable: true }
    );
    }
  };

  const deleteContent = async (idx) => {
    
    let tmp = todo[idx];
    
    const newArray = todo.filter((num, index) => {
      return idx != index;
    });

    try {
      
      await db.collection("todo").doc(tmp.documentid).delete().than(
        ()=> {
          alert('삭제되었습니다!');
          readfromDB();
        }   
      )  
    } catch (error) {     
      console.log(error);
    }
    setTodo(newArray);
  }

  const readfromDB = async () => {

    try {

      const data = await db.collection("todo");
      let tempArray = [];

      data.get().then(snap => {
        snap.forEach((doc) => {
          tempArray.push({ ...doc.data(), documentid: doc.id});
        })
        setTodo(tempArray);
      })
    } catch(error) {
      console.log(error.message);
    }
  }

  const submit = async () => {
    if (content != ""){
      const currentDate = new Date();
      try {
        await db.collection("todo").doc().set({ 
          date: currentDate.toISOString().split('T')[0],  
          id : uid,
          content: content
        })
        readfromDB();
      } catch (error) {
        console.log(error)
      }
      setContent("");
    }else{
      alert("할 일을 적어주세요!");
    }
  };
  


  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        onChangeText={setContent}
        value={content}
        placeholder="할 일을 적어주세요!"
        multiline
      />
      <TouchableOpacity onPress={submit} style={styles.button}>
        <Text style={styles.buttonText}>추가</Text>
      </TouchableOpacity>
      <ScrollView>
          {
            todo.map((item, idx) => {
              const currentDate = new Date();
              if (item.id == uid && item.date == currentDate.toISOString().split('T')[0]) {
                return (
                  <TouchableOpacity style={styles.item} onPress ={()=>handleDelete(idx)}>
                    <Text>{item.content}</Text>
                    <Text style={styles.contentDate}>작성 날짜 : {item.date}</Text>
                  </TouchableOpacity>
                )
              }
            })
          }
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ABCDEF',
    padding: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#FFFFFF',
    backgroundColor : '#FFFFFF',
    borderRadius: 5,
    padding: 10,
    marginBottom: 20
  },
  button: {
    backgroundColor: '#AABBCC',
    borderRadius: 5,
    paddingVertical: 10,
    alignItems: 'center'
  },
  buttonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFFFFF'
  },
  item: {
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    padding: 20,
    marginTop: 12,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  contentDate : {
    fontSize : 8,
    paddingLeft : 60,
    color : "#D3D3D3"
  }
});

export default MainScreen;