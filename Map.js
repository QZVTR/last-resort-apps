import { StyleSheet, Text, View, Dimensions } from 'react-native';
import React, {useEffect, useState, useRef} from 'react';
import MapView, {Marker} from 'react-native-maps';
import * as Location from 'expo-location';
import { GOOGLE_MAPS_APIKEY } from "@env";
import MapViewDirections from 'react-native-maps-directions';

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;


const Map = (props) => {
  const [currentLocationLat, setCurrentLocationLat] = useState(null);
  const [currentLocationLon, setCurrentLocationLon] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const mapRef = useRef(null);
  const [distance, setDistance] = useState(null);
  const [duration, setDuration] = useState(null);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }

      let currentLocation = await Location.getCurrentPositionAsync({});
      setCurrentLocationLat(currentLocation.coords.latitude)
      setCurrentLocationLon(currentLocation.coords.longitude)
    })();
  }, []);


  /*
  if (currentLocationLat || currentLocationLon) {
    mapRef.current.fitToSuppliedMarkers(["origin", "destination"], {
      edgePadding: { top: 50, right: 50, bottom: 50, left: 50},
    });
  }else {
    return;
  }
  */


  if (currentLocationLat && currentLocationLon) {

    const coordinates = [
      {
        latitude: currentLocationLat,
        longitude: currentLocationLon
      },
      {
        latitude: props.latitude,
        longitude: props.longitude,
      },];
    
    /*
    const getTravelTime = async () => {
      const URL = `https://maps.googleapis.com/maps/api/distancematrix/json?units=imperial&origins=${coordinats[0]}&destinations=${coordinates[1]}&key=${GOOGLE_MAPS_APIKEY}`
      //const url = `https://maps.googleapis.com/maps/api/distancematrix/json?units=imperial&origins=${coordinates[0]}&destinations=${coordinates[1]}&key=${GOOGLE_MAPS_APIKEY}`
      fetch(URL)
      .then(res => res.json())
      .then(data => {
        setDistance(data.rows[0].elements.distance.text)
        setDuration()
      })
    }
    */


    return (
      <View>
          <MapView
            ref={mapRef}
            style={styles.MapView}
            initialRegion={{
            latitude: currentLocationLat,
            longitude: currentLocationLon,
            latitudeDelta: 0.005,
            longitudeDelta: 0.005,
            }}
            
          >
            <Marker
              coordinate={{
                latitude: currentLocationLat,
                longitude: currentLocationLon,
              }}
              draggable={true} 
              pinColor='blue'
              title='Current Location'
              identifier='origin'
            />

            <Marker
              coordinate={{
                latitude: props.latitude,
                longitude: props.longitude,
              }}
              draggable={true} 
              title='Destination'
              identifier='destination'
            />

            <MapViewDirections 
              origin={coordinates[0]}
              destination={coordinates[1]}
              apikey={GOOGLE_MAPS_APIKEY}
              strokeWidth={5}
              strokeColor='blue'
            />

          </MapView>
      </View>
    )
  } else if (errorMsg) {
    return (
      <View>
        <Text>{errorMsg}</Text>
      </View>
    )
  } else {
    return (
      <View>
        <Text>Loading</Text>
      </View>
    )
  }
}

export default Map;

const styles = StyleSheet.create({
  MapView: {
    width: screenWidth,
    height: screenHeight,
  },
})