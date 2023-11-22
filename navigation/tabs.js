import { View, Text, TouchableOpacity, Image, } from 'react-native'
import React from 'react'
import { createBottomTabNavigator, BottomTabBar } from '@react-navigation/bottom-tabs';
import Svg, { Path } from 'react-native-svg';
import { COLORS } from '../constants/themes';
import { AntDesign, MaterialIcons, Entypo } from '@expo/vector-icons';
import { Home, Movies, Series } from '../screens';


const Tab = createBottomTabNavigator();

const TabBarCustomButton = ({ accessibilityState, children, onPress }) => {
    var isSelected = accessibilityState.selected;
    if (isSelected) {
        return (
            <View style={{ flex: 1, alignItems: 'center' }}>
                <View style={{ flexDirection: 'row', position: 'absolute', top: 0 }}>
                    <View style={{ flex: 1, backgroundColor: COLORS.black }}></View>
                    <Svg
                        width={75}
                        height={61}
                        viewBox="0 0 75 61"
                    >

                        <Path
                            d="M75.2 0v61H0V0c4.1 0 7.4 3.1 7.9 7.1C10 21.7 22.5 33 37.7 33c15.2 0 27.7-11.3 29.7-25.9.5-4 3.9-7.1 7.9-7.1h-.1z"
                            fill={COLORS.black}
                        />
                    </Svg>
                    <View style={{ flex: 1, backgroundColor: COLORS.black }}></View>
                </View>

                <TouchableOpacity
                    style={{
                        width: 50,
                        height: 50,
                        borderRadius: 25,
                        top: -22,
                        backgroundColor: COLORS.white,
                        justifyContent: 'center',
                        alignItems: 'center',
                        paddingBottom: 5,
                    }}
                    onPress={onPress}
                >
                    {children}
                </TouchableOpacity>
            </View>
        );
    } else {
        return (
            <TouchableOpacity
                style={{
                    flex: 1,
                    height: 60,
                    backgroundColor: COLORS.black,
                }}
                activeOpacity={1}
                onPress={onPress}
            >
                {children}
            </TouchableOpacity>
        );
    }
}

const Tabs = () => {
    return (
        <Tab.Navigator style={{ backgroundColor: COLORS.black, }}
            screenOptions={{
                headerShown: false,
                showLabel: true,
                tabBarStyle: {
                    borderTopWidth: 0,
                    backgroundColor: COLORS.black,
                    elevation: 0,
                }
            }}
        >
            <Tab.Screen
                name="Home"
                component={Home}
                options={{
                    tabBarIcon: ({ focused }) => (
                        // <Image 
                        //     source={}
                        //     resizeMode="contain"
                        //     style={{
                        //         width:25,
                        //         height:25,
                        //         tintColor: focused ? 'red' : 'gold' 

                        //     }}
                        // />
                        <Entypo name='home' size={24} color={focused ? COLORS.primary : COLORS.white} />
                    ),
                    tabBarButton: (props) => (
                        <TabBarCustomButton
                            {...props}
                        />
                    )
                }}
            />

            <Tab.Screen
                name="Movies"
                component={Movies}
                options={{
                    tabBarIcon: ({ focused }) => (
                        // <Image 
                        //     source={}
                        //     resizeMode="contain"
                        //     style={{
                        //         width:25,
                        //         height:25,
                        //         tintColor: focused ? 'red' : 'gold' 

                        //     }}
                        // />
                        <AntDesign name='videocamera' size={24} color={focused ? COLORS.primary : COLORS.white} />
                    ),
                    tabBarButton: (props) => (
                        <TabBarCustomButton
                            {...props}
                        />
                    )
                }}
            />

            <Tab.Screen
                name="Series"
                component={Series}
                options={{
                    tabBarIcon: ({ focused }) => (
                        // <Image 
                        //     source={}
                        //     resizeMode="contain"
                        //     style={{
                        //         width:25,
                        //         height:25,
                        //         tintColor: focused ? 'red' : 'gold' 

                        //     }}
                        // />
                        <MaterialIcons name='local-movies' size={24} color={focused ? COLORS.primary : COLORS.white} />
                    ),
                    tabBarButton: (props) => (
                        <TabBarCustomButton
                            {...props}
                        />
                    )
                }}
            />
        </Tab.Navigator>
    )
}

export default Tabs;