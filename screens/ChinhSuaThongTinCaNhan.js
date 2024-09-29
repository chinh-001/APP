import React from 'react';
import { View, Text, TextInput, StyleSheet, Button, Image } from 'react-native';

const PersonalInfoScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Chỉnh sửa thông tin cá nhân</Text>
      
      {/* Profile Image */}
      <Image
        source={{ uri: 'https://example.com/profile.jpg' }} // Replace with actual image URL
        style={styles.profileImage}
      />
      
      {/* Name and Username */}
      <Text style={styles.name}>Nguyễn Văn A</Text>
      <Text style={styles.username}>@nguyenvana</Text>
      
      {/* Form Fields */}
      <Text style={styles.label}>Họ và tên</Text>
      <TextInput style={styles.input} value="Nguyễn Văn A" editable={false} />
      
      <Text style={styles.label}>Ngày sinh</Text>
      <TextInput style={styles.input} value="01/01/1990" editable={false} />
      
      <Text style={styles.label}>Số điện thoại</Text>
      <TextInput style={styles.input} value="0901234567" editable={false} />
      
      <Text style={styles.label}>Email</Text>
      <TextInput style={styles.input} value="nguyenvana@example.com" editable={false} />
      
      <Text style={styles.label}>Địa chỉ</Text>
      <TextInput style={styles.input} value="123 Đường ABC, Quận 1, TP.HCM" editable={false} />
      
      <Text style={styles.label}>CMND/CCCD</Text>
      <TextInput style={styles.input} placeholder="Nhập số CMND/CCCD" />
      
      <Text style={styles.label}>Địa chỉ</Text>
      <TextInput style={styles.input} placeholder="Nhập địa chỉ" />

      {/* Buttons */}
      <View style={styles.buttonContainer}>
        <Button title="Hủy" onPress={() => {}} color="#C4C4C4" />
        <Button title="Lưu" onPress={() => {}} color="#00CFFF" />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop:"10%",
    flex: 1,
    padding: 10,
    backgroundColor: '#fff',
  },
  header: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: -33,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    alignSelf: 'center',
    marginBottom: 8,
  },
  name: {
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  username: {
    fontSize: 14,
    color: '#888',
    textAlign: 'center',
    marginBottom: 16,
  },
  label: {
    marginVertical: 8,
    fontSize: 14,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 4,
    padding: 8,
    marginBottom: 16,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 16,
  },
});

export default PersonalInfoScreen;
