import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, ScrollView, Dimensions, FlatList } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const { width, height } = Dimensions.get('window');

const users = [
  {
    id: 1,
    name: 'Bo, 22',
    tagline: 'Bún đậu nước mắm',
    location: 'Đang ở Buôn Ma Thuột',
    height: '190 cm',
    drinking: 'Không bao giờ',
    travel: 'Muốn tìm 2 bạn nam đi Chùa Hương',
    duration: 'Thời gian : 2 ngày 1 đêm',
    images: [
      'https://i.pinimg.com/564x/35/32/a0/3532a09f083ef3e512b3f5c412a369ea.jpg',
      'https://i.pinimg.com/564x/cb/66/54/cb6654c65688ad61a40c132a471b2b2a.jpg',
      'https://i.pinimg.com/564x/35/fa/22/35fa22795204c0748f7e099adb7b6e64.jpg',
    ],
  },
  {
    id: 2,
    name: 'An, 24',
    tagline: 'Cà phê và sách',
    location: 'Đang ở Hà Nội',
    height: '175 cm',
    drinking: 'Thỉnh thoảng',
    travel: 'Muốn tìm 1 bạn đi Hội An',
    duration: 'Thời gian : 3 ngày 2 đêm',
    images: [
      'https://i.pinimg.com/originals/87/bd/b6/87bdb674394ad69ad541b8877a07765a.jpg',
      'https://i.pinimg.com/736x/b7/46/cb/b746cb4d46585e75affbd8458b86f2ac.jpg',
      'https://i.pinimg.com/736x/7e/08/c4/7e08c4fd1cec21f88cdfaef82dff87fa.jpg',
    ],
  },
];

const ProfileScreen = () => {
  const handleScroll = (event) => {
    // Hàm dùng để xử lý sự kiện scroll, bạn có thể bổ sung thêm logic nếu cần.
  };

  const renderItem = ({ item: user }) => (
    <View style={styles.userContainer}>
      {/* Dùng FlatList để render hình ảnh */}
      <ScrollView
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={handleScroll}
        scrollEventThrottle={16}
      >
        {user.images.map((image, index) => (
          <Image key={index} source={{ uri: image }} style={styles.profileImage} />
        ))}
      </ScrollView>

      {/* Hiển thị thông tin người dùng */}
      <View style={styles.textOverlay}>
        <Text style={styles.userName}>{user.name}</Text>
        <Text style={styles.tagline}>{user.tagline}</Text>

        <View style={styles.infoRow}>
          <Icon name="map-marker" size={20} color="#fff" />
          <Text style={styles.infoText}>{user.location}</Text>
        </View>

        <View style={styles.infoRow}>
          <Icon name="male" size={20} color="#fff" />
          <Text style={styles.infoText}>{user.height}</Text>
        </View>

        <View style={styles.infoRow}>
          <Icon name="glass" size={20} color="#fff" />
          <Text style={styles.infoText}>{user.drinking}</Text>
        </View>

        <View style={styles.infoRow}>
          <Icon name="plane" size={20} color="#fff" />
          <Text style={styles.infoText}>{user.travel}</Text>
        </View>

        <View style={styles.infoRow}>
          <Icon name="clock-o" size={20} color="#fff" />
          <Text style={styles.infoText}>{user.duration}</Text>
        </View>
      </View>

      {/* Nút hành động */}
      <View style={styles.actionButtons}>
        <TouchableOpacity style={styles.actionButtonx}>
          <Icon name="times" size={25} color="#fff" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionButton}>
          <Icon name="heart" size={25} color="#fff" />
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <FlatList
      data={users}
      renderItem={renderItem}
      keyExtractor={(item) => item.id.toString()}
      snapToInterval={height}
      decelerationRate="fast"
      showsVerticalScrollIndicator={false}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  profileImage: {
    width,
    height: height * 1,
    resizeMode: 'cover',
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
  tagline: {
    fontSize: 18,
    color: '#fff',
    marginVertical: 10,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 5,
  },
  infoText: {
    marginLeft: 10,
    fontSize: 18,
    fontWeight: '600',
    color: '#fff',
  },
  actionButtons: {
    position: 'absolute',
    bottom: 30,
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
