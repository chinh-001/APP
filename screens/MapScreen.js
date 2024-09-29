import React, { useState, useEffect, useCallback, useRef } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, Alert, FlatList } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';
import { debounce } from 'lodash';
import axios from 'axios';

const MapScreen = ({ navigation }) => {
  
  const [mapState, setMapState] = useState({
    selectedLocation: null,
    selectedAddress: '',
    searchQuery: '',
    initialRegion: null,
    suggestions: [],
  });
  const mapRef = useRef(null);

  useEffect(() => {
    initializeLocation();
  }, []);

  const initializeLocation = async () => {
    try {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Lỗi', 'Quyền truy cập vị trí bị từ chối');
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      const initialRegion = {
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      };
      setMapState(prev => ({
        ...prev,
        initialRegion,
        selectedLocation: initialRegion,
      }));
      reverseGeocode(initialRegion);
    } catch (error) {
      console.error('Error initializing location:', error);
      Alert.alert('Lỗi', 'Không thể lấy vị trí hiện tại');
    }
  };

  const handleMapPress = useCallback((event) => {
    const { coordinate } = event.nativeEvent;
    setMapState(prev => ({ ...prev, selectedLocation: coordinate }));
    reverseGeocode(coordinate);
  }, []);

  const handleConfirm = useCallback(() => {
    const { selectedLocation, selectedAddress } = mapState;
    console.log('Selected Location:', selectedLocation);
    console.log('Selected Address:', selectedAddress);
    if (selectedLocation && selectedAddress) {
      navigation.navigate('TrangChu', {
        screen: 'DangBai',
        params: { selectedLocation, selectedAddress },
      });
  
    } else {
      Alert.alert('Lỗi', 'Vui lòng chọn một địa điểm trước khi xác nhận.');
    }
  }, [mapState, navigation]);

  const reverseGeocode = async (coordinate) => {
    try {
      const result = await Location.reverseGeocodeAsync(coordinate);
      if (result.length > 0) {
        const address = `${result[0].street}, ${result[0].city}, ${result[0].country}`;
        setMapState(prev => ({ ...prev, selectedAddress: address }));
      }
    } catch (error) {
      console.error('Error reverse geocoding:', error);
      Alert.alert('Lỗi', 'Không thể lấy địa chỉ cho vị trí này');
    }
  };

  const searchPlaces = useCallback(debounce(async (text) => {
    if (text.length > 2) {
      try {
        const response = await axios.get(
          `https://nominatim.openstreetmap.org/search?format=json&q=${text}&limit=5`
        );
        setMapState(prev => ({ ...prev, suggestions: response.data }));
      } catch (error) {
        console.error('Error fetching suggestions:', error);
        Alert.alert('Lỗi', 'Không thể tìm kiếm địa điểm');
      }
    } else {
      setMapState(prev => ({ ...prev, suggestions: [] }));
    }
  }, 300), []);

  const handleSelectSuggestion = useCallback((item) => {
    const location = {
      latitude: parseFloat(item.lat),
      longitude: parseFloat(item.lon),
    };
    setMapState(prev => ({
      ...prev,
      selectedLocation: location,
      selectedAddress: item.display_name,
      searchQuery: item.display_name,
      suggestions: [],
    }));
    mapRef.current?.animateToRegion({
      ...location,
      latitudeDelta: 0.0922,
      longitudeDelta: 0.0421,
    }, 1000);
  }, []);

  if (!mapState.initialRegion) {
    return <View style={styles.container}><Text>Đang tải...</Text></View>;
  }

  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Tìm kiếm địa điểm"
          value={mapState.searchQuery}
          onChangeText={(text) => {
            setMapState(prev => ({ ...prev, searchQuery: text }));
            searchPlaces(text);
          }}
        />
        {mapState.suggestions.length > 0 && (
          <FlatList
            data={mapState.suggestions}
            keyExtractor={(item) => item.place_id}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={styles.suggestionItem}
                onPress={() => handleSelectSuggestion(item)}
              >
                <Text>{item.display_name}</Text>
              </TouchableOpacity>
            )}
            style={styles.suggestionList}
          />
        )}
      </View>

      <MapView
        ref={mapRef}
        style={styles.map}
        onPress={handleMapPress}
        initialRegion={mapState.initialRegion}
      >
        {mapState.selectedLocation && (
          <Marker
            coordinate={mapState.selectedLocation}
            title={mapState.selectedAddress || "Điểm đến đã chọn"}
          />
        )}
      </MapView>

      <TouchableOpacity style={styles.confirmButton} onPress={handleConfirm}>
        <Text style={styles.confirmButtonText}>Xác nhận điểm đến</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    flex: 1,
  },
  searchContainer: {
    position: 'absolute',
    top: 10,
    left: 10,
    right: 10,
    zIndex: 1,
  },
  searchInput: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    backgroundColor: 'white',
  },
  suggestionList: {
    backgroundColor: 'white',
    borderColor: 'gray',
    borderWidth: 1,
    borderTopWidth: 0,
    borderBottomLeftRadius: 5,
    borderBottomRightRadius: 5,
    maxHeight: 200,
  },
  suggestionItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  confirmButton: {
    position: 'absolute',
    bottom: 20,
    left: 20,
    right: 20,
    backgroundColor: '#00c3ff',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
  },
  confirmButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default MapScreen;