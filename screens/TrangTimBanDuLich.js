import React, { useState, useRef } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, ScrollView, Dimensions,FlatList } from 'react-native';
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
  const renderItem = ({ item: user }) => (
    <View style={styles.userContainer}>
      <FlatList
        data={user.images}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item, index) => `${user.id}-${index}`}
        renderItem={({ item: image }) => (
          <Image source={{ uri: image }} style={styles.profileImage} />
        )}
      />

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

      <View style={styles.actionButtons}>
        <TouchableOpacity style={styles.actionButtonx}>
          <Icon name="times" size={30} color="#fff" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionButton}>
          <Icon name="heart" size={30} color="#fff" />
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
  userNameContainer: {
    borderWidth: 5, // Border width
    borderColor: '#009900', // Green border color
    borderRadius: 15, // Rounded corners
    padding: 10, // Padding inside the border
    marginVertical: 10, // Space between elements
    alignItems: 'center', // Center the text
  },
  userName: {
    borderRadius: 15, 
    borderWidth: 3,
    borderColor: '#BBBBBB',
    fontSize: 32,
    fontWeight: 'bold',
    color: '#CC0033',
  },
  profileImage: {
    width,
    height: height * 1,
    resizeMode: 'cover',
  },
  textOverlay: {
    position: 'absolute',
    top: '45%',
    left: 20,
    right: 20,
    alignItems: 'flex-start',
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
    borderRadius: 15, 
    borderWidth: 3,
    borderColor: '#696969',
    fontSize: 18, // Increased from 16 to 18
    fontWeight: '600', // Added medium font weight
    color: '#fff',
    padding: 5,
    textShadowColor: 'rgba(5, 1, 5, 5)', // Added text shadow
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 10,
  },
  actionButtons: {
    marginBottom:"9%",
    
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
