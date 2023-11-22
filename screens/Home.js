import * as React from "react";
import {
	StatusBar,
	Text,
	View,
	StyleSheet,
	FlatList,
	Image,
	Dimensions,
	Animated,
	TouchableOpacity,
	Platform,
	SafeAreaView,
} from "react-native";

import { useNavigation } from "@react-navigation/native";
import { getMovies } from "../constants/api";
import Genres from "../Components/Genre";
import Rating from "../Components/Rating";
import { LinearGradient } from "expo-linear-gradient";
import { BlurView } from "expo-blur";
import { COLORS } from "../constants/themes";
// import { BlurView } from "@react-native-community/blur";

const { width, height } = Dimensions.get("window");
const SPACING = 10;
const ITEM_SIZE = Platform.OS === "ios" ? width * 0.72 : width * 0.74;
const EMPTY_ITEM_SIZE = (width - ITEM_SIZE) / 2;
const BACKDROP_HEIGHT = height * 0.65;

const Loading = () => (
	<View style={styles.loadingContainer}>
		<Text style={styles.paragraph}>Loading...</Text>
	</View>
);

const Backdrop = ({ movies, scrollX }) => {
	return (
		<View style={{ height: BACKDROP_HEIGHT, width, position: "absolute" }}>
			<FlatList
				data={movies.reverse()}
				keyExtractor={(item) => item.key + "-backdrop"}
				removeClippedSubviews={false}
				contentContainerStyle={{ width, height: BACKDROP_HEIGHT }}
				renderItem={({ item, index }) => {
					if (!item.backdrop) {
						return null;
					}
					const translateX = scrollX.interpolate({
						inputRange: [
							(index - 2) * ITEM_SIZE,
							(index - 1) * ITEM_SIZE,
						],
						outputRange: [0, width],
						// extrapolate:'clamp'
					});
					return (
						<Animated.View
							removeClippedSubviews={false}
							style={{
								position: "absolute",
								width: translateX,
								height,
								overflow: "hidden",
							}}
						>
							<Image
								source={{ uri: item.backdrop }}
								// resizeMode="contain"
								style={{
									width,
									height: BACKDROP_HEIGHT,
									position: "absolute",
								}}
							/>
						</Animated.View>
					);
				}}
			/>
			<LinearGradient
				colors={["rgba(0, 0, 0, 0)", "black"]}
				style={{
					height: BACKDROP_HEIGHT,
					width,
					position: "absolute",
					bottom: 0,
				}}
			/>
		</View>
	);
};

export default function Home() {
	const [movies, setMovies] = React.useState([]);
	const navigation = useNavigation();
	const scrollX = React.useRef(new Animated.Value(0)).current;
	React.useEffect(() => {
		const fetchData = async () => {
			const movies = await getMovies();
			// Add empty items to create fake space
			// [empty_item, ...movies, empty_item]
			setMovies([
				{ key: "empty-left" },
				...movies,
				{ key: "empty-right" },
			]);
		};

		if (movies.length === 0) {
			fetchData(movies);
		}
	}, [movies]);

	if (movies.length === 0) {
		return <Loading />;
	}

	return (
		<SafeAreaView style={styles.container}>
			<Backdrop movies={movies} scrollX={scrollX} />
			<StatusBar auto />
			<Animated.FlatList
				showsHorizontalScrollIndicator={false}
				data={movies}
				keyExtractor={(item) => item.key}
				horizontal
				bounces={false}
				decelerationRate={Platform.OS === "ios" ? 0 : 0.98}
				renderToHardwareTextureAndroid
				contentContainerStyle={{ alignItems: "center" }}
				snapToInterval={ITEM_SIZE}
				snapToAlignment="start"
				onScroll={Animated.event(
					[{ nativeEvent: { contentOffset: { x: scrollX } } }],
					{ useNativeDriver: false }
				)}
				scrollEventThrottle={16}
				renderItem={({ item, index }) => {
					if (!item.poster) {
						return <View style={{ width: EMPTY_ITEM_SIZE }} />;
					}

					const inputRange = [
						(index - 2) * ITEM_SIZE,
						(index - 1) * ITEM_SIZE,
						index * ITEM_SIZE,
					];

					const translateY = scrollX.interpolate({
						inputRange,
						outputRange: [100, 20, 100],
						extrapolate: "clamp",
					});

					const translateYValue = translateY.__getValue();

					return (
						<View style={{ width: ITEM_SIZE }}>
							<TouchableOpacity
								onPress={() => {
									navigation.navigate("Details", { item });
								}}
							>
								<BlurView
									style={{
										marginHorizontal: SPACING,
										padding: SPACING * 2,
										alignItems: "center",
										transform: [
											{
												translateY: translateYValue,
											},
										],
										borderRadius: 30,
										overflow: "hidden",
									}}
									tint="light"
									intensity={10}
								>
									<Image
										source={{ uri: item.poster }}
										style={styles.posterImage}
									/>
									<Text
										style={{
											fontSize: 24,
											color: COLORS.white,
										}}
										numberOfLines={1}
									>
										{item.title}
									</Text>
									<Rating rating={item.rating} />
									<Genres genres={item.genres} />
									<Text
										style={{
											fontSize: 12,
											color: COLORS.white,
										}}
										numberOfLines={3}
									>
										{item.description}
									</Text>
								</BlurView>
							</TouchableOpacity>
						</View>
					);
				}}
			/>
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({
	loadingContainer: {
		flex: 1,
		alignItems: "center",
		justifyContent: "center",
	},
	container: {
		flex: 1,
		backgroundColor: "black",
	},
	paragraph: {
		margin: 24,
		fontSize: 18,
		fontWeight: "bold",
		textAlign: "center",
	},
	posterImage: {
		width: "100%",
		height: ITEM_SIZE * 1.2,
		resizeMode: "contain",
		borderRadius: 24,
		margin: 0,
		marginBottom: 10,
	},
});
