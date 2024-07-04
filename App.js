import React, { useState } from 'react';
import { StyleSheet, Text, View, Button, TextInput, FlatList, Pressable,Modal,Image } from 'react-native';
import { StatusBar } from 'expo-status-bar';
export default function App() {
  const [enteredGoalText, setEnteredGoalText] = useState('');
  const [courseGoals, setCourseGoals] = useState([]);
  const [modelIsVisible,setModelIsVisible] = useState(false);
  const goalInputHandler = (enteredText) => {
    setEnteredGoalText(enteredText);
  };

    const addGoalHandler = () => {
      if (enteredGoalText.trim().length === 0) {
        return;  
      }

    setCourseGoals((currentCourseGoals) => [
      ...currentCourseGoals,
      { text: enteredGoalText, id: Math.random().toString() },
    ]);
    setEnteredGoalText(''); 
    endAddGoalHandler();
    // Clear input after adding goal
  };

  const deleteGoalHandler = (id) => {
    setCourseGoals((currentCourseGoals) =>
      currentCourseGoals.filter((goal) => goal.id !== id)
    );
  };
function startAddGoalHandler(){
  setModelIsVisible(true);
}
function endAddGoalHandler(){
  setModelIsVisible(false);
}

  return (
<>
<StatusBar style="light" />

    <View style={styles.container}>
<Button title='Add New Goal'color='#a065ec' onPress={startAddGoalHandler}/>
  
   <Modal visible={modelIsVisible} animationType="slide">
      <View style={styles.inputContainer}>
       <Image source={require('./assets/Images/goal.png')} style={styles.image} />
        <TextInput
          style={styles.textInput}
          placeholder="Your Course goal"
          onChangeText={goalInputHandler}
          value={enteredGoalText}
        />

       
      
     
      <View style={styles.buttonContainer}>

        <View style={styles.button}>
      <Button title="Add Goal" onPress={addGoalHandler} color="#5e0acc" />
      </View>

      <View style={styles.button}>
      <Button title="Cancel" onPress={endAddGoalHandler} color="#f31282" />
      </View>

      </View>
      </View>
      </Modal>
    

      <View style={styles.goalContainer}>
        <FlatList
          data={courseGoals}
          renderItem={({ item }) => (
            <View style={styles.goalItem}>
            <Pressable android_ripple={{color:'#00008b'}} onPress={() => deleteGoalHandler(item.id)}>
                <Text style={styles.goalText}>{item.text}</Text>
            </Pressable>
            </View>
          )}
          keyExtractor={(item) => item.id}
          alwaysBounceVertical={false}
        />
      </View>
    </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 50,
    paddingHorizontal: 16,
    backgroundColor:'#1e085a'
  },
  inputContainer: {
    flex:1,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 24,
  padding:16,
  backgroundColor:'#311b6b'
  },
  textInput: {
    borderWidth: 1,
    borderColor: '#e4d0ff',
    backgroundColor:'#e4d0ff',
    width: '100%',
   color:'#120438',
    padding: 16,
    borderRadius:6,
  },
  goalContainer: {
    flex: 8,
  },
  goalItem: {
    margin: 8,
    borderRadius: 6,
 
    backgroundColor: '#5e0acc',
  },
  goalText: {
    color: 'white',
    padding: 8,
  },
  buttonContainer:{
    flexDirection:'row',
    marginTop:16
  },
  button:{
    width:100,
    marginHorizontal:8
  },
image:{
width:100,
height:100,
margin:20
},

});

