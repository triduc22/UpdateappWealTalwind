import { StatusBar, Alert, Platform, PermissionsAndroid, BackHandler } from "react-native";
import { StyleSheet } from "react-native";
import AppNavigation from "./src/navigation/appNavigation";
import Geolocation from '@react-native-community/geolocation';
import { useEffect, useState } from "react";

export default function App() {
  const [statusGPS, setStatusGPS] = useState(false);

  useEffect(() => {
    async function checkLocationPermission() {
      if (Platform.OS === 'android') {
        try {
          const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
          
          );

          if (granted === PermissionsAndroid.RESULTS.GRANTED) {
            // Permission granted, now you can get the location
            Geolocation.getCurrentPosition((info) => {
              setStatusGPS(true);
            });
          } else {
            // Permission denied, handle it (e.g., show an alert)
            Alert.alert(
              'Location Access Denied',
              'Please enable location access in your device settings to use this app.',
              
              [
                {
                text: 'Oke',
                onPress: () => BackHandler.exitApp(),
              },
              ]
            );
          }
        } catch (err) {
          console.error(err);
        }
      } 
      // //Process for ios
      // else if (Platform.OS === 'ios') {
      //   // On iOS, you can continue using Geolocation.checkPermission
      //   Geolocation.checkPermission((permission) => {
      //     if (permission === 'granted') {
      //       // Permission granted, now you can get the location
      //       Geolocation.getCurrentPosition((info) => {
      //         setStatusGPS(true);
      //       });
      //     } else if (permission === 'denied') {
      //       // Permission denied, handle it as needed
      //     }
      //   });
      // }
    }

    checkLocationPermission();
  }, []);

  return (
    <AppNavigation />
  );
}
