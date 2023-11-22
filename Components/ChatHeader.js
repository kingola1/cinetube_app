import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import React from "react";
import { COLORS } from "../constants/themes";
import { AntDesign } from "@expo/vector-icons";

const ChatHeader = ({ title, count, image, navigation }) => {
	return (
		<View style={styles.container}>
			<TouchableOpacity
				style={styles.backButton}
				onPress={() => navigation.goBack()}
			>
				<AntDesign name="banckward" size={24} color="black" />
			</TouchableOpacity>
			<View style={styles.imageTitleContainer}>
				<Image style={styles.image} source={{ uri: image }} />
				<View style={styles.titleContainer}>
					<Text style={styles.title}>{title}</Text>
					<Text style={styles.count}>{count}</Text>
				</View>
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flexDirection: "row",
		backgroundColor: COLORS.primary,
		paddingTop: 10,
		paddingBottom: 10,
		alignItems: "center",
		marginBottom: 10,
	},
	image: {
		height: 65,
		width: 65,
		borderRadius: 33,
	},
	imageTitleContainer: {
		flexDirection: "row",
		justifyContent: "end",
		flex: 1,
		paddingHorizontal: 20,
	},
	titleContainer: {
		flexDirection: "column",
		justifyContent: "center",
		paddingHorizontal: 10,
	},
	title: {
		flexDirection: "row",
		fontSize: 22,
		fontWeight: "bold",
		color: COLORS.white,
	},
	count: {
		fontSize: 15,
		fontWeight: "normal",
		color: COLORS.chatGuest,
	},
	backButton: {
		alignSelf: "center",
		paddingHorizontal: 10,
	},
});

export default ChatHeader;
