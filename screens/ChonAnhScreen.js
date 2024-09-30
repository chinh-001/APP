import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Image, FlatList, StyleSheet, SafeAreaView } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { Ionicons } from '@expo/vector-icons';

const CreatePostScreen = () => {
    const [selectedImage, setSelectedImage] = useState(null);
    const [galleryImages, setGalleryImages] = useState([]);

    const pickImageFromLibrary = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsMultipleSelection: true,
            quality: 1,
        });

        if (!result.canceled) {
            if (result.assets && result.assets.length > 0) {
                const newImages = result.assets.map(asset => asset.uri);
                setSelectedImage(newImages[0]);
                setGalleryImages(prevImages => [...prevImages, ...newImages]);
            }
        }
    };

    const handleCameraIconPress = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsMultipleSelection: false,
            quality: 1,
        });

        if (!result.canceled) {
            if (result.assets && result.assets.length > 0) {
                const newImage = result.assets[0].uri;
                setSelectedImage(newImage);
                setGalleryImages(prevImages => [...prevImages, newImage]);
            }
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.topBar}>
                <TouchableOpacity>
                    <Ionicons name="close" size={30} color="black" />
                </TouchableOpacity>
                <Text style={styles.title}>Bài viết mới</Text>
                <TouchableOpacity>
                    <Text style={styles.nextButton}>Tiếp</Text>
                </TouchableOpacity>
            </View>

            <View style={styles.selectedImageContainer}>
                {selectedImage ? (
                    <Image source={{ uri: selectedImage }} style={styles.selectedImage} />
                ) : (
                    <Text style={styles.placeholder}>Chọn một hình ảnh</Text>
                )}
            </View>

            <View style={styles.buttonsContainer}>
                <TouchableOpacity style={styles.button} onPress={pickImageFromLibrary}>
                    <Text style={styles.buttonText}>Gần đây</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button} onPress={handleCameraIconPress}>
                    <Ionicons name="camera-outline" size={24} color="black" />
                </TouchableOpacity>
            </View>

            <FlatList
           
           
                data={galleryImages}
                horizontal
                renderItem={({ item }) => (
                    <TouchableOpacity onPress={() => setSelectedImage(item)}>
                        <Image source={{ uri: item }} style={styles.galleryImage} />
                    </TouchableOpacity>
                )}
                keyExtractor={(item, index) => index.toString()}
                style={styles.galleryContainer}
            />
        </SafeAreaView>
    );
};


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    topBar: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 10,
        backgroundColor: '#f0f0f0',
        height: 60,
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    nextButton: {
        color: 'blue',
        fontSize: 16,
    },
    selectedImageContainer: {
        height: 300,
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: 10,
        borderWidth: 1,
        borderColor: '#ddd',
        backgroundColor: '#f8f8f8',
    },
    selectedImage: {
        width: '100%',
        height: '100%',
        resizeMode: 'contain',
    },
    placeholder: {
        fontSize: 16,
        color: '#999',
    },
    buttonsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
        marginVertical: 10,
    },
    button: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#ddd',
        padding: 10,
        borderRadius: 5,
    },
    buttonText: {
        fontSize: 16,
        marginRight: 5,
    },
    galleryContainer: {
        paddingHorizontal: 10,
    },
    galleryImage: {
        width: 100,
        height: 100,
        marginRight: 10,
        borderRadius: 10,
    },
});

export default CreatePostScreen;
