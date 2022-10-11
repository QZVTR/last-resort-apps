import { StyleSheet, Text, View } from 'react-native';
import React, {useState} from 'react';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { GOOGLE_MAPS_APIKEY} from '@env';

export default function NavigationCard() {
    const [latDest, setLatDest] = useState();
    const [lonDest, setLonDest] = useState();

    return (
        <View>
        <GooglePlacesAutocomplete 
            placeholder='Where to?'
            nearbyPlacesAPI='GooglePlacesSearch'
            debounce={400}
            minLength={2}
            enablePoweredByContainer={false}
            returnKeyType={'search'}
            onPress={(data, details) => {
                setLatDest(details.geometry.location.lat)
                setLonDest(details.geometry.location.lng)
            }}
            fetchDetails={true}
            query={{
                key: GOOGLE_MAPS_APIKEY,
                language: "en",
            }}
        />
        </View>
    )
}

const styles = StyleSheet.create({})