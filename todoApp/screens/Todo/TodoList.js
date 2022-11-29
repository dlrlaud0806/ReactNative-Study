import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  Alert,
} from "react-native";
import { FontAwesome, Feather } from "@expo/vector-icons";
import DraggableFlatList from "react-native-draggable-flatlist";
import { theme } from "../../theme/colors";

const STORAGE_KEY = "@toDos";

export default function TodoList({
  toDos,
  working,
  setToDos,
  saveToDos,
  loadToDos,
}) {
  useEffect(() => {}, [toDos]);

  // console.log("dataarr : ", data);

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
    const newToDos = toDos.filter(function (data) {
      return data.key != key;
    });

    setToDos(newToDos);
    await saveToDos(newToDos);
    Alert.alert("삭제되었습니다.");
  };

  const renderItem = ({ item, index, move, moveEnd, isActive }) => {
    return (
      <View style={styles.toDo} key={item.key}>
        <TouchableOpacity onLongPress={move} onPressOut={moveEnd}>
          <Feather
            name="list"
            size={24}
            color="white"
            backgroundColor="white"
            maxWidth="10%"
          />
        </TouchableOpacity>
        <Text style={styles.toDoText}>{item.text}</Text>
        <TouchableOpacity onPress={() => deleteConfirm(item.key)}>
          <FontAwesome name="trash-o" size={24} color="white" />
        </TouchableOpacity>
      </View>
    );
  };
  return (
    <DraggableFlatList
      data={toDos}
      renderItem={renderItem}
      keyExtractor={(item) => item.key}
      onMoveEnd={({ data }) => {
        console.log("end", data);
        setToDos({ data });
        saveToDos({ data });
        loadToDos({ data });
      }}
    />
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
