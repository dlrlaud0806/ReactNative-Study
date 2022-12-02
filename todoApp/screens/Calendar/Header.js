import React from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";

import { theme } from "../../theme/colors";

export default function Header() {
  return (
    <View style={styles.header}>
      <Text
        style={{
          ...styles.btnText,
          color: "white",
        }}
      >
        Calendar
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    paddingVertical: 20,
  },
  btnText: {
    fontSize: 38,
    fontWeight: "600",
  },
});
