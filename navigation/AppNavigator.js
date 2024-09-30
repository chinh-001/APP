// navigations/AppNavigator.js

import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';

// Import các màn hình cần thiết
import QuenMatKhauScreen from '../screens/QuenMatKhauScreen';
import XacMinhOtpScreen from '../screens/XacMinhOtpScreen';
import DangKiDulichScreen from '../screens/DangKiDuLichScreen';
import DangBaiScreen from '../screens/DangBaiScreen';
import DangKy from '../screens/Dangky';
import DangNhap from '../screens/DangNhap';
import DoiMk from '../screens/DoiMk';
import TimKiemBanDuLich from '../screens/TimKiemBanDuLich';
import ThongTinCaNhan from '../screens/ThongTinCaNhan';
import Blog from '../screens/Blog';
import ThongBao from '../screens/ThongBao';
import DangKiTinhNguyenVienScreen from '../screens/DangKiTinhNguyenVienScreen';
import DKTinhNguyenVien from '../screens/DKTinhNguyenVien';
import NhanTin from '../screens/NhanTin';
import BottomTabs from '../screens/BottomTabs';  // Import từ BottomTabs
import TrangTimBanDuLich from '../screens/TrangTimBanDuLich'; 
import DangBaiMoiScreen from '../screens/DangBaiMoiScreen'; 
import ChonAnhScreen from '../screens/ChonAnhScreen';
const Stack = createStackNavigator();

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="ChonAnh">
        <Stack.Screen name="QuenMatKhau" component={QuenMatKhauScreen} options={{ headerShown: false }} />
        <Stack.Screen name="XacMinhOTP" component={XacMinhOtpScreen} options={{ headerShown: false }} />
        <Stack.Screen name="DangBai" component={DangBaiScreen} options={{ headerShown: false }} />
        <Stack.Screen name="DangKy" component={DangKy} options={{ headerShown: false }} />
        <Stack.Screen name="DangNhap" component={DangNhap} options={{ headerShown: false }} />
        <Stack.Screen name="DoiMK" component={DoiMk} options={{ headerShown: false }} />
        <Stack.Screen name="TimKiemBanDuLich" component={TimKiemBanDuLich} options={{ headerShown: false }} />
        <Stack.Screen name="ThongTinCaNhan" component={ThongTinCaNhan} options={{ headerShown: false }} />
        <Stack.Screen name="Blog" component={Blog} options={{ headerShown: false }} />
        <Stack.Screen name="DangKiTinhNguyenVienScreen" component={DangKiTinhNguyenVienScreen} options={{ headerShown: false }} />
        <Stack.Screen name="DKTinhNguyenVien" component={DKTinhNguyenVien} options={{ headerShown: false }} />
        <Stack.Screen name="NhanTin" component={NhanTin} options={{ headerShown: false }} />
        <Stack.Screen name="DangKiDulichScreen" component={DangKiDulichScreen} options={{ headerShown: false }} />
        <Stack.Screen name="TrangChu" component={BottomTabs} options={{ headerShown: false }} />
        <Stack.Screen name="Trangtimbandulch" component={TrangTimBanDuLich} options={{ headerShown: false }} />
        <Stack.Screen name="DangBaiMoi" component={DangBaiMoiScreen} options={{ headerShown: false }} />
        <Stack.Screen name="ChonAnh" component={ChonAnhScreen} options={{ headerShown: false }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
