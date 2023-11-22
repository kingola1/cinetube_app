import {
	View,
	Text,
	TouchableOpacity,
	FlatList,
	Image,
	StyleSheet,
} from "react-native";
import React from "react";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import * as MediaLibrary from "expo-media-library";
import { Camera } from "expo-camera";

const CustomCamera = () => {
	const [medias, setMedias] = React.useState([]);
	const [hasPermission, setHasPermission] = React.useState(false);

	React.useEffect(() => {
		(async () => {
			if (await requireCameraPermissions()) {
				setHasPermission(true);
			}
			if (await requireCameraRollPermissions()) {
				const files = await MediaLibrary.getAssetsAsync({
					first: 20,
					mediaType: ["photo", "video"],
					sortBy: ["creationTime"],
				});
				setMedias(files.assets);
			}
		})();
	}, []);

	const requireCameraRollPermissions = async () => {
		const { status } = await MediaLibrary.requestPermissionsAsync(false);
		return status === "granted";
	};

	const requireCameraPermissions = async () => {
		const { status } = await Camera.requestCameraPermissionsAsync();
		return status === "granted";
	};

	if (!hasPermission) {
		return (
			<View
				style={{
					flex: 1,
					alignItems: "center",
					justifyContent: "center",
				}}
			>
				<Text style={{ color: "#fff" }}>No access to camera</Text>
			</View>
		);
	}

	return (
		<View style={styles.container}>
			<Camera style={styles.camera} />
			<View style={styles.footer}>
				<View style={styles.medias}>
					<FlatList
						data={medias}
						renderItem={({ item }) => (
							<Image
								style={styles.media}
								source={{ uri: item.uri }}
								resizeMode="cover"
							/>
						)}
						keyExtractor={(item) => item.id}
						horizontal
					/>
				</View>
				<View style={styles.button}>
					<TouchableOpacity>
						<Ionicons
							name="ios-flash-sharp"
							size={30}
							color="white"
						/>
					</TouchableOpacity>
					<TouchableOpacity>
						<MaterialIcons name="camera" size={100} color="white" />
					</TouchableOpacity>
					<TouchableOpacity>
						<Ionicons
							name="camera-reverse"
							size={30}
							color="white"
						/>
					</TouchableOpacity>
				</View>
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "black",
	},
	camera: {
		flex: 1,
	},
	footer: {
		position: "absolute",
		bottom: 0,
		width: "100%",
	},
	medias: {
		flex: 1,
		width: "100%",
		marginBottom: 10,
	},
	media: {
		width: 80,
		height: 80,
		marginHorizontal: 4,
	},
	button: {
		flex: 1,
		width: "100%",
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-around",
		marginBottom: 20,
	},
});

export default CustomCamera;
