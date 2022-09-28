import { StatusBar } from 'expo-status-bar';
import { Alert, Button, StyleSheet, Text, TextInput, View } from 'react-native';
import MapView, {Marker} from 'react-native-maps';
import * as Location from 'expo-location';
import React, { useEffect, useState, useSyncExternalStore } from 'react';

export default function App() {
  const [input, setInput] = useState('')
  const [location, setLocation] = useState({
    latitude: '',
    longitude: ''
  })
  
  

  const show = () => {
    fetch(`http://www.mapquestapi.com/geocoding/v1/address?key=h0xO5elplIMHHi7YC1HGtkuyfedDwuxS&location=${input.replaceAll(' ', '')}`)
    .then(response => response.json())
    .then(data => {
      setLocation({
        latitude: data.results[0].locations[0].latLng.lat,
        longitude: data.results[0].locations[0].latLng.lng
      })
    })
  }


  

  return (
    
   

   <React.Fragment>
    <MapView style={{flex: 1}}
    region ={{
      latitude: location.latitude,
      longitude: location.longitude,
      latitudeDelta: 0.0322,
      longitudeDelta: 0.0221
    }} >
    <Marker
      title={input}
      coordinate={{
        latitude: location.latitude,
        longitude: location.longitude
      }}

    />
  
    </MapView>
    <TextInput style={styles.txtinput}
    value={input}
    onChangeText={text => setInput(text)}
    />
    
   <Button 
   title="Show on map"
   onPress={show}
   /> 
  
   </React.Fragment>
   
   
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  txtinput: {
    borderWidth: 1,
    borderColor: 'blue',
    width: 150
  },
  map: {
    flex: 1
  }
});
