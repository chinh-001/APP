import React from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, StyleSheet, FlatList, KeyboardAvoidingView, Platform } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

const messages = [
  {
    id: '1',
    text: 'Chào mọi người, hôm nay có ai rảnh không?',
    sender: 'me',
    avatar: 'https://scontent.fbmv1-1.fna.fbcdn.net/v/t39.30808-6/456249686_122160015740153873_4141588938124841296_n.jpg?_nc_cat=109&ccb=1-7&_nc_sid=6ee11a&_nc_ohc=tODb5MS_5GMQ7kNvgENnHS6&_nc_ht=scontent.fbmv1-1.fna&oh=00_AYCU6eB6CO8GD8HV-qZrSM62Kiq_KnPZYXGo-lz1r2_v3w&oe=66F6E897',
  },
  {
    id: '2',
    text: 'Mình rảnh, có kế hoạch gì không?',
    sender: 'other',
    avatar: 'https://i.pinimg.com/236x/a0/50/fb/a050fb9aec967a133453a7683f1ee562.jpg',
  },
  {
    id: '3',
    text: '😀😀😀😀😀',
    sender: 'me',
    avatar: 'https://scontent.fbmv1-1.fna.fbcdn.net/v/t39.30808-6/456249686_122160015740153873_4141588938124841296_n.jpg?_nc_cat=109&ccb=1-7&_nc_sid=6ee11a&_nc_ohc=tODb5MS_5GMQ7kNvgENnHS6&_nc_ht=scontent.fbmv1-1.fna&oh=00_AYCU6eB6CO8GD8HV-qZrSM62Kiq_KnPZYXGo-lz1r2_v3w&oe=66F6E897',
  },
  {
    id: '4',
    text: '💚💚💚💚',
    sender: 'me',
    avatar: 'https://scontent.fbmv1-1.fna.fbcdn.net/v/t39.30808-6/456249686_122160015740153873_4141588938124841296_n.jpg?_nc_cat=109&ccb=1-7&_nc_sid=6ee11a&_nc_ohc=tODb5MS_5GMQ7kNvgENnHS6&_nc_ht=scontent.fbmv1-1.fna&oh=00_AYCU6eB6CO8GD8HV-qZrSM62Kiq_KnPZYXGo-lz1r2_v3w&oe=66F6E897',
  },
  {
    id: '5',
    text: 'Đi du lịch không?👄',
    sender: 'me',
    avatar: 'https://scontent.fbmv1-1.fna.fbcdn.net/v/t39.30808-6/456249686_122160015740153873_4141588938124841296_n.jpg?_nc_cat=109&ccb=1-7&_nc_sid=6ee11a&_nc_ohc=tODb5MS_5GMQ7kNvgENnHS6&_nc_ht=scontent.fbmv1-1.fna&oh=00_AYCU6eB6CO8GD8HV-qZrSM62Kiq_KnPZYXGo-lz1r2_v3w&oe=66F6E897',
  },
];

const ChatScreen = ({ navigation }) => {
  const renderMessage = ({ item }) => {
    const isMe = item.sender === 'me';
    return (
      <View style={[styles.messageContainer, isMe ? styles.myMessage : styles.otherMessage]}>
        {!isMe && <Image source={{ uri: item.avatar }} style={styles.avatar} />}
        <View style={[styles.bubble, isMe ? styles.myBubble : styles.otherBubble]}>
          <Text style={isMe ? styles.myText : styles.otherText}>{item.text}</Text>
        </View>
        {isMe && <Image source={{ uri: item.avatar }} style={styles.avatar} />}
      </View>
    );
  };

  return (
    <KeyboardAvoidingView
    style={styles.container}
    behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    keyboardVerticalOffset={60} // Điều chỉnh giá trị này để tránh đẩy quá cao
>
    {/* Header Section */}
    <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
            <Image
                source={{ uri: 'https://img.icons8.com/ios-filled/50/ffffff/back.png' }}
                style={styles.backIcon}
            />
        </TouchableOpacity>
        <Text style={styles.headerText}>Hà An Duyệt</Text>
    </View>

    {/* Message List */}
    
    <FlatList
        data={messages}
        renderItem={renderMessage}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.messageList}
    />

    {/* Input Section */}
    <View style={styles.inputContainer}>
       
    
            <TouchableOpacity style={styles.socialButton}>
            <Image
                source={require('../assets/sendimage.png')} // Apple logo
                style={styles.logo}
            />
        </TouchableOpacity><TextInput placeholder="Nhập tin nhắn" style={styles.input} />
        <TouchableOpacity>
            <Text style={styles.sendButton}>Gửi</Text>
        </TouchableOpacity>
    </View>
</KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop:"11%",
    flex: 1,
    backgroundColor: '#F9F9F9',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#4C9AFF',
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E5EA',
  },
  backButton: {
    marginRight: 10,
  },
  backIcon: {
    width: 24,
    height: 24,
  },
  headerText: {
    fontSize: 18,
    color: '#FFF',
    fontWeight: 'bold',
  },
  messageList: {
    padding: 10,
    flexGrow: 1,
  },
  messageContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 5,
  },
  myMessage: {
    justifyContent: 'flex-end',
  },
  otherMessage: {
    justifyContent: 'flex-start',
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginHorizontal: 10,
  },
  bubble: {
    maxWidth: '70%',
    padding: 10,
    borderRadius: 15,
  },
  myBubble: {
    backgroundColor: '#4C9AFF',
    borderBottomRightRadius: 0,
  },
  otherBubble: {
    backgroundColor: '#E5E5EA',
    borderBottomLeftRadius: 0,
  },
  myText: {
    color: '#FFF',
  },
  otherText: {
    color: '#000',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderTopWidth: 1,
    borderColor: '#E5E5EA',
    padding: 5,
    backgroundColor: '#FFF',
    marginBottom: Platform.OS === 'ios' ? 0 : 10, // Giảm khoảng cách dưới cùng trên Android
  },
  input: {
    flex: 1,
    marginLeft:"10%",
    paddingVertical: 19,
    paddingHorizontal: 18,
    borderRadius: 20,
    backgroundColor: '#F0F0F0',
  },
  sendButton: {
    color: '#4C9AFF',
    fontWeight: 'bold',
    marginLeft: 10,
  },
  logo: {
    width: 20, // Kích thước icon nhỏ lại
    height: 20,
  },
});

export default ChatScreen;
