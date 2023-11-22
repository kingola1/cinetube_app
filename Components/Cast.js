import { View, Text, ScrollView, TouchableOpacity, Image, Dimensions, StyleSheet } from 'react-native'
import React from 'react'
import { fallbackPersonImage, image185, image342 } from '../constants/api';
import { useNavigation } from '@react-navigation/native';
var { width, height } = Dimensions.get('window');

export default function Cast({ cast }) {
    const navigation = useNavigation();
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Top Cast</Text>
            <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.scrollViewContent}
            >
                {cast &&
                    cast.map((person, index) => (
                        <TouchableOpacity
                            key={index}
                            onPress={() => navigation.navigate('Person', person)}
                            style={styles.castItem}
                        >
                            <View style={styles.imageContainer}>
                                <Image
                                    style={styles.image}
                                    // source={require('../assets/images/castImage1.png')}
                                    source={{
                                        uri: image185(person?.profile_path) || fallbackPersonImage,
                                    }}
                                />
                            </View>

                            <Text style={styles.characterText}>
                                {person?.character.length > 10
                                    ? person.character.slice(0, 10) + '...'
                                    : person?.character}
                            </Text>
                            <Text style={styles.nameText}>
                                {person?.original_name.length > 10
                                    ? person.original_name.slice(0, 10) + '...'
                                    : person?.original_name}
                            </Text>
                        </TouchableOpacity>
                    ))}
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        marginTop: 6,
    },
    title: {
        color: 'white',
        fontSize: 18,
        marginHorizontal: 16,
        marginBottom: 5,
    },
    scrollViewContent: {
        paddingHorizontal: 15,
    },
    castItem: {
        marginRight: 16,
        alignItems: 'center',
    },
    imageContainer: {
        overflow: 'hidden',
        borderRadius: 50,
        height: 80,
        width: 80,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 2,
        borderColor: '#999',
    },
    image: {
        borderRadius: 12,
        height: 100,
        width: 80,
    },
    characterText: {
        color: 'white',
        fontSize: 12,
        marginTop: 2,
    },
    nameText: {
        color: '#999',
        fontSize: 12,
    },
});