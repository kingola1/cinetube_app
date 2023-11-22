import { View, Text, TouchableOpacity, ScrollView, Platform, SafeAreaView, StyleSheet } from 'react-native'
import React, { useEffect, useState } from 'react'
import { AntDesign } from '@expo/vector-icons';
import MovieList from '../Components/MovieList';
import { fetchTopRatedMovies, fetchTrendingMovies, fetchUpcomingMovies } from '../constants/api';
import { useNavigation } from '@react-navigation/native';
import Loading from '../Components/Loading';
import { styles } from '../constants/styles';
import { getMovies } from '../constants/api';
import { COLORS } from '../constants/themes';
// import TrendingMovies from '../Components/TrendingList';

const ios = Platform.OS === 'ios';

export default function Movies() {

  const [trending, setTrending] = useState([]);
  const [upcoming, setUpcoming] = useState([]);
  const [topRated, setTopRated] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation();

  useEffect(() => {
    getTrendingMovies();
    getUpcomingMovies();
    getTopRatedMovies();
  }, []);

  const getTrendingMovies = async () => {
    const data = await getMovies();
    // console.log(data)
    console.log('got trending', data?.length)
    if (data) setTrending(data);
    setLoading(false)
  }
  const getUpcomingMovies = async () => {
    const data = await fetchUpcomingMovies();
    console.log('got upcoming', data.results.length)
    if (data && data.results) setUpcoming(data.results);
  }
  const getTopRatedMovies = async () => {
    const data = await fetchTopRatedMovies();
    console.log('got top rated', data.results.length)
    if (data && data.results) setTopRated(data.results);
  }



  return (
    <View style={style.container}>
      {/* Search bar */}
      <SafeAreaView style={style.safeAreaView}>
        {/* <StatusBar style="light" /> */}
        <View style={style.header}>
          <AntDesign name="menufold" size={18} color={COLORS.white} />
          <Text style={style.headerText}>
            <Text style={styles.text}>C</Text>ineTube
          </Text>
          <TouchableOpacity onPress={() => navigation.navigate('Search')}>
            <AntDesign name="search1" style={style.searchIcon} />
          </TouchableOpacity>
        </View>
      </SafeAreaView>

      {loading ? (
        <Loading />
      ) : (
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={style.scrollView}
        >
          {/* Trending Movies Carousel */}
          {trending.length > 0 && <MovieList data={trending} />}

          {/* Upcoming movies row */}
          {upcoming.length > 0 && <MovieList title="Upcoming" data={upcoming} />}

          {/* Top rated movies row */}
          {topRated.length > 0 && <MovieList title="Top Rated" data={topRated} />}
        </ScrollView>
      )}
    </View>
  );
}

const style = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000', // Replace with your background color
  },
  safeAreaView: {
    marginBottom: ios ? -2 : 3, // Adjust margin as needed
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginHorizontal: 10,
    marginVertical: 10,
  },
  headerText: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
  },
  searchIcon: {
    fontSize: 24,
    color: COLORS.white,
  },
  scrollView: {
    paddingBottom: 10,
  },
});