import {
	SafeAreaView,
	Text,
	TextInput,
	TouchableOpacity,
	StyleSheet,
	View,
	KeyboardAvoidingView,
	TouchableWithoutFeedback,
	Keyboard,
	FlatList,
} from "react-native";
import React, { useState } from "react";
import { Ionicons, FontAwesome } from "@expo/vector-icons";
import CustomCamera from "../Components/CustomCamera2";
import { COLORS } from "../constants/themes";
import ChatBubble from "../Components/ChatBubble";
import ChatHeader from "../Components/ChatHeader";

const Chat = ({ route, navigation }) => {
	const data = route.params.data;
	const [showCamera, setShowCamera] = useState(false);
	const [message, setMessage] = useState("");
	const [chatDetails, setChatDetails] = useState(false);
	const [chatMessages, setChatMessages] = useState([
		{ id: 1, text: "Hello there!", type: "text", user: 1 },
		{ id: 2, text: "How are you doing?", type: "text", user: 1 },
		{ id: 3, text: "React Native is awesome!", type: "text", user: 1 },
		{
			id: 4,
			text: "What's your favorite programming language?",
			type: "text",
			user: 1,
		},
		{
			id: 5,
			text: "Let's build something great together!",
			type: "text",
			user: 1,
		},
		{
			id: 6,
			text: "https://image.tmdb.org/t/p/w370_and_h556_multi_faces/jkKVLzLWjSvTnc84VzeljhSy6j8.jpg",
			type: "image",
			user: 1,
		},
	]);

	const currentUser = 0;

	const handleSendMessage = () => {
		if (message.trim() !== "") {
			setChatMessages([
				...chatMessages,
				{
					id: chatMessages.length + 1,
					text: message,
					type: "text",
					user: currentUser,
				},
			]);
			setMessage("");
		}
	};

	React.useEffect(() => {
		setChatDetails(data);
	}, [data]);

	return (
		<SafeAreaView style={styles.container}>
			<ChatHeader
				title={chatDetails?.title}
				image={chatDetails?.poster}
				navigation={navigation}
				count={"999+"}
			/>
			{showCamera ? (
				<CustomCamera />
			) : (
				<KeyboardAvoidingView
					behavior={Platform.OS === "ios" ? "padding" : "height"}
					style={styles.container}
				>
					<TouchableWithoutFeedback onPress={Keyboard.dismiss}>
						<View>
							<FlatList
								data={chatMessages}
								renderItem={({ item }) => (
									<ChatBubble
										message={item.text}
										type={item.type}
										id={item.id}
										isUser={
											item.user == currentUser
												? true
												: false
										}
									/>
								)}
								keyExtractor={(item) => item.id}
								horizontal={false}
							/>
							<View style={styles.inputContainer}>
								<TextInput
									multiline
									style={styles.input}
									placeholder="Type your message..."
									value={message}
									onChangeText={(text) => setMessage(text)}
								/>

								<TouchableOpacity
									onPress={() => setShowCamera(true)}
								>
									<Ionicons
										name="camera"
										size={24}
										color={COLORS.primary}
									/>
								</TouchableOpacity>
								{message.trim() === "" ? (
									<TouchableOpacity style={styles.sendButton}>
										<Ionicons
											name="mic-outline"
											size={24}
											color={COLORS.primary}
										/>
									</TouchableOpacity>
								) : (
									<TouchableOpacity
										style={styles.sendButton}
										onPress={handleSendMessage}
									>
										<FontAwesome
											name="send-o"
											size={20}
											color={COLORS.primary}
										/>
									</TouchableOpacity>
								)}
							</View>
						</View>
					</TouchableWithoutFeedback>
				</KeyboardAvoidingView>
			)}
		</SafeAreaView>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: "flex-end", // Align content at the bottom
		backgroundColor: COLORS.black,
	},
	chatContainer: {
		padding: 10,
		backgroundColor: COLORS.primary,
		minHeight: 40,
		height: "auto",
		marginVertical: 20,
		marginLeft: 5,
		width: "60%",
		borderRadius: 10,
		color: "white",
	},
	chatText: {
		color: "white",
	},
	inputContainer: {
		flexDirection: "row",
		alignItems: "center",
		padding: 10,
	},
	input: {
		flex: 1,
		height: "auto",
		borderWidth: 1,
		borderColor: "#ccc",
		marginRight: 10,
		paddingTop: 12,
		padding: 12,
		borderRadius: 25,
		alignItems: "center",
		justifyContent: "center",
		fontSize: 16,
		color: COLORS.white,
	},
	sendButton: {
		backgroundColor: "transparent",
		height: 50,
		width: 50,
		borderRadius: 50,
		alignItems: "center",
		justifyContent: "center",
	},
	cameraButton: {
		marginRight: 10,
	},
});

export default Chat;
