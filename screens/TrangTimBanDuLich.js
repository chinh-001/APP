import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, ScrollView, Dimensions } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

const { width, height } = Dimensions.get('window');

const TopTab = createMaterialTopTabNavigator();

// Placeholder components for each tab
const FollowScreen = () => <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}><Text>Follow Screen</Text></View>;
const TrangChuScreen = () => <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}><Text>Trang Chủ Screen</Text></View>;
const TimKiemScreen = () => <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}><Text>Tìm Kiếm Screen</Text></View>;

const ProfileScreen = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const images = [
    'https://i.pinimg.com/564x/35/32/a0/3532a09f083ef3e512b3f5c412a369ea.jpg',
    'https://i.pinimg.com/564x/cb/66/54/cb6654c65688ad61a40c132a471b2b2a.jpg',
    'https://i.pinimg.com/564x/35/fa/22/35fa22795204c0748f7e099adb7b6e64.jpg',
  ];

  const handleScroll = (event) => {
    const slideIndex = Math.round(event.nativeEvent.contentOffset.x / width);
    setCurrentIndex(slideIndex);
  };

  return (
    <View style={styles.container}>
      {/* Horizontal Scrollable Images */}
      <ScrollView
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={handleScroll}
        scrollEventThrottle={16}
      >
        {images.map((image, index) => (
          <Image key={index} source={{ uri: image }} style={styles.profileImage} />
        ))}
      </ScrollView>

      {/* Top Navigation Bar (Inside Image) */}
      <View style={styles.topNav}>
        <TopTab.Navigator
          screenOptions={{
            tabBarStyle: { backgroundColor: 'transparent' },
            tabBarLabelStyle: styles.tabText,
            tabBarIndicatorStyle: { backgroundColor: '#fff' },
          }}
        >
          <TopTab.Screen name="Follow" component={FollowScreen} />
          <TopTab.Screen name="TrangChu" component={TrangChuScreen} options={{ tabBarLabel: 'Trang chủ' }} />
          <TopTab.Screen name="TimKiem" component={TimKiemScreen} options={{ tabBarLabel: 'Tìm kiếm' }} />
        </TopTab.Navigator>
      </View>

      {/* Text Information on Image */}
      <View style={styles.textOverlay}>
        <Text style={styles.userName}>Bo, 22</Text>
        <View style={styles.infoRow}>
          <Icon name="map-marker" size={20} color="#fff" />
          <Text style={styles.infoText}>Đang ở Buôn Ma Thuột</Text>
        </View>

        <View style={styles.infoRow}>
          <Icon name="male" size={20} color="#fff" />
          <Text style={styles.infoText}>190 cm</Text>
        </View>

        <View style={styles.infoRow}>
          <Icon name="glass" size={20} color="#fff" />
          <Text style={styles.infoText}>Không bao giờ</Text>
        </View>

        <View style={styles.infoRow}>
          <Icon name="plane" size={20} color="#fff" />
          <Text style={styles.infoText}>Muốn tìm 2 người bạn nam đi du lịch tại Động Phong Nha</Text>
        </View>

        <View style={styles.infoRow}>
          <Icon name="clock-o" size={20} color="#fff" />
          <Text style={styles.infoText}>Thời gian : 2 ngày 1 đêm</Text>
        </View>
      </View>

      {/* Action Buttons */}
      <View style={styles.actionButtons}>
        <TouchableOpacity style={styles.actionButtonx}>
          <Icon name="times" size={25} color="#fff" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionButton}>
          <Icon name="heart" size={25} color="#fff" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionButton}>
          <Icon name="heart" size={25} color="#fff" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  profileImage: {
    width,
    resizeMode: 'cover',
  },
  topNav: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 50,
  },
  tabText: {
    fontSize: 16,
    color: '#fff',
  },
  textOverlay: {
    position: 'absolute',
    bottom: '15%',
    left: 20,
    right: 20,
    alignItems: 'flex-start',
  },
  userName: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#fff',
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 5,
  },
  infoText: {
    marginLeft: 10,
    fontSize: 16,
    color: '#fff',
  },
  actionButtons: {
    position: 'absolute',
    bottom: '3%',
    left: 20,
    right: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  actionButton: {
    backgroundColor: '#00CC33',
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  actionButtonx: {
    backgroundColor: '#CC0000',
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default ProfileScreen;
