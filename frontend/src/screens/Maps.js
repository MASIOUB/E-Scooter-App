import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { useState, useEffect } from 'react';
import Header from '../components/Header';
import MapView, { Circle, Marker, Polygon } from 'react-native-maps';

import { logout } from '../reducers/authReducer';
import { useDispatch } from 'react-redux';

// import * as Location from 'expo-location';

const Maps = () => {
    const dispatch = useDispatch();
    // const [location, setLocation] = useState(null);
    const [mapRegion, setMapRegion] = useState({
        latitude: 32.2932,
        longitude: -9.235,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
    });
    // const [polygonCoords, setPolygonCoords] = useState([]);

    // const getUserLocation = async () => {
    //     let { status } = await Location.requestForegroundPermissionsAsync();
    //     if (status !== 'granted') {
    //         setErrorMsg('Permission to access location was denied');
    //         return;
    //     }
    //     let location = await Location.getCurrentPositionAsync({});
    //     setLocation(location);
    // };

    // useEffect(() => {
    //     getUserLocation();
    // }, []);

    // console.log(location.coords.latitude);
    // console.log(location.coords.longitude);

    const handleZoomIn = () => {
        // Increase the latitude and longitude deltas to zoom in
        setMapRegion((prevRegion) => ({
            ...prevRegion,
            latitudeDelta: prevRegion.latitudeDelta / 2,
            longitudeDelta: prevRegion.longitudeDelta / 2,
        }));
    };

    const handleZoomOut = () => {
        // Decrease the latitude and longitude deltas to zoom out
        setMapRegion((prevRegion) => ({
            ...prevRegion,
            latitudeDelta: prevRegion.latitudeDelta * 2,
            longitudeDelta: prevRegion.longitudeDelta * 2,
        }));
    };

    const handleRegionChange = (region) => {
        // Update the mapRegion state with the current region
        setMapRegion(region);
    };

    const onMarkerDragEnd = (e) => {
        setMapRegion(e.nativeEvent.coordinate);
        console.log(mapRegion);
    };

    // const handleMapPress = (e) => {
    //     const coords = e.nativeEvent.coordinate;
    //     setPolygonCoords((prevCoords) => [...prevCoords, coords]);
    // };

    return (
        <View style={styles.container}>
            <Header />
            <MapView
                style={styles.map}
                region={mapRegion}
                zoomEnabled={true} // Enable pinch-to-zoom
                onRegionChange={handleRegionChange} // Update the mapRegion state with the current region
            // onPress={handleMapPress} // Handle user clicks on the map
            >
                <Marker draggable coordinate={mapRegion} onDragEnd={onMarkerDragEnd} />
                {/* <Circle
                    center={{
                        latitude: 32.2932,
                        longitude: -9.235,
                    }}
                    radius={1000}
                    fillColor="rgba(255, 0, 0, 0.2)" // Change the color of the circle
                /> */}
                {/* <Polygon
                    coordinates={[
                        { latitude: 32.2932, longitude: -9.235 },
                        { latitude: 32.2932, longitude: -9.245 },
                        { latitude: 32.2832, longitude: -9.235 },
                    ]}
                    fillColor={'rgba(100, 200, 200, 0.5)'}
                    strokeColor={'rgba(100, 200, 200, 1)'}
                /> */}
                {/* Render the polygon based on user clicks */}
                {/* {polygonCoords.length > 1 && (
                    <Polygon
                        coordinates={polygonCoords}
                        fillColor={'rgba(255, 0, 0, 0.5)'}
                        strokeColor={'red'}
                        strokeWidth={2}
                    />
                )} */}
            </MapView>
            <View style={styles.zoomButtonsContainer}>
                <View style={styles.zoomButton}>
                    <TouchableOpacity onPress={handleZoomIn}>
                        <Text>Zoom In</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.zoomButton}>
                    <TouchableOpacity onPress={handleZoomOut}>
                        <Text>Zoom Out</Text>
                    </TouchableOpacity>
                </View>
                {/* <View style={styles.zoomButton}>
                    <TouchableOpacity style={styles.button} onPress={() => dispatch(logout())}>
                        <Text style={{ color: 'white' }}>Logout</Text>
                    </TouchableOpacity>
                </View> */}
            </View>
        </View>
    )
}

export default Maps

const styles = StyleSheet.create({
    container: {
        padding: 10,
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
    },
    button: {
        backgroundColor: 'black',
        paddingVertical: 10,
        paddingHorizontal: 40,
        borderRadius: 5,
        marginBottom: 10,
    },
    map: {
        width: '100%',
        height: '100%',
    },
    zoomButtonsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
        //   marginTop: 20,
        marginBottom: 20,
    },
    zoomButton: {
        backgroundColor: 'white',
        padding: 10,
        borderRadius: 5,
        borderWidth: 1,
        borderColor: 'black',
    },
});