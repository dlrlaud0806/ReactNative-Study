import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  ScrollView,
  Alert,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { theme } from "../../theme/colors";
import Header from "./Header";
import TodoList from "./TodoList";

const STORAGE_KEY = "@toDos";

export default function Todo() {
  const [working, setWorking] = useState(true);
  const [text, setText] = useState("");
  const [toDos, setToDos] = useState({ work: [], personal: [] });

  useEffect(() => {
    loadToDos();
  }, [working]);

  const personal = () => setWorking(false);
  const work = () => setWorking(true);
  const onChangeText = (payload) => setText(payload);

  const saveToDos = async (toSave) => {
    if (Object.keys(toSave).includes("data")) {
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(toSave.data));
      console.log("save : ", toSave.data);
    } else {
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(toSave));
      console.log("save : ", toSave);
    }
  };
  const loadToDos = async () => {
    const s = await AsyncStorage.getItem(STORAGE_KEY);
    s !== null ? setToDos(JSON.parse(s)) : null;
    console.log("load : ", JSON.parse(s));
    // await AsyncStorage.clear();
  };

  const addToDo = async () => {
    if (text === "") {
      return;
    }
    console.log("add :", toDos);
    if (working) {
      const newToDos = toDos;
      newToDos.work.push({
        key: Date.now(),
        text: text,
        working: working,
      });
      setToDos(newToDos);
    } else {
      const newToDos = toDos;
      newToDos.personal.push({
        key: Date.now(),
        text: text,
        working: working,
      });
      setToDos(newToDos);
    }
    console.log("newset : ", toDos);
    saveToDos(toDos);
    setText("");
  };

  return (
    <View style={styles.container}>
      <Header work={work} personal={personal} working={working} />
      <TextInput
        onSubmitEditing={addToDo}
        onChangeText={onChangeText}
        returnKeyType="done"
        value={text}
        placeholder={
          working ? "What do you have to do?" : "Where do you want to go?"
        }
        style={styles.input}
      />
      <TodoList
        toDos={toDos}
        working={working}
        setToDos={setToDos}
        saveToDos={saveToDos}
        loadToDos={loadToDos}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.bg,
    paddingHorizontal: 20,
  },
  header: {
    justifyContent: "space-between",
    flexDirection: "row",
    marginTop: 100,
  },
  btnText: {
    fontSize: 38,
    fontWeight: "600",
  },
  input: {
    backgroundColor: "white",
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 30,
    marginVertical: 20,
    fontSize: 18,
  },
});
