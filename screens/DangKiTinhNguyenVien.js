import React, { useState } from 'react';
import { SafeAreaView, View, Text, TextInput, TouchableOpacity, Alert, StyleSheet, Image } from 'react-native';
import { NavigationContainer, useNavigation } from '@react-navigation/native';





const Tab = createBottomTabNavigator(); // tạo tab navigator


const DangKiDulichScreen = () => {
    const [find] = useState('');
    const handleBack = () => {
        navigation.goBack();
    };

    return (

        <SafeAreaView style={styles.container}>
            <View style={styles.inner}>
                {/* Row container for Back button and Title */}
                <View style={styles.headerRow}>
                    <TouchableOpacity style={styles.backButton} onPress={handleBack}>
                        <Image
                            source={require('../assets/buttonback.png')} // Đường dẫn tới hình ảnh trong assets
                            style={styles.backIcon}
                        />
                    </TouchableOpacity>

                    <TextInput
                        style={styles.inputSearch}
                        placeholder="Tìm kiếm địa điểm, bạn đồng hành..."
                        keyboardType="email-address"
                        value={find}
                        numberOfLines={1}

                    >


                    </TextInput>
                    <Image
                        // icon kính lúp
                        source={{ uri: "https://cdn-icons-png.flaticon.com/128/622/622669.png" }}
                        style={styles.image}
                    />
                    <TouchableOpacity style={styles.ic}>

                         <Image
                        // icon chuông
                        source={{ uri: "https://cdn-icons-png.flaticon.com/128/2529/2529521.png" }}
                        style={styles.image2}
                    />
                    </TouchableOpacity>
                   
                </View>


                <Image
                    //ảnh to
                    source={require('../assets/coupleTravel.jpg')}
                    style={styles.image3}
                />
                <Text style={styles.ttal}>
                    Du lịch cùng bạn.
                </Text>
                <Text style={{ color: '#fff', marginTop: '2%', marginRight: '55%' }}>
                    Khám phá thế giới
                </Text>

                <Text style={styles.td}>
                    Du lịch cùng bạn bè không chỉ giúp bạn khám phá những địa điểm mới
                    mà còn tạo ra những kỷ niệm đáng nhớ
                    . Hãy cùng nhau lên kế hoạch cho chuyến đi tiếp theo,
                    từ việc chọn địa điểm, đặt vé...
                </Text>

                <TouchableOpacity style={styles.dkn} onPress={handleBack}>
                    <Text style={{ color: "#fff" }}>Đăng kí ngay</Text>
                </TouchableOpacity>


                <TouchableOpacity style={styles.tht} onPress={handleBack}>
                    <Text style={{ color: "#000" }}>Tìm hiểu thêm</Text>
                </TouchableOpacity>
              
          
                 
            </View>

           
                    {/* <BottomNavigator></BottomNavigator> */}
               
                
            



         </SafeAreaView>
         

            



    );


};



 
 
const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
    },
    
    inner: {
        padding: 16,
        flex: 1,
        alignItems: 'center'
    },
    headerRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around',
        marginBottom: 20,
        // height: '8%',
        // backgroundColor:'red',
        marginTop: '4%',
    },
    backButton: {
        marginRight: 16,
    },
    backIcon: {
        // //   width: 24, // Kích thước hình ảnh
        //   height: 24,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginLeft: '15%',
    },
    description: {
        fontSize: 14,
        marginVertical: 10,
        marginBottom: '10%'
    },
    inputSearch: {
        height: 40,
        width: '80%',
        borderColor: 'gray',
        borderWidth: 1,
        borderRadius: 19,
        marginBottom: '5%',
        marginLeft: '3%',
        backgroundColor: '#EBEDED',
        paddingHorizontal: 10,
        marginTop: '5%',
        paddingLeft: '11%',

    },
    button: {
        backgroundColor: 'blue',
        padding: 10,
        borderRadius: 5,
        alignItems: 'center',

    },
    buttonText: {
        color: 'white',
        fontSize: 16,
    },
    xacMinh: {
        fontSize: 20,
        marginBottom: '5%',
        fontWeight: 'bold',

    },
    textValidate: {

        fontSize: 10,
        color: '#5B6D72',
        marginBottom: '5%',


    },
    textNhanOtp: {
        textAlign: 'center',
        fontSize: 12,
        color: '#5B6D72',
        marginTop: '5%',
    },
    image: {
        width: 18,
        height: 18,
        // marginRight: 33,
        marginLeft: "-76%"
    },
    image2: {
        width: 25,
        height: 25,
        // marginRight: 33,
        marginLeft: "77%"
    }, image3: {
        width: '105%',
        marginTop: '-4%',
        height: '30%',
        borderRadius: 20,
    },

    ttal: {

        marginTop: '-25%',
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 20,
        marginLeft: '-40%',
        // marginBottom: '5%',

    },
    td: {
        marginTop: '15%'

    },

    dkn: {
        backgroundColor: '#17C6ED',
        marginTop: '5%',
        width: '100%',
        borderRadius: 10,
        alignItems: 'center',
        paddingTop: '3%',
        paddingBottom: '3%',
    }, tht: {
        marginTop: '5%',
        // backgroundColor:'red',
        width: '100%',
        height: '4%',
        alignItems: 'center',
    },
    ic:{
        // backgroundColor:'red',
        right:-30

    }

});


export default DangKiDulichScreen;