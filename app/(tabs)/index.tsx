import * as Location from "expo-location";
import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import { Dimensions, Platform, StyleSheet, Text, View } from "react-native";
import MapView, { Marker } from "react-native-maps";
import { dummySpots } from "../../constants/dummySpots";

export default function HomeScreen() {
  const [location, setLocation] =
    useState<Location.LocationObjectCoords | null>(null);
  const router = useRouter();

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") return;

      let loc = await Location.getCurrentPositionAsync({});
      setLocation(loc.coords);
    })();
  }, []);

  if (Platform.OS === "web") {
    return (
      <Text>MapView not supported on web. Use Expo Go on your device.</Text>
    );
  }

  return (
    <View style={styles.container}>
      {location && (
        <MapView
          style={styles.map}
          initialRegion={{
            latitude: location.latitude,
            longitude: location.longitude,
            latitudeDelta: 0.05,
            longitudeDelta: 0.05,
          }}
        >
          {dummySpots.map((spot) => (
            <Marker
              key={spot.id}
              coordinate={{
                latitude: spot.latitude,
                longitude: spot.longitude,
              }}
              title={spot.name}
              description={spot.description}
              onPress={() => router.push(`/spot/${spot.id}` as any)}
            />
          ))}
        </MapView>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  map: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
  },
});
