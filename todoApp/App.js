import React from "react";
import { Text, View } from "react-native";

import { NavigationContainer, DarkTheme } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import Todo from "./screens/Todo/Todo";
import { theme } from "./theme/colors";
function SettingsScreen() {
	return (
		<View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
			<Text style={{ color: "white" }}>Settings!</Text>
		</View>
	);
}

const Tab = createBottomTabNavigator();
export default function App() {
	return (
		<NavigationContainer theme={DarkTheme}>
			<Tab.Navigator
				screenOptions={{
					headerShown: false,
					tabBarActiveTintColor: "white",
					tabBarInActiveTintColor: theme.grey,
				}}
			>
				<Tab.Screen name="Home" component={Todo} />
				<Tab.Screen name="Settings" component={SettingsScreen} />
			</Tab.Navigator>
		</NavigationContainer>
	);
}

const style = {};
