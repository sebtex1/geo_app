import { StyleSheet, View } from 'react-native';
import React, {useState, useEffect} from 'react';
import { Text, Button } from '@rneui/base';
import MapView, { Marker } from 'react-native-maps';

import * as Location from 'expo-location';

  const Map = ({navigation}) => {
    const [location, setLocation] = useState(null);
    const [errorMsg, setErrorMsg] = useState(null);

    useEffect(() => {
      (async () => {
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
          setErrorMsg('Permission to access location was denied');
          return;
        }
        getLocation();
      })();
    }, []);

    const getLocation = async () => {
      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
    }
  
    return (
      <View style={styles.container}>
        <MapView style={styles.map}>
          <Marker coordinate={ {latitude: location?.coords?.latitude ?? 0, longitude: location?.coords?.longitude ?? 0} } />
        </MapView>
      </View>
    );
  };

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
    map: {
      width: '100%',
      height: '100%',
    },
  });

export default Map