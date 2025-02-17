import { Platform, StyleSheet } from 'react-native';
import MapView, { Marker, Polyline, PROVIDER_GOOGLE } from 'react-native-maps';
import { Location } from '../../../infrastructure/interfaces/location';
import { FAB } from '../ui/FAB';
import Icon from 'react-native-vector-icons/Ionicons';
import { useEffect, useRef, useState } from 'react';
import { useLocationStore } from '../../store/location/useLocationStore';

interface Props {
    // markers: { lat: number, lng: number, title: string, description: string }[];
    shoesUserLocation?: boolean;
    initialLocation: Location;
}

export const Map = ({ shoesUserLocation = true, initialLocation }: Props) => {

    const mapRef = useRef<MapView>();
    const cameraLocation = useRef<Location>( initialLocation );
    const [isFollowingUser, setIsFollowingUser] = useState(true);
    const [isShowingPolyline, setIsShowingPolyline] = useState(true);
    const { getLocation, lastKnownLocation, watchLocation, clearWatchLocation, userLocationHistoryList } = useLocationStore();

    const moveCameraToLocation = ( location: Location ) => {
        if ( !mapRef.current ) return;

        mapRef.current.animateCamera({ center: location });
    }

    const moveToCurrentLocation = async () => {
        if ( !lastKnownLocation ) {
            moveCameraToLocation( initialLocation );
        }
        const location = await getLocation();
        if ( !location ) return;
        moveCameraToLocation(location);
        setIsFollowingUser( true );
    }

    useEffect(() => {
      watchLocation();
    
      return () => {
        clearWatchLocation();
      }
    }, []);

    useEffect(() => {
      if ( lastKnownLocation && isFollowingUser ) {
        moveCameraToLocation(lastKnownLocation);
      }
    
    }, [lastKnownLocation])
    
    

    return (
        <>
            <MapView
                ref={ (map) => mapRef.current = map! }
                showsUserLocation={ shoesUserLocation }
                provider={ Platform.OS === 'ios' ? undefined : PROVIDER_GOOGLE } // remove if not using Google Maps
                style={styles.map}
                onTouchStart={ () => setIsFollowingUser( false) }
                region={{
                    latitude: cameraLocation.current.latitude,
                    longitude: cameraLocation.current.longitude,
                    latitudeDelta: 0.015,
                    longitudeDelta: 0.0121,
                }}
            >

                {
                    isShowingPolyline && (
                        <Polyline
                            coordinates={ userLocationHistoryList }
                            strokeColor='black'
                            strokeWidth={ 5 }
                        />
                    )
                }

                {/* este es para un marcador con marcador personalizado */}
                {/* <Marker
                    coordinate = {{
                        latitude: 37.78825,
                        longitude: -122.4324,
                    }}
                    title='Este es el titulo del marcador'
                    description='Este es el cuerpo del marcador'
                    image={ require('../../../assets/custom-marker.png') }
                /> */}

                {/* este es para una lista de marcadores */}
                {/* {this.state.markers.map((marker, index) => (
                    <Marker
                    key={index}
                    coordinate={marker.latlng}
                    title={marker.title}
                    description={marker.description}
                    />
                ))} */}

            </MapView>

            <FAB
                iconName='compass-outline'
                onPress={ moveToCurrentLocation }
                style={{
                    bottom: 20,
                    right: 20,
                }}
            />


            <FAB
                iconName={ isFollowingUser ? 'walk-outline' : 'accessibility-outline'}
                onPress={ () => setIsFollowingUser( !isFollowingUser ) }
                style={{
                    bottom: 80,
                    right: 20,
                }}
            />

            <FAB
                iconName={ isShowingPolyline ? 'eye-outline' : 'eye-off-outline'}
                onPress={ () => setIsShowingPolyline( !isShowingPolyline ) }
                style={{
                    bottom: 140,
                    right: 20,
                }}
            />
        </>
    )
}


const styles = StyleSheet.create({
    container: {
      ...StyleSheet.absoluteFillObject,
    },
    map: {
      ...StyleSheet.absoluteFillObject,
    },
});