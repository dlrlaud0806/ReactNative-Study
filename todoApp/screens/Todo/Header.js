import React from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";

import { theme } from "../../theme/colors";

export default function Header({ work, travel, working }) {
	return (
		<View style={styles.header}>
			<TouchableOpacity onPress={work}>
				<Text
					style={{ ...styles.btnText, color: working ? "white" : theme.grey }}
				>
					Work
				</Text>
			</TouchableOpacity>
			<TouchableOpacity onPress={travel}>
				<Text
					style={{
						...styles.btnText,
						color: !working ? "white" : theme.grey,
					}}
				>
					Travel
				</Text>
			</TouchableOpacity>
		</View>
	);
}

const styles = StyleSheet.create({
	header: {
		justifyContent: "space-between",
		flexDirection: "row",
		marginTop: 50,
	},
	btnText: {
		fontSize: 38,
		fontWeight: "600",
	},
});
