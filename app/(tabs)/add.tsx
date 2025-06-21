import Slider from "@react-native-community/slider";
import * as Location from "expo-location";
import { useRouter } from "expo-router";
import { useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { dummySpots } from "../../constants/dummySpots";

export default function AddSpotScreen() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("Serene");
  const [ratings, setRatings] = useState({
    vibe: 3,
    uniqueness: 3,
    safety: 3,
    crowd: 3,
  });

  const addSpot = async () => {
    const { coords } = await Location.getCurrentPositionAsync({});
    const newSpot = {
      id: Date.now().toString(),
      name,
      description,
      category,
      latitude: coords.latitude,
      longitude: coords.longitude,
      ratings,
    };
    dummySpots.push(newSpot);
    router.push("/");
  };

  const RatingSlider = ({
    label,
    value,
    onChange,
  }: {
    label: string;
    value: number;
    onChange: (value: number) => void;
  }) => (
    <View style={{ marginBottom: 20 }}>
      <Text style={styles.label}>
        {label}: {value}
      </Text>
      <Slider
        style={{ width: "100%" }}
        minimumValue={1}
        maximumValue={5}
        step={1}
        value={value}
        onValueChange={onChange}
        minimumTrackTintColor="#5A67D8"
        maximumTrackTintColor="#ccc"
      />
    </View>
  );

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Add a Hidden Spot</Text>
      <TextInput
        style={styles.input}
        placeholder="Name"
        value={name}
        onChangeText={setName}
      />
      <TextInput
        style={styles.input}
        placeholder="Description"
        value={description}
        onChangeText={setDescription}
      />
      <TextInput
        style={styles.input}
        placeholder="Category (Serene, Romantic, Creative)"
        value={category}
        onChangeText={setCategory}
      />

      <RatingSlider
        label="Vibe"
        value={ratings.vibe}
        onChange={(v) => setRatings({ ...ratings, vibe: v })}
      />
      <RatingSlider
        label="Uniqueness"
        value={ratings.uniqueness}
        onChange={(v) => setRatings({ ...ratings, uniqueness: v })}
      />
      <RatingSlider
        label="Safety"
        value={ratings.safety}
        onChange={(v) => setRatings({ ...ratings, safety: v })}
      />
      <RatingSlider
        label="Crowd"
        value={ratings.crowd}
        onChange={(v) => setRatings({ ...ratings, crowd: v })}
      />

      <TouchableOpacity style={styles.button} onPress={addSpot}>
        <Text style={styles.buttonText}>📍 Add Spot</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20 },
  title: { fontSize: 24, fontWeight: "bold", marginBottom: 20 },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    marginBottom: 15,
    borderRadius: 8,
  },
  label: { fontWeight: "bold", marginBottom: 5 },
  button: {
    backgroundColor: "#5A67D8",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 10,
  },
  buttonText: { color: "#fff", fontSize: 16, fontWeight: "bold" },
});
