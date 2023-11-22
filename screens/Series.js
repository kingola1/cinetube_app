import { View, Text, SafeAreaView, StyleSheet, Platform, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import { getSeries } from '../constants/api';
import { AntDesign } from '@expo/vector-icons';
import { COLORS } from '../constants/themes';
import { styles } from '../constants/styles';

const ios = Platform.OS === 'ios';

export default function Series() {

  return (
    <SafeAreaView style={style.container}>
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
  )
}

const style = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  safeAreaView: {
    marginBottom: ios ? -2 : 3,
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