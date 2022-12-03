import React, { useEffect } from "react";
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
import { Calendar, CalendarList, Agenda } from "react-native-calendars";
import Header from "./Header";

// format
// {
//   day: 1,      // day of month (1-31)
//   month: 1,    // month of year (1-12)
//   year: 2017,  // year
//   timestamp,   // UTC timestamp representing 00:00 AM of this date
//   dateString: '2016-05-13' // date formatted as 'YYYY-MM-DD' string
// }

// async function getDefaultCalendarSource() {
//   const defaultCalendar = await Calendar.getDefaultCalendarAsync();
//   return defaultCalendar.source;
// }

export default function MyCalendar() {
  return (
    <View style={styles.container}>
      <Header />
      {/* <Text>Calendar Module Example</Text>
      <Button title="Create a new calendar" onPress={createCalendar} /> */}
      <Agenda
        items={{
          "2022-12-02": [{ name: "item 1 - any js object" }],
          "2022-12-03": [{ name: "item 2 - any js object", height: 80 }],
          "2022-12-04": [],
          "2022-12-05": [
            { name: "item 3 - any js object" },
            { name: "any js object" },
          ],
        }}
        loadItemsForMonth={(month) => {
          console.log("trigger items loading", month);
        }}
        // Callback that fires when the calendar is opened or closed
        onCalendarToggled={(calendarOpened) => {
          console.log("calendar toggle", calendarOpened);
        }}
        // Callback that gets called on day press
        onDayPress={(day) => {
          console.log("day pressed", day);
        }}
        // Callback that gets called when day changes while scrolling agenda list
        onDayChange={(day) => {
          console.log("day changed", day);
        }}
        // Initially selected day
        selected={"2022-12-03"}
        // Minimum date that can be selected, dates before minDate will be grayed out. Default = undefined
        minDate={"2022-01-01"}
        // Maximum date that can be selected, dates after maxDate will be grayed out. Default = undefined
        maxDate={"2025-12-31"}
        // Max amount of months allowed to scroll to the past. Default = 50
        pastScrollRange={50}
        // Max amount of months allowed to scroll to the future. Default = 50
        futureScrollRange={50}
        // Specify how each item should be rendered in agenda
        renderItem={(item, firstItemInDay) => {
          console.log("renderitem : ", item, firstItemInDay);
          return (
            <View style={styles.toDo}>
              <Text style={styles.toDoText}>
                {firstItemInDay ? item.name : null}
              </Text>
            </View>
          );
        }}
        // Specify how each date should be rendered. day can be undefined if the item is not first in that day
        renderDay={(day, item) => {
          console.log("renderday : ", day, item);
          return (
            <View style={styles.toDo} key={day}>
              <Text style={styles.toDoText}>
                {day ? day.toISOString().split("T")[0].substring(5, 10) : null}
              </Text>
            </View>
          );
        }}
        // Specify how empty date content with no items should be rendered
        renderEmptyDate={() => {
          return <View />;
        }}
        // Override inner list with a custom implemented component
        // renderList={(listProps) => {
        //   // return <MyCustomList {...listProps} />;
        //   console.log("renderList : ", listProps);
        //   return (
        //     <View style={styles.toDo}>
        //       <TouchableOpacity>
        //         <Feather
        //           name="list"
        //           size={24}
        //           color="white"
        //           backgroundColor="white"
        //           maxWidth="10%"
        //         />
        //       </TouchableOpacity>
        //       <Text style={styles.toDoText}>
        //         {[listProps.items["2022-12-02"]]}
        //       </Text>
        //       <TouchableOpacity>
        //         <FontAwesome name="trash-o" size={24} color="white" />
        //       </TouchableOpacity>
        //     </View>
        //   );
        // }}
        // Specify what should be rendered instead of ActivityIndicator
        renderEmptyData={() => {
          return <View />;
        }}
        // Specify your item comparison function for increased performance
        rowHasChanged={(r1, r2) => {
          return r1.text !== r2.text;
        }}
        // Hide knob button. Default = false
        // hideKnob={true}
        // When `true` and `hideKnob` prop is `false`, the knob will always be visible and the user will be able to drag the knob up and close the calendar. Default = false
        showClosingKnob={true}
        // By default, agenda dates are marked if they have at least one item, but you can override this if needed
        // markedDates={{
        //   "2012-05-16": { selected: true, marked: true },
        //   "2012-05-17": { marked: true },
        //   "2012-05-18": { disabled: true },
        // }}
        // If disabledByDefault={true} dates flagged as not disabled will be enabled. Default = false
        disabledByDefault={true}
        // If provided, a standard RefreshControl will be added for "Pull to Refresh" functionality. Make sure to also set the refreshing prop correctly
        onRefresh={() => console.log("refreshing...")}
        // Set this true while waiting for new data from a refresh
        refreshing={false}
        // Add a custom RefreshControl component, used to provide pull-to-refresh functionality for the ScrollView
        refreshControl={null}
        // Agenda theme
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
