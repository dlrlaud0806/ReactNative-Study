import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Button,
  Platform,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { FontAwesome, Feather } from "@expo/vector-icons";
// import * as Calendar from "expo-calendar";
import { theme } from "../../theme/colors";
import { Card, Avatar } from "react-native-paper";
import { Calendar, CalendarList, Agenda } from "react-native-calendars";

// import * as WebBrowser from "expo-web-browser";
// import * as Google from "expo-auth-session/providers/google";

import Header from "./Header";

// GoogleSignin.configure({
//   scopes: ["https://www.googleapis.com/auth/calendar"], // what API you want to access on behalf of the user, default is email and profile
//   offlineAccess: false, // if you want to access Google API on behalf of the user FROM YOUR SERVER
//   hostedDomain: "", // specifies a hosted domain restriction
//   forceCodeForRefreshToken: true, // [Android] related to `serverAuthCode`, read the docs link below *.
//   accountName: "", // [Android] specifies an account name on the device that should be used
// });
// WebBrowser.maybeCompleteAuthSession();
const timeToString = (time) => {
  const date = new Date(time);
  return date.toISOString().split("T")[0];
};

export default function MyCalendar() {
  const [items, setItems] = useState({});

  const loadItems = (day) => {
    setTimeout(() => {
      for (let i = -15; i < 85; i++) {
        const time = day.timestamp + i * 24 * 60 * 60 * 1000;
        const strTime = timeToString(time);
        if (!items[strTime]) {
          items[strTime] = [];
          const numItems = Math.floor(Math.random() * 3 + 1);
          for (let j = 0; j < numItems; j++) {
            items[strTime].push({
              name: "Item for " + strTime + " #" + j,
              height: Math.max(50, Math.floor(Math.random() * 150)),
            });
          }
        }
      }
      const newItems = {};
      Object.keys(items).forEach((key) => {
        newItems[key] = items[key];
      });
      setItems(newItems);
    }, 1000);
  };

  const renderItem = (item) => {
    return (
      <TouchableOpacity style={{ marginRight: 10, marginTop: 17 }}>
        <Card>
          <Card.Content>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Text>{item.name}</Text>
              <Avatar.Text label="GM" />
            </View>
          </Card.Content>
        </Card>
      </TouchableOpacity>
    );
  };
  // const [request, response, promptAsync] = Google.useAuthRequest({
  //   expoClientId:
  //     "48595149593-8dv1f3vh1dla7uimnknv69hu17hkp9nm.apps.googleusercontent.com",
  // });
  // useEffect(() => {
  //   if (response?.type === "success") {
  //     const { authentication } = response;
  //   }
  // }, [response]);

  return (
    <View style={styles.container}>
      <Header />
      {/* <Button
        disabled={!request}
        title="Login"
        onPress={() => {
          promptAsync();
        }}
      /> */}
      <Agenda
        items={items}
        loadItemsForMonth={loadItems}
        selected={"2022-12-09"}
        renderItem={renderItem}
        // Agenda theme
        minDate={"2022-01-01"}
        maxDate={"2022-12-31"}
        theme={{
          // ...styles.theme,
          agendaDayTextColor: "yellow",
          agendaDayNumColor: "green",
          agendaTodayColor: "red",
          agendaKnobColor: "black",
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 30,
    flex: 1,
    backgroundColor: theme.bg,
    paddingHorizontal: 20,
  },
  toDo: {
    backgroundColor: theme.toDoBg,
    marginBottom: 10,
    paddingVertical: 20,
    // paddingHorizontal: 20,
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
  // theme: {
  //   backgroundColor: theme.toDoBg,
  //   calendarBackground: "#222",
  //   dayTextColor: "#fff",
  //   textDisabledColor: "#444",
  //   monthTextColor: "#888",
  // },
});
