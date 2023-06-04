import { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';

const ChatbotScreen = () => {

  const [question, setQuestion] = useState('');
  const [talk, setTalk] = useState([]);
  const [load, setLoad] = useState(false);

  const reply = async (text) => {
  
    const prompt = text;
    const apiKey = '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';
    const url = 'https://api.openai.com/v1/engines/text-davinci-003/completions';

    const headers = {
      'Content-Type' : 'application/json',
      Authorization : `Bearer ${apiKey}`
    };

    const data = {
      prompt : prompt,
      max_tokens : 1024,
      temperature : 0.7
    };

    const response = await fetch(url, {
      method : 'POST',
      headers,
      body : JSON.stringify(data)
    });

    const result = await response.json();
    
    return result.choices[0].text;

  };

    const submit = async() => {
      if (question.trim().length === 0) return;

      setTalk((prev) => [...prev, { type: 'question', content: question }]);
      setQuestion('');
      setLoad(true);

    const answer = await reply(question);
      setLoad(false);
      setTalk((prev) => [...prev, { type: 'answer', content: answer }]);  
  };

  return (
    <View style={styles.container}>
      <ScrollView style={styles.talk}>
        {talk.map((message, index) => (
          <View
            key={index}
            style={[
              styles.messageContainer,
              message.type === 'question' ? styles.question : styles.answer,
            ]}
          >
            <Text style={styles.message}>{message.content}</Text>
          </View>
        ))}
      </ScrollView>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          value={question}
          onChangeText={(text) => setQuestion(text)}
          placeholder="질문을 입력하세요!"
        />
        <TouchableOpacity style={styles.submitButton} onPress={submit}>
          <Text style={styles.submitButtonText}>전송</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ABCDEF'
  },
  talk : {
    flex: 1,
    paddingTop: 20,
    paddingHorizontal: 16
  },
  messageContainer: {
    marginBottom: 16,
    borderRadius: 12,
    padding: 12
  },
  question: {
    backgroundColor: '#FFFF00',
    alignSelf: 'flex-end'
  },
  answer: {
    backgroundColor: '#FFFFFF',
    alignSelf: 'flex-start'
  },
  message: {
    fontSize: 12
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderTopWidth: 1
  },
  input: {
    flex: 1,
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderColor: '#FFFFFF',
    backgroundColor : '#FFFFFF',
    borderWidth: 1,
    borderRadius: 5
  },
  submitButton: {
    backgroundColor: '#AABBCC',
    marginLeft: 8,
    borderRadius: 5,
    paddingVertical: 8,
    paddingHorizontal: 16
  },
  submitButtonText: {
    color: '#FFFFFF'
  },
});

export default ChatbotScreen;