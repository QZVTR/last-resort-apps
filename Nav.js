import React, {useState} from "react";
import {SafeAreaView, StyleSheet, Text, View, ScrollView } from 'react-native';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { GOOGLE_MAPS_APIKEY } from "@env";
import MapScreen from "./MapScreen";


function Nav() {
    const [lat, setlat] = useState(null);
    const [lon, setLon] = useState(null);

    if ((lat) && (lon)) {
        return (
            <View>
                <MapScreen latitude={lat} longitude={lon}/>
            </View>
        );
    }else  {
        return (
            <SafeAreaView>
                    <View>
                        <Text>Last resort maps</Text>
                        <GooglePlacesAutocomplete
                            placeholder="Where to?" 
                            nearbyPlacesAPI="GooglePlacesSearch"
                            debounce={400}
                            minLength={2}
                            enablePoweredByContainer={false}
                            returnKeyType={'search'}
                            onPress={(data, details=null) => {
                                setlat(details.geometry.location.lat)
                                setLon(details.geometry.location.lng)
                            }}
                            fetchDetails={true}
                            query={{
                                key: GOOGLE_MAPS_APIKEY,
                                language: "en",
                            }}
                        />
                           
                    </View>
            </SafeAreaView>
        );
    };
}

export default Nav;

const styles = StyleSheet.create({});
