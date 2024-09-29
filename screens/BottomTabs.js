// navigations/BottomTabs.js

import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Image } from 'react-native';

// Import các màn hình cần dùng cho bottom tab
import TrangChuScreen from '../screens/TrangChuScreen';
import TimKiem from '../screens/TimKiem';
import DangBaiScreen from '../screens/DangBaiScreen';
import ThongBao from '../screens/ThongBao';
import NhanTin from '../screens/NhanTin';
import TrangTimBanDuLich from '../screens/TrangTimBanDuLich';
import TopTabs from '../screens/TopTabs';
// Tạo Bottom Tab Navigator
const Tab = createBottomTabNavigator();

const BottomTabs = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ size }) => {
          let iconPath;

          if (route.name === 'Home') {
            iconPath = require('../assets/home.png');
          } 
          else if (route.name === 'Search') {
            iconPath = require('../assets/search.png');
          } 
          else if (route.name === 'Add') {
            iconPath = require('../assets/add.png');
          } 
          else if (route.name === 'Notifications') {
            iconPath = require('../assets/notifications.png');
          }
           else if (route.name === 'Profile') {
            iconPath = require('../assets/profile.png');
          }

          return <Image source={iconPath} style={{ width: size, height: size }} />;
        },
        tabBarActiveTintColor: 'tomato',
        tabBarInactiveTintColor: 'gray',
      })}
    >
      <Tab.Screen name="Home" component={TopTabs} options={{ headerShown: false }} />
      <Tab.Screen name="Search" component={TimKiem} />
      <Tab.Screen name="Add" component={DangBaiScreen} />
      <Tab.Screen name="Notifications" component={ThongBao} options={{ headerShown: false }} />
      <Tab.Screen name="Profile" component={NhanTin} options={{ headerShown: false }} />
    </Tab.Navigator>
  );
};

export default BottomTabs;
