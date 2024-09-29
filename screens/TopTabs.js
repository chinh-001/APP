// navigations/TopTabs.js

import React from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { Text } from 'react-native';

// Import các màn hình
import TrangTimBanDuLich from '../screens/TrangTimBanDuLich';
import FollowScreen from '../screens/TimKiem';
import ForYouScreen from '../screens/XacMinhOtpScreen';

const Tab = createMaterialTopTabNavigator();

const TopTabs = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarLabel: ({ focused }) => {
          let labelText;

          if (route.name === 'Home') {
            labelText = 'Trang chủ';
          } else if (route.name === 'Follow') {
            labelText = 'Follow';
          } else if (route.name === 'ForYou') {
            labelText = 'For You';
          }

          return (
            <Text style={{ color: focused ? 'tomato' : 'white', fontSize: 16 }}>
              {labelText}
            </Text>
          );
        },
        tabBarIndicatorStyle: {
          backgroundColor: 'tomato',
          height: 3,
        },
        tabBarStyle: {
          backgroundColor: 'transparent', // Làm trong suốt thanh tab
          position: 'absolute',           // Đặt tab nằm trên nội dung
          zIndex: 1,                      // Đảm bảo tab nằm trên cùng
        },
      })}
    >
      <Tab.Screen name="Home" component={TrangTimBanDuLich} />
      <Tab.Screen name="Follow" component={FollowScreen} />
      <Tab.Screen name="ForYou" component={ForYouScreen} />
    </Tab.Navigator>
  );
};

export default TopTabs;
