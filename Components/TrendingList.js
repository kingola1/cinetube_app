import React from 'react';
import { View, Text, Image, TouchableWithoutFeedback, Dimensions, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { image500 } from '../constants/api';
import Carousel from 'react-native-snap-carousel';

const { width, height } = Dimensions.get('window');

const MovieCard = ({ item, handleClick }) => {
    return (
        <TouchableWithoutFeedback onPress={() => handleClick(item)}>
            <Image
                // source={require('../assets/images/moviePoster1.png')}
                source={{ uri: image500(item.poster_path) }}
                style={styles.movieImage}
            />
        </TouchableWithoutFeedback>
    );
}

export default function TrendingMovies({ data }) {
    const navigation = useNavigation();

    const handleClick = (item) => {
        navigation.navigate('Movie', item);
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Trending</Text>
            <Carousel
                data={data}
                renderItem={({ item }) => <MovieCard handleClick={handleClick} item={item} />}
                firstItem={1}
                // loop={true}
                // inactiveSlideScale={0.86}
                inactiveSlideOpacity={0.60}
                sliderWidth={width}
                itemWidth={width * 0.62}
                slideStyle={{ display: 'flex', alignItems: 'center' }}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        marginBottom: 8,
    },
    title: {
        color: 'white',
        fontSize: 18,
        marginHorizontal: 4,
        marginBottom: 5,
    },
    movieImage: {
        width: width * 0.6,
        height: height * 0.4,
        borderRadius: 16,
    },
});
