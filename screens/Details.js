import {
	SafeAreaView,
	View,
	Image,
	Text,
	StyleSheet,
	ScrollView,
	Dimensions,
} from "react-native";
import React from "react";
import { COLORS } from "../constants/themes";
import { Ionicons } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native";
import {
	fetchMovieCredits,
	fetchMovieDetails,
	fetchSimilarMovies,
	image500,
} from "../constants/api";
import MovieList from "../Components/MovieList";
import Cast from "../Components/Cast";

var { width, height } = Dimensions.get("window");

export default function Details({ route, navigation }) {
	const data = route.params.item;
	const [movie, setMovie] = React.useState({});
	const [cast, setCast] = React.useState([]);
	const [similarMovies, setSimilarMovies] = React.useState([]);
	const [isFavourite, toggleFavourite] = React.useState(false);
	const [loading, setLoading] = React.useState(false);

	React.useEffect(() => {
		setLoading(true);
		getMovieDetials(data?.key || data?.id);
		getMovieCredits(data?.key || data?.id);
		getSimilarMovies(data?.key || data?.id);
	}, [data]);

	const getMovieDetials = async (id) => {
		const data = await fetchMovieDetails(id);
		// console.log('got movie details');
		setLoading(false);
		if (data) {
			setMovie({ ...movie, ...data });
		}
	};
	const getMovieCredits = async (id) => {
		const data = await fetchMovieCredits(id);
		// console.log('got movie credits')
		if (data && data.cast) {
			setCast(data.cast);
		}
	};
	const getSimilarMovies = async (id) => {
		const data = await fetchSimilarMovies(id);
		// console.log('got similar movies');
		if (data && data.results) {
			setSimilarMovies(data.results);
		}
	};
	// console.log(data);
	return (
		<ScrollView style={styles.container}>
			<View style={{ width: "100%" }}>
				<SafeAreaView style={styles.header}>
					<TouchableOpacity
						onPress={() => navigation.goBack()}
						style={styles.backButton}
					>
						<Ionicons
							name="play-back-sharp"
							size={18}
							color={COLORS.white}
							style={styles.backIcon}
						/>
						<Text style={styles.backText}>Back</Text>
					</TouchableOpacity>

					<TouchableOpacity
						onPress={() => navigation.navigate("Chat", { data })}
					>
						<Ionicons
							name="ios-chatbubble-ellipses-outline"
							size={24}
							color={COLORS.primary}
						/>
					</TouchableOpacity>
				</SafeAreaView>
				<View>
					<Image
						source={{
							uri: data?.backdrop || image500(movie.poster_path),
						}}
						style={styles.image}
					/>
				</View>
				<View style={styles.descriptionContainer}>
					<Text style={styles.title}>{data?.title}</Text>
					{movie?.id ? (
						<Text style={styles.description}>
							{movie?.status} •{" "}
							{movie?.release_date?.split("-")[0] || "N/A"} •{" "}
							{movie?.runtime} min
						</Text>
					) : (
						<Text>NUL</Text>
					)}
					<View style={styles.genre}>
						{movie?.genres?.map((genre, index) => {
							let showDot = index + 1 != movie.genres.length;
							return (
								<Text key={index} style={styles.genreText}>
									{genre?.name} {showDot ? "•" : null}
								</Text>
							);
						})}
					</View>

					<Text style={styles.description}>
						{data?.description || data?.overview}
					</Text>

					<View style={{ marginVertical: 10 }}>
						{movie?.id && cast.length > 0 && (
							<Cast navigation={navigation} cast={cast} />
						)}
					</View>
					{movie?.id && similarMovies.length > 0 && (
						<MovieList
							title={"Similar Movies"}
							hideSeeAll={true}
							data={similarMovies}
						/>
					)}
				</View>
			</View>
		</ScrollView>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: COLORS.black,
	},
	header: {
		flexDirection: "row",
		// paddingHorizontal: 4,
		marginHorizontal: 20,
		justifyContent: "space-between",
		alignItems: "center",
		position: "absolute",
		zIndex: 20,
		// width: "100%"
	},
	backButton: {
		flexDirection: "row",
		flex: 1,
		alignItems: "center",
	},
	backIcon: {
		marginRight: 4,
	},
	backText: {
		color: COLORS.white,
		fontWeight: "normal",
		fontSize: 20,
	},
	image: {
		width,
		height: height * 0.55,
	},
	descriptionContainer: {
		borderTopLeftRadius: 50,
		borderTopRightRadius: 50,
		backgroundColor: "black",
		paddingVertical: 20,
		position: "relative",
		top: -80,
	},
	title: {
		color: COLORS.white,
		fontSize: 40,
		marginBottom: 15,
		fontWeight: "bold",
		textAlign: "center",
	},
	description: {
		color: COLORS.white,
		marginBottom: 15,
		textAlign: "center",
		paddingHorizontal: 10,
	},
	genre: {
		flexDirection: "row",
		justifyContent: "center",
		marginHorizontal: 4,
		marginBottom: 15,
	},
	genreText: {
		color: COLORS.white,
		fontWeight: "600",
		fontSize: 16,
		textAlign: "center",
	},
});
