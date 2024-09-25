import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, ScrollView, Dimensions } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const { width, height } = Dimensions.get('window'); // Lấy kích thước màn hình

const ProfileScreen = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedTab, setSelectedTab] = useState('Trang chủ'); // Tab mặc định

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
        <TouchableOpacity onPress={() => setSelectedTab('Follow')}>
          <Text style={[styles.tabText, selectedTab === 'Follow' && styles.activeTab]}>Follow</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setSelectedTab('Trang chủ')}>
          <Text style={[styles.tabText, selectedTab === 'Trang chủ' && styles.activeTab]}>Trang chủ</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setSelectedTab('Tìm kiếm')}>
          <Text style={[styles.tabText, selectedTab === 'Tìm kiếm' && styles.activeTab]}>Tìm kiếm</Text>
        </TouchableOpacity>
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
    // height: height * 0.75, // Chiều cao ảnh bằng 75% chiều cao màn hình
    resizeMode: 'cover',
  },
  topNav: {
    position: 'absolute',
    top: '5%', // Đặt thanh điều hướng ở 5% từ đầu màn hình
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 10,
  },
  tabText: {
    fontSize: 18,
    color: '#fff',
  },
  activeTab: {
    color: '#fff',
    fontWeight: 'bold',
    borderBottomWidth: 2,
    borderBottomColor: '#fff',
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
    bottom: '3%', // Đặt các nút ở dưới cùng màn hình
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
