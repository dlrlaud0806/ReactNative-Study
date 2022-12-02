import React, { useEffect } from "react";
import { View, Text, Button, Platform, StyleSheet } from "react-native";
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
      <Agenda />
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
});
