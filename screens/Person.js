import React, { useEffect, useState } from 'react';
import {
    View,
    Text,
    Image,
    TouchableOpacity,
    Platform,
    Dimensions,
    ScrollView,
    SafeAreaView,
    StyleSheet,
} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import MovieList from '../Components/MovieList';
import {
    fallbackPersonImage,
    fetchPersonDetails,
    fetchPersonMovies,
    image342,
} from '../constants/api';
import Loading from '../Components/Loading';
import { COLORS } from '../constants/themes';
import { Ionicons } from '@expo/vector-icons';

const ios = Platform.OS == 'ios';
const verticalMargin = ios ? '' : ' my-3';
const { width, height } = Dimensions.get('window');

export default function PersonScreen() {
    const { params: item } = useRoute();
    const [isFavourite, toggleFavourite] = useState(false);
    const navigation = useNavigation();
    const [person, setPerson] = useState({});
    const [personMovies, setPersonMovies] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true);
        getPersonDetails(item.id);
        getPersonMovies(item.id);
    }, [item]);

    const getPersonDetails = async (id) => {
        const data = await fetchPersonDetails(id);
        console.log('got person details');
        setLoading(false);
        if (data) {
            setPerson(data);
        }
    };

    const getPersonMovies = async (id) => {
        const data = await fetchPersonMovies(id);
        console.log('got person movies');
        if (data && data.cast) {
            setPersonMovies(data.cast);
        }
    };

    return (
        <ScrollView
            style={styles.container}
            contentContainerStyle={{ paddingBottom: 20 }}>
            <SafeAreaView style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                    <Ionicons name="play-back-sharp" size={18} color={COLORS.white} style={styles.backIcon} />
                    <Text style={styles.backText}>Back</Text>
                </TouchableOpacity>

                <TouchableOpacity>
                    <Ionicons name="ios-chatbubble-ellipses-outline" size={24} color={COLORS.primary} />
                </TouchableOpacity>
            </SafeAreaView>

            {/* person details */}
            {loading ? (
                <Loading />
            ) : (
                <View>
                    <View
                        style={[
                            styles.profileImageContainer,
                            {
                                shadowColor: 'gray',
                                shadowRadius: 40,
                                shadowOffset: { width: 0, height: 5 },
                                shadowOpacity: 1,
                            },
                        ]}>
                        <View style={styles.profileImageInnerContainer}>
                            <Image
                                source={{ uri: image342(person?.profile_path) || fallbackPersonImage }}
                                style={styles.profileImage}
                            />
                        </View>
                    </View>

                    <View style={styles.personDetails}>
                        <Text style={styles.personName}>
                            {person?.name}
                        </Text>
                        <Text style={styles.placeOfBirth}>
                            {person?.place_of_birth}
                        </Text>
                    </View>

                    <View style={styles.detailsRow}>
                        <View style={styles.detailsItem}>
                            <Text style={styles.detailsItemTitle}>Gender</Text>
                            <Text style={styles.detailsItemText}>
                                {person?.gender == 1 ? 'Female' : 'Male'}
                            </Text>
                        </View>
                        <View style={styles.detailsItem}>
                            <Text style={styles.detailsItemTitle}>Birthday</Text>
                            <Text style={styles.detailsItemText}>
                                {person?.birthday}
                            </Text>
                        </View>
                        <View style={styles.detailsItem}>
                            <Text style={styles.detailsItemTitle}>known for</Text>
                            <Text style={styles.detailsItemText}>
                                {person?.known_for_department}
                            </Text>
                        </View>
                        <View style={styles.detailsItem}>
                            <Text style={styles.detailsItemTitle}>Popularity</Text>
                            <Text style={styles.detailsItemText}>
                                {person?.popularity?.toFixed(2)} %
                            </Text>
                        </View>
                    </View>

                    <View style={styles.biography}>
                        <Text style={styles.biographyTitle}>Biography</Text>
                        <Text style={styles.biographyText}>
                            {person?.biography ? person.biography : 'N/A'}
                        </Text>
                    </View>

                    {/* person movies */}
                    {person?.id && personMovies.length > 0 && <MovieList title="Movies" hideSeeAll={true} data={personMovies} />}
                </View>
            )}
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.black,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginHorizontal: 16,
    },
    backButton: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    backIcon: {
        marginRight: 4,
    },
    backText: {
        color: COLORS.white,
        fontWeight: 'normal',
        fontSize: 18,
    },
    profileImageContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
    },
    profileImageInnerContainer: {
        overflow: 'hidden',
        borderRadius: 50,
        height: 288,
        width: 288,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 2,
        borderColor: COLORS.white,
    },
    profileImage: {
        borderRadius: 24,
        height: 432,
        width: 296,
    },
    personDetails: {
        marginTop: 24,
        alignItems: 'center',
    },
    personName: {
        color: COLORS.primary,
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    placeOfBirth: {
        color: COLORS.white,
        fontSize: 16,
        textAlign: 'center',
    },
    detailsRow: {
        marginVertical: 24,
        marginHorizontal: 12,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: COLORS.primary,
        borderRadius: 50,
        padding: 16,
    },
    detailsItem: {
        flex: 1,
        borderRightWidth: 2,
        borderRightColor: COLORS.white,
        paddingHorizontal: 8,
        alignItems: 'center',
    },
    detailsItemTitle: {
        color: COLORS.white,
        fontSize: 14,
        fontWeight: 'bold',
    },
    detailsItemText: {
        color: COLORS.white,
        fontSize: 12,
    },
    biography: {
        marginVertical: 24,
        marginHorizontal: 16,
    },
    biographyTitle: {
        color: COLORS.white,
        fontSize: 18,
    },
    biographyText: {
        color: COLORS.white,
        fontSize: 14,
        lineHeight: 22,
    },
});
