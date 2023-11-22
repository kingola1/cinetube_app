import { View, Text, Image, StyleSheet } from "react-native";
import React from "react";
import { COLORS } from "../constants/themes";

const ChatBubble = ({ message, id, type, isUser }) => {
	return (
		<View
			key={id}
			style={isUser ? styles.userContainer : styles.guestContainer}
		>
			{type === "text" ? (
				<Text style={styles.chatText}>{message}</Text>
			) : type === "image" ? (
				<Image source={{ uri: message }} style={styles.image} />
			) : type === "audio" ? (
				<TouchableOpacity>
					<Text>🔊 Play Audio</Text>
				</TouchableOpacity>
			) : null}
			<Text style={styles.spanText}>
				{isUser ? "You" : "Stranger"} • 12:00{" "}
			</Text>
		</View>
	);
};

export default ChatBubble;

const styles = StyleSheet.create({
	guestContainer: {
		padding: 10,
		backgroundColor: COLORS.chatGuest,
		minHeight: 40,
		height: "auto",
		marginVertical: 20,
		marginLeft: 20,
		width: "60%",
		borderRadius: 10,
	},
	userContainer: {
		padding: 10,
		backgroundColor: COLORS.primary,
		minHeight: 40,
		height: "auto",
		marginVertical: 20,
		marginRight: 20,
		width: "60%",
		borderRadius: 10,
		alignSelf: "flex-end",
	},
	image: {
		width: 200,
		height: 150,
		resizeMode: "cover",
		borderRadius: 5,
	},
	chatText: {
		color: COLORS.white,
		fontSize: 16,
	},
	spanText: {
		color: "#e3e4e6",
		fontSize: 10,
		marginTop: 5,
		alignSelf: "flex-end",
	},
});
