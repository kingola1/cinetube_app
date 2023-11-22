import { View, Text, ScrollView, TouchableWithoutFeedback, Image, Dimensions, TouchableOpacity, StyleSheet } from 'react-native';
import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { fallbackMoviePoster, image185 } from '../constants/api';
import { styles } from "../constants/styles"

const { width, height } = Dimensions.get('window');

export default function MovieList({ title, hideSeeAll, data }) {
    const navigation = useNavigation();

    return (
        <View style={style.container}>
            <View style={style.header}>
                <Text style={style.titleText}>{title}</Text>
                {!hideSeeAll && (
                    <TouchableOpacity>
                        <Text style={[styles.text, style.seeAllText]}>See All</Text>
                    </TouchableOpacity>
                )}
            </View>

            <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={style.scrollViewContent}
            >
                {data.map((item, index) => (
                    <TouchableWithoutFeedback
                        key={index}
                        onPress={() => {
                            navigation.push('Details', { item })
                        }}
                    >
                        <View style={style.movieContainer}>
                            <Image
                                source={{ uri: image185(item.poster_path) || fallbackMoviePoster }}
                                style={style.movieImage}
                            />
                            <Text style={style.movieTitle}>
                                {item.title.length > 14
                                    ? item.title.slice(0, 14) + '...'
                                    : item.title}
                            </Text>
                        </View>
                    </TouchableWithoutFeedback>
                ))}
            </ScrollView>
        </View>
    );
};

const style = StyleSheet.create({
    container: {
        marginBottom: 8,
        paddingVertical: 4,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginHorizontal: 4,
        marginVertical: 4,
    },
    titleText: {
        color: 'white',
        fontSize: 18,
    },
    seeAllText: {
        fontSize: 18,
    },
    scrollViewContent: {
        paddingHorizontal: 15,
    },
    movieContainer: {
        marginRight: 4,
        flexDirection: 'column',
        alignItems: 'center',
    },
    movieImage: {
        width: width * 0.33,
        height: height * 0.22,
        borderRadius: 16,
    },
    movieTitle: {
        color: 'rgba(255, 255, 255, 0.6)',
        marginTop: 4,
    },
});

