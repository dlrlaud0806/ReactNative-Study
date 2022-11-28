import React from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  Alert,
} from "react-native";
import { FontAwesome, Feather } from "@expo/vector-icons";

import { theme } from "../../theme/colors";

const STORAGE_KEY = "@toDos";

export default function TodoList({ toDos, working, setToDos, saveToDos }) {
  const deleteConfirm = (key) =>
    Alert.alert("삭제 확인", "삭제하시겠습니까?", [
      {
        text: "취소",
        onPress: () => Alert.alert("취소되었습니다."),
        style: "cancel",
      },
      { text: "삭제", onPress: () => deleteToDo(key) },
    ]);

  const deleteToDo = async (key) => {
    const newToDos = { ...toDos };

    delete newToDos[key];
    setToDos(newToDos);
    await saveToDos(newToDos);
    Alert.alert("삭제되었습니다.");
  };
  return (
    <ScrollView>
      {Object.keys(toDos).map((key) =>
        toDos[key].working === working ? (
          <View style={styles.toDo} key={key}>
            <Feather name="list" size={24} color="white" />
            <Text style={styles.toDoText}>{toDos[key].text}</Text>
            <TouchableOpacity onPress={() => deleteConfirm(key)}>
              <FontAwesome name="trash-o" size={24} color="white" />
            </TouchableOpacity>
          </View>
        ) : null
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  toDo: {
    backgroundColor: theme.toDoBg,
    marginBottom: 10,
    paddingVertical: 20,
    paddingHorizontal: 20,
    borderRadius: 15,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  toDoText: {
    color: "white",
    fontSize: 16,
    fontWeight: "600",
    maxWidth: "80%",
    paddingHorizontal: 20,
    marginLeft: 15,
    marginRight: "auto",
  },
});
