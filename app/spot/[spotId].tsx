import { useLocalSearchParams } from "expo-router";
import { StyleSheet, Text, View } from "react-native";
import { dummySpots } from "../../constants/dummySpots";

export default function SpotDetailScreen() {
  const { spotId } = useLocalSearchParams();
  const spot = dummySpots.find((s) => s.id === spotId);

  if (!spot) return <Text>Spot not found.</Text>;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{spot.name}</Text>
      <Text>{spot.description}</Text>
      <Text>Category: {spot.category}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  title: { fontSize: 24, fontWeight: "bold", marginBottom: 10 },
});
