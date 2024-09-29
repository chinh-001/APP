    // import React, { useState } from 'react';
    import React, { useState, useRef } from 'react';
    import { View, Text, TextInput, Image, TouchableOpacity, StyleSheet, Dimensions, KeyboardAvoidingView, Platform, FlatList, Alert, ScrollView } from 'react-native';
    import { SafeAreaView } from 'react-native-safe-area-context';
    import { useNavigation } from '@react-navigation/native'; // Import useNavigation
    import * as ImagePicker from 'expo-image-picker';
    import DateTimePicker from '@react-native-community/datetimepicker';




    const DangBaiScreen = () => {
        const [title, setTitle] = useState('');
        const [description, setDescription] = useState('');

        //code liên quan đến ảnh
        const [currentIndex, setCurrentIndex] = useState(0);
        const scrollViewRef = useRef(null);
        const { width } = Dimensions.get('window');

        //cuộn ảnh
        const handleScroll = (event) => {
            const slideSize = event.nativeEvent.layoutMeasurement.width;
            const index = event.nativeEvent.contentOffset.x / slideSize;
            setCurrentIndex(Math.round(index)); // Cập nhật chỉ số ảnh hiện tại trong slider
        };


        // code khai báo liên quan đến ngày tháng
        const [startDate, setStartDate] = useState("Ngày bắt đầu");
        const [endDate, setEndDate] = useState("Ngày kết thúc");
        const [showStartDatePicker, setShowStartDatePicker] = useState(false);
        const [showEndDatePicker, setShowEndDatePicker] = useState(false);
        // code khai báo liên quan đến ảnh
        const [selectedImages, setSelectedImages] = useState([]);
        // code khai báo liên quan đến navigation bar
        const navigation = useNavigation(); // Access navigation prop





        // code logic
        const handleBack = () => {
            navigation.goBack();
        };

        // Hàm mở thư viện ảnh
        const pickImage = async () => {
            const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

            if (permissionResult.granted === false) {
                alert('Bạn cần cấp quyền truy cập thư viện ảnh!');
                return;
            }

            if (selectedImages.length >= 6) {
                alert('Bạn chỉ được chọn tối đa 6 ảnh.');
                return;
            }

            const result = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.Images,
                allowsMultipleSelection: true, // Thêm tùy chọn này nếu được hỗ trợ
                quality: 1,
            });

            if (!result.canceled) {
                // Kiểm tra số lượng ảnh đã chọn và giới hạn số lượng
                const newImages = result.assets.map(asset => asset.uri);
                setSelectedImages(prevImages => [
                    ...prevImages,
                    ...newImages.slice(0, 6 - prevImages.length)
                ]);
            }
        };

         // Hiển thị ảnh mặc định và text khi không có ảnh
        const handleRemoveImage = (index) => {
            // Xóa ảnh tại index đã chọn
            const updatedImages = [...selectedImages];
            updatedImages.splice(index, 1); // Xóa ảnh tại vị trí index
            setSelectedImages(updatedImages);
        
            // Kiểm tra nếu không còn ảnh nào, đặt lại trạng thái
            if (updatedImages.length === 0) {
                // Nếu không còn ảnh, hiển thị ảnh mặc định và text
                setSelectedImages([]); // hoặc cập nhật lại state theo logic của bạn
            }
        };
        

        //Thêm hàm xử lý khi bấm vào ảnh:
        const handleImagePress = (index) => {
            Alert.alert(
                'Xác nhận',
                'Bạn có muốn xóa ảnh này không?',
                [
                    {
                        text: 'Hủy',
                        style: 'cancel',
                    },
                    {
                        text: 'Xóa',
                        onPress: () => {
                            // Xóa ảnh khỏi danh sách selectedImages
                            const updatedImages = [...selectedImages];
                            updatedImages.splice(index, 1); // Xóa ảnh theo chỉ số index
                            setSelectedImages(updatedImages);
                        },
                        style: 'destructive',
                    },
                ],
                { cancelable: true }
            );
        };

        // Hàm để xóa tất cả ảnh đã chọn
        const clearAllImages = () => {
            setSelectedImages([]); // Đặt lại mảng về rỗng
        };

        const renderSelectedImages = () => {
            return selectedImages.map((imageUri, index) => (
                <TouchableOpacity key={index} onPress={() => handleImagePress(index)}>
                    <Image source={{ uri: imageUri }} style={styles.selectedImage} />
                </TouchableOpacity>
            ));
        };


        // Hàm về ngày tháng
        const onStartDateChange = (event, selectedDate) => {
            const currentDate = selectedDate || new Date();
            setShowStartDatePicker(false);
            setStartDate(currentDate.toLocaleDateString());  // Cập nhật ngày bắt đầu
        };

        const onEndDateChange = (event, selectedDate) => {
            const currentDate = selectedDate || new Date();
            setShowEndDatePicker(false);
            setEndDate(currentDate.toLocaleDateString());  // Cập nhật ngày kết thúc
        };

        return (
            <SafeAreaView style={styles.container}>
                <KeyboardAvoidingView
                    style={{ flex: 1 }}
                    behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                    keyboardVerticalOffset={Platform.OS === 'ios' ? 64 : 0} // Điều chỉnh offset phù hợp
                >
                    <FlatList
                        data={[{ key: '1' }]} // Sử dụng một data array giả
                        renderItem={() => (
                            <View>

                                <View>
                                    <TouchableOpacity style={styles.backButton} onPress={handleBack}>
                                        <Image
                                            source={require('../assets/back.png')}
                                            style={styles.backIcon}
                                        />
                                    </TouchableOpacity>

                                    <View style={styles.header}>
                                        <Text style={styles.headerText}>Tạo bài đăng  </Text>
                                    </View>
                                </View>




                                <Text style={{ marginBottom: '2%', fontWeight: 'bold', fontSize: 17 }}>Chọn ảnh</Text>









                                <View style={styles.container}>
                                    <View style={styles.progressContainer}>
                                        {selectedImages.map((_, index) => (
                                            <View
                                                key={index}
                                                style={[
                                                    styles.progressBar,
                                                    {
                                                        width: `${100 / selectedImages.length}%`, // Tính % cho progress bar theo số lượng ảnh
                                                        backgroundColor: index === currentIndex ? '#000' : '#e0e0e0', // Màu hiển thị thanh tiến trình
                                                    }
                                                ]}
                                            />
                                        ))}
                                    </View>
    



                                    
                                    {/* phiên bản 1 */}
                                    {/* <ScrollView
                                        ref={scrollViewRef} // Scroll tự động khi nhấn nút
                                        horizontal
                                        pagingEnabled
                                        showsHorizontalScrollIndicator={false}
                                        onScroll={handleScroll} // Lắng nghe sự kiện scroll để cập nhật currentIndex
                                        scrollEventThrottle={16} // Tăng độ nhạy cho sự kiện scroll
                                        style={{ width: 300, height: 300, borderRadius: 10, borderWidth: 0, alignSelf: 'center' }}
                                        contentContainerStyle={styles.scrollViewContent}
                                    >
                                        {selectedImages.map((imageUri, index) => (
                                            <TouchableOpacity key={index} onPress={() => handleImagePress(index)}style={styles.imageContainer} >
                                                <Image
                                                    source={{ uri: imageUri }}
                                                    style={styles.image} // Chiều rộng và chiều cao cho từng hình ảnh
                                                    resizeMode="contain" // Resize image cho vừa với khung
                                                />
                                            </TouchableOpacity>
                                        ))}
                                    </ScrollView> */}

    {/* phiên bản 2 */}
{/* <ScrollView
    ref={scrollViewRef}
    horizontal
    pagingEnabled
    showsHorizontalScrollIndicator={false}
    onScroll={handleScroll}
    scrollEventThrottle={16}
    style={{ width: 300, height: 300, borderRadius: 10, borderWidth: 0, alignSelf: 'center' }}
    contentContainerStyle={styles.scrollViewContent}
>
    {selectedImages.length === 0 ? (
        // Khi không có ảnh được chọn
        <View style={styles.noImageContainer}>
            <Image
                source={require('../assets/search.png')} // Hình ảnh mặc định từ assets
                style={styles.noImage}
                resizeMode="contain"
            />
            <Text style={styles.noImageText}>Bạn chưa có ảnh?</Text>
        </View>
    ) : (
        // Khi có ảnh được chọn
        selectedImages.map((imageUri, index) => (
            <TouchableOpacity key={index} onPress={() => handleImagePress(index)} style={styles.imageContainer}>
                <Image
                    source={{ uri: imageUri }}
                    style={styles.image}
                    resizeMode="contain"
                />
            </TouchableOpacity>
        ))
    )}
</ScrollView> */}


<ScrollView
    ref={scrollViewRef}
    horizontal
    pagingEnabled
    showsHorizontalScrollIndicator={false}
    onScroll={handleScroll}
    scrollEventThrottle={16}
    style={{ width: 300, height: 300, borderRadius: 10, borderWidth: 0, alignSelf: 'center' }}
    contentContainerStyle={styles.scrollViewContent}
>
    {selectedImages.length === 0 ? (
        // Hiển thị ảnh mặc định và text khi không có ảnh
        <View style={styles.noImageContainer}>
            <Image
                source={require('../assets/image.png')} // Ảnh placeholder từ thư mục assets
                style={styles.noImage}
                resizeMode="contain"
            />
            <Text style={styles.noImageText}>Bạn chưa có ảnh?</Text>
        </View>
    ) : (
        // Hiển thị ảnh khi đã chọn
        selectedImages.map((imageUri, index) => (
            <TouchableOpacity key={index} onPress={() => handleRemoveImage(index)} style={styles.imageContainer}>
                <Image
                    source={{ uri: imageUri }}
                    style={styles.image}
                    resizeMode="contain"
                />
            </TouchableOpacity>
        ))
    )}
</ScrollView>




                                    

                                </View>







                                <View style={styles.buttonContainer}>
                                    <TouchableOpacity style={styles.btnThem} onPress={pickImage}>
                                        <Text style={styles.btnThemText}>Thêm</Text>
                                    </TouchableOpacity>

                                    <TouchableOpacity style={styles.btnxoa} onPress={clearAllImages}>
                                        <Text style={styles.btnThemText}>Xóa hết</Text>
                                    </TouchableOpacity>
                                </View>




                                <View style={styles.inputContainer}>
                                    <Text style={styles.titleLabel}>Tiêu đề </Text>
                                    <TextInput
                                        style={styles.input}
                                        placeholder="Tiêu đề của bạn"
                                        value={title}
                                        onChangeText={setTitle}
                                        multiline={true}
                                    />
                                </View>

                                <View style={styles.inputContainer}>
                                    <Text style={styles.label}>Chi tiết  </Text>
                                    <TouchableOpacity style={styles.button} onPress={() => setShowStartDatePicker(true)}>
                                        <Image
                                            source={{ uri: "https://cdn-icons-png.flaticon.com/128/2838/2838779.png" }}
                                            style={styles.image2}
                                        />
                                        <Text style={styles.buttonText}>{startDate}</Text>
                                        {showStartDatePicker && (
                                            <DateTimePicker
                                                value={new Date()}
                                                mode="date"
                                                display={Platform.OS === 'ios' ? 'calendar' : 'default'}
                                                onChange={onStartDateChange}
                                                style={{ right: '-250%' }}
                                            />
                                        )}
                                    </TouchableOpacity>

                                    <TouchableOpacity style={styles.button} onPress={() => setShowEndDatePicker(true)}>
                                        <Image
                                            source={{ uri: "https://cdn-icons-png.flaticon.com/128/2838/2838779.png" }}
                                            style={styles.image2}
                                        />
                                        <Text style={styles.buttonText}>{endDate}</Text>
                                        {showEndDatePicker && (
                                            <DateTimePicker
                                                value={new Date()}
                                                mode="date"
                                                display={Platform.OS === 'ios' ? 'calendar' : 'default'}
                                                onChange={onEndDateChange}
                                                style={{ right: '-250%' }}
                                            />
                                        )}
                                    </TouchableOpacity>

                                    <TouchableOpacity style={styles.button}>
                                        <Image
                                            source={{ uri: "https://cdn-icons-png.flaticon.com/128/819/819865.png" }}
                                            style={styles.image2}
                                        />
                                        <Text style={styles.buttonText}>Điểm đến</Text>
                                    </TouchableOpacity>
                                </View>

                                <View style={styles.textAreaContainer}>
                                    <Text style={styles.label}>Mô tả  </Text>
                                    <TextInput
                                        style={styles.textArea}
                                        placeholder="Mô tả kế hoạch du lịch của bạn"
                                        multiline={true} // Cho phép nhập nhiều dòng
                                    numberOfLines={1} // Giới hạn số dòng hiển thị
                                    blurOnSubmit={true} // Giới hạn số dòng hiển thị

                                    />
                                </View>

                                <View style={styles.budgetContainer}>


                                    <TouchableOpacity style={styles.submitButton}>
                                        <Text style={styles.submitButtonText}>Tạo bài đăng</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        )}
                        keyExtractor={(item) => item.key}
                        contentContainerStyle={{ flexGrow: 1 }}
                        showsVerticalScrollIndicator={false}
                        nestedScrollEnabled={true}
                    />
                </KeyboardAvoidingView>
            </SafeAreaView>
        );
    };

    const styles = StyleSheet.create({
        container: {
            flex: 1,
            padding: 20,
            backgroundColor: '#fff',
        },
        header: {
            marginBottom: 20,
            paddingLeft: '10%'
        },
        headerText: {
            fontSize: 20,
            fontWeight: 'bold',
        },
        inputContainer: {
            marginBottom: 20,
        },
        label: {
            fontSize: 18,
            marginBottom: 10,
            fontWeight: 'bold',
        },
        titleLabel: {
            marginBottom: 5,
            fontSize: 17,
            fontWeight: 'bold',
        },
        input: {
            height: 66,
            borderColor: 'gray',
            borderWidth: 1,
            borderRadius: 10,
            padding: 10,
            marginBottom: 10,
        },
        textArea: {
            height: 120,
            borderColor: 'gray',
            borderWidth: 1,
            padding: 10,
            borderRadius: 10,
            textAlignVertical: 'top',
        },
        button: {
            backgroundColor: '#fff',
            padding: 10,
            marginBottom: 10,
            borderRadius: 10,
            flexDirection: 'row',
            alignItems: 'center',
        },
        buttonText: {
            fontSize: 16,
            marginLeft: 10,
        },
        submitButton: {
            backgroundColor: 'orange',
            padding: 15,
            borderRadius: 10,
            marginBottom: '10%',
            alignItems: 'center',
        },
        submitButtonText: {
            color: 'white',
            fontSize: 18,
            fontWeight: 'bold',
        },
        image: {
            width: '90%',
            height: '90%',
            resizeMode: 'cover',
            marginLeft: 10,
            marginBottom: '2%',
            marginTop: '2%',
        },
        image2: {
            width: 20,
            height: 20,
        },



        buttonContainer: {
            flexDirection: 'row', // Sắp xếp theo chiều ngang
            justifyContent: 'center', // Điều chỉnh khoảng cách giữa các nút
            marginBottom: 20,
            // justifyContent
            // borderColor: 'gray',
            // borderWidth: 1

        },
        btnThem: {
            backgroundColor: 'orange',
            paddingHorizontal: 15,
            paddingVertical: 10,
            borderRadius: 5,
            // left: 160,
            marginRight: 10, // Khoảng cách giữa nút "Thêm" và nút "Xóa"
        },
        btnxoa: {
            backgroundColor: 'orange',
            paddingHorizontal: 15,
            paddingVertical: 10,
            borderRadius: 5,
            // left:130
            // marginLeft:140
            // right: 20
        },

        btnThemText: {
            color: '#fff',
        },
        textAreaContainer: {
            marginBottom: 20,
        },
        rowAnh: {
            flexDirection: 'row',
            alignItems: 'center',
            // backgroundColor:'red',
            marginBottom: 10,
            borderColor: 'gray',
            borderWidth: 1,     // Độ dày của viền
            borderRadius: 10,    // Tùy chọn: Bo tròn viền nếu muốn
        }, rowAnh2: {
            flexDirection: 'row',
            alignItems: 'center',
            // backgroundColor:'red',
            marginBottom: 10,
            paddingVertical: 10,
            borderColor: 'gray',
            borderWidth: 1,     // Độ dày của viền
            borderRadius: 10,    // Tùy chọn: Bo tròn viền nếu muốn
        },
        dropdown: {
            borderColor: 'gray',
            borderWidth: 1,
            borderRadius: 10,
            height: 50,
            marginBottom: '5%'
        },
        dropdownContainer: {
            borderColor: 'gray',
            borderWidth: 1,
            borderRadius: 10,
            marginBottom: '32%'
        },
        backButton: {
            position: 'absolute',
            left: 0,
            top: 0,
            zIndex: 1,
            marginTop: '1%',
        },
        backIcon: {
            width: 20,
            height: 20,
        },

        progressContainer: {
            flexDirection: 'row',
            position: 'absolute',
            top: 10,
            left: 0,
            right: 0,
            zIndex: 1,
        },
        progressBar: {
            height: 3,
            backgroundColor: '#e0e0e0',
        },
        scrollViewContent: {
            alignItems: 'center',
        },
        imageContainer: {
            width: 300,
            height: 300,
            justifyContent: 'center',
            alignItems: 'center',
        },

        noImageContainer: {
            justifyContent: 'center',
            alignItems: 'center',
            width: 300,
            height: 300,
            backgroundColor: '#f0f0f0', // Màu nền cho placeholder
            borderRadius: 10,
        },
        noImage: {
            width: '80%',
            height: '80%',
        },
        noImageText: {
            marginTop: 10,
            fontSize: 16,
            color: '#888',
        },
        
    });

    export default DangBaiScreen;
